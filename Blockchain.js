import { Block } from "./Block.js";

export class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let Test = new Blockchain();
Test.addBlock(new Block(1, Date.now(), { message: 'Hello world'}));
Test.addBlock(new Block(2, Date.now(), { message: 'Test number 2'}));

console.log('is blockchain valid? ' + Test.isChainValid());

//console.log(JSON.stringify(Test, null, 4));