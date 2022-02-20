import { Blockchain } from "./Blockchain";
import { Block, Transaction } from "./Block";
import { ec as EC } from "elliptic";
const ec = new EC('secp256k1');

export const testChain = () => {
    
    const myKey = ec.keyFromPrivate('f93cf2f57d918a6aae1647132a1b069a675660e2629c7681a6d5718cf9b39dce');
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
}
