const Web3 = require('web3');
const EthereumTransaction = require('ethereumjs-tx').Transaction;
const web3 = new Web3('HTTP://127.0.0.1:7545');

// Step 1: Setting sending and receiving addresses.
// let sendingAdress = "ADDRESS FROM GANACHE GOES HERE";
// let receivingAddress = "ANOTHER ADDRESS FROM GANACHE GOES HERE";
let sendingAddress = "0x89DA6d2C3B1893f0eD35C1cbf9BE2AE820eC4Adf";
let receivingAddress = "0x0F08F01df8B5fD951e583FC202a865008434FC58";

// Step 2: Check the balances of the addresses.
web3.eth.getBalance(sendingAddress).then(bal => console.log('Sending Address Balance (Wei)', bal));
web3.eth.getBalance(receivingAddress).then(bal => console.log('Receiving Address Balance (Wei):', bal));

// Step 3: Create the transactions.
let transactionData = {
    nonce: 1,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 100,
    data: '0x',
}

// Step 4: Signing the trancation using the private key of the sender.
// let senderPrivateKey = "SENDER PRIVATE KEY GOES HERE";
let senderPrivateKey = "d2341f2c4d4e8fd124c4faf40edb14da00a8aeed7bf19aad1e249346ad093a9d";
let transaction = new EthereumTransaction(transactionData);
let senderPrivateKeyHex = Buffer.from(senderPrivateKey, 'hex');
transaction.sign(senderPrivateKeyHex);

// Step 5: Sending the serialized transaction to the blockchain.
let serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
