import Blockchain from './src/Blockchain.js';
import { Block } from './src/Block.js';

let Test = new Blockchain();


console.log('Mining block 1...');
Test.addBlock(new Block(1, Date.now(), { message: 'Hello world'}));

console.log('Mining block 2...');
Test.addBlock(new Block(2, Date.now(), { message: 'Test number 2'}));

console.log('Mining block 3...');
Test.addBlock(new Block(1, Date.now(), { message: 'Hello world'}));

console.log(Test);
