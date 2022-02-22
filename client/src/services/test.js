import { Blockchain } from "./Blockchain.js";
import { Transaction } from "./Block.js";
import { ec as EC } from "elliptic";
const ec = new EC('secp256k1');
let chain = new Blockchain();

export const testChain = (transactions) => {
    
    const myKey = ec.keyFromPrivate('e567b81c2f328c0ec71028965105597ec8d806c5261294411e1097bab0da5441');
    const myWalletAddress = myKey.getPublic('hex');
    
    
    // chain.minePendingTransactions(myWalletAddress);

    // const tx1 = new Transaction(myWalletAddress, 'address to', 10);
    // tx1.signTransaction(myKey);
    // chain.addTransaction(tx1);
    // console.log(tx1.isValid());

    
    for(const tx of transactions) {
        chain.pendingTransactions.push(tx);
    }

    
    console.log('Starting the miner..');
    chain.minePendingTransactions(myWalletAddress);

    console.log(chain.chain);
    console.log();
    console.log(chain.pendingTransactions);
    // window.location = '/';
    
    // console.log('Balance of vilho is ', chain.getBalanceOfAddress(myWalletAddress));
    // console.log('is chain valid', chain.isChainValid())
    // console.log(chain.chain);
}
