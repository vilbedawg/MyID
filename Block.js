import sha256 from 'crypto-js/sha256.js';

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
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDer('hex');
    }
}