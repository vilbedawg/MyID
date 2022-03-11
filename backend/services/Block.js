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
        let idx = 1;
        for await (const tx of this.transactions) {
            console.log(`Checking transaction ${idx}..`);
            const TransactionInstance = new Transaction(
                    tx.fromAddress, 
                    tx.toAddress, 
                    tx.data, 
                    tx.signature,
                    tx.timestamp,
                );
            const isValid = await TransactionInstance.isValid();
            idx++;
            if (isValid.error || !isValid){
                return false;
            }
        }
        return true;
    }
}

export class Transaction {
    constructor(fromAddress, toAddress, data, signature, timestamp) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.data = data;
        this.signature = signature || null;
        this.timestamp = timestamp;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
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
        if (this.fromAddress === null) return true;
        
        if(!this.signature || this.signature.length === 0){
            return ApiError.badRequest(`No signature in this transaction`);
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        const valid = publicKey.verify(this.calculateHash(), this.signature);
        return valid;
    }
}
