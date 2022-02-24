import crypto from 'crypto';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

export class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
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
        for (const tx of this.transactions) {
            const newTxInstance = new Transaction(
                tx.fromAddress, 
                tx.toAddress, 
                tx.data, 
                tx.signature
            );
            if(!newTxInstance.isValid()){
                return false;
            }
        }
        return true;
    }

}

export class Transaction {
    constructor(fromAddress, toAddress, data, signature) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.data = data;
        this.signature = signature || 'none';
        this.timestamp = new Date().getTime()
    }

    calculateHash() {
        // return sha256(this.fromAddress, this.toAddress, this.data, this.timestamp).toString();
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
    }

    signTransaction(signingKey) {
        if(signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions from other wallets');
        }
        
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    // -----------------Korjaa huomenna-----------------------//
    async isValid() {

        if (this.fromAddress === null) return true;
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }

        // const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        // return publicKey.verify(this.calculateHash(), this.signature);
    }
}
