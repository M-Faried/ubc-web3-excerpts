const fs = require('fs');
const Web3 = require('web3');
const url = "INFURA-LINK-HERE";
const web3 = new Web3(url);

// Prepaing the data of the contract.
const abi = JSON.parse(fs.readFileSync('abi.json'));
const contractAddress = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF";
const contract = new web3.eth.Contract(abi, contractAddress);

contract.methods.name().call((err, result) => console.log('Name:', result));
contract.methods.symbol().call((err, result) => console.log('Symbol:', result));
contract.methods.totalSupply().call((err, result) => { console.log('Total Supply:', result) });