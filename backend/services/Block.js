import sha256 from 'crypto-js/sha256.js';
import { ec as EC } from 'elliptic';
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
        return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        } 

        console.log('Block mined: ' + this.hash);
    }

    hasValidTransaction() {
        for(const tx of this.transactions) {
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
    }

}

export class Transaction {
    constructor(fromAddress, toAddress, data) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.data = data;
        this.timestamp = Date.now();
    }

    calculateHash() {
        return sha256(this.fromAddress, this.toAddress, this.data, this.timestamp).toString();
    }

    signTransaction(signingKey) {
        if(signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions from other wallets');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}
