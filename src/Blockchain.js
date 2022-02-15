import { Block, Transaction } from "./Block.js";

export default class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.now(), ['Genesis Block'], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        block.previousHash = this.getLatestBlock().hash;

        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for (let i = 0; i < block.transactions.length; i++) {
                const transFrom = block.transactions[i].fromAddress;
                const transTo = block.transactions[i].toAddress;
                const amount = block.transactions[i].data;

                if(transFrom === address) {
                    balance -= amount;
                }

                if(transTo === address) {
                    balance += amount;
                }
                
            }
        }

        return balance;
    }

    getOwnedBlock() {
        
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash() || currentBl5ock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}



 