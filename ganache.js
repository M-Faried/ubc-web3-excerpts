const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545'); // Ganache GUI url.

web3.eth.getBalance('0x3E4c5A14074fED064121C422b66D8239e6e37D07', (err, result) => console.log('Balance (Eth):', web3.utils.fromWei(result)));

// web3.eth.getAccounts((err, result) => console.log('Accounts:', result));
web3.eth.getGasPrice((err, price) => console.log('Gas Price (Ether):', web3.utils.fromWei(price)));

web3.eth.getTransactionCount('0x89DA6d2C3B1893f0eD35C1cbf9BE2AE820eC4Adf')
    .then(count => console.log('Transactions Count For Account 0:', count));

web3.eth.getTransactionCount('0x0F08F01df8B5fD951e583FC202a865008434FC58')
    .then(count => console.log('Transaction Count For Account 1:', count));