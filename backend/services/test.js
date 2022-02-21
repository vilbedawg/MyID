import { Blockchain } from "./Blockchain";
import { Transaction } from "./Block";
import { ec as EC } from "elliptic";
const ec = new EC('secp256k1');

export const testChain = () => {
    
    const myKey = ec.keyFromPrivate('e567b81c2f328c0ec71028965105597ec8d806c5261294411e1097bab0da5441');
    const myWalletAddress = myKey.getPublic('hex');
    
    let testChain = new Blockchain();
    // testChain.minePendingTransactions(myWalletAddress);

    const tx1 = new Transaction(myWalletAddress, 'address to', 10);
    tx1.signTransaction(myKey);
    testChain.addTransaction(tx1);
    
    console.log('Starting the miner..');
    testChain.minePendingTransactions(myWalletAddress);


    
    console.log('Balance of vilho is ', testChain.getBalanceOfAddress(myWalletAddress));
    console.log('is chain valid', testChain.isChainValid())
    console.log(testChain.getLatestBlock());
}
