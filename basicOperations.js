const Web3 = require('web3');
const url = "INFURA-LINK-HERE";
const web3 = new Web3(url);

const address = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
const address2 = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
const address3 = "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe";

web3.eth.getBalance(address2)
    .then(balance => {
        console.log('Balance (Wei):', balance);
        let ethers = web3.utils.fromWei(balance, 'ether');
        console.log('Balance (Ethers):', ethers);
    })
    .catch(e => console.error(e.message));

web3.eth.getTransactionCount(address2)
    .then(transCount => console.log('Transaction Count:', transCount))
    .catch(e => console.error(e.message));

web3.eth.getUncle("0x99c4066feffeb433a9287aed0d1d30fb4602342a54e3e561c151e20949e3d79e", 0)
    .then(uncleBlock => console.log('Uncle Block:', uncleBlock))
    .catch(e => console.error(e.message));

