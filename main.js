import Blockchain from './src/Blockchain.js';
import { Transaction } from './src/Block.js';

let Test = new Blockchain();


Test.createTransaction(new Transaction('address1', 'address2', 100));
Test.createTransaction(new Transaction('address2', 'address1', 50));
Test.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner.. ');
Test.minePendingTransactions('vilhos-address');

Test.createTransaction(new Transaction('address1', 'address2', 100));
Test.createTransaction(new Transaction('address2', 'address1', 50));
Test.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner.. ');
Test.minePendingTransactions('vilhos-address');


console.log('\n Balance of vilho is ', Test.getBalanceOfAddress('vilhos-address'));
console.log(Test.getLatestBlock());
