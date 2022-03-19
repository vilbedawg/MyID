import crypto from 'crypto';
import pkg from 'elliptic';
import ApiError from '../middleware/ApiError.js';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

export class Block {
    constructor(timestamp, transactions, previousHash = '', hash, nonce) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = nonce || 0;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    }

    async mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        } 
    }

    async hasValidTransaction() {
        let invalidTransactions = [];
        for await (const tx of this.transactions) {
            
            // if(!tx.accepted) invalidTransactions.push(tx);
            
            const TransactionInstance = new Transaction(
                tx.fromAddress, 
                tx.toAddress, 
                tx.data, 
                tx.signature,
                tx.timestamp,
            );

           
            const isValid = await TransactionInstance.isValid();
          
            if (!isValid){
                invalidTransactions.push(tx);
                continue;
            }
            
        }
        return invalidTransactions;
    }
}

export class Transaction {
    constructor(fromAddress, toAddress, data, signature, timestamp) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.data = data;
        this.signature = signature || null;
        this.timestamp = timestamp;
        this.accepted = false;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.data + this.timestamp).digest('hex');
    }

    async signTransaction(signingKey) {
        
        if(!signingKey) {
            throw ApiError.badRequest('No keypair found');
        } 

        if(signingKey.getPublic('hex') !== this.fromAddress) {
            throw ApiError.badRequest(`You cannot sign transactions from other wallets`);
        }
        
        const hashTx = this.calculateHash();
        const sig = await signingKey.sign(hashTx, 'base64');
        this.signature = await sig.toDER('hex');
        return true;
    }


    
    async isValid() {
        if(!this.signature || this.signature.length === 0) return false;

        const key = ec.keyFromPublic(this.fromAddress, 'hex');
        const valid = key.verify(this.calculateHash(), this.signature);
        return valid;
    }
}
