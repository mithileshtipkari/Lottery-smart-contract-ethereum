const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider(
  'captain spread subway garment major stairs anger elbow gun syrup slender frost',
  'https://rinkeby.infura.io/v3/1bb2b0b14ee243e1a15080bccfd8c69c'
);

let lottery;
let accounts;
const web3 = new Web3(provider);

const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  lottery = await web3.eth.Contract(JSON.parse(interface))
    .deploy({data:'0x'+bytecode})
    .send({from: accoun[0], gas:'1000000'})
}
deploy();
