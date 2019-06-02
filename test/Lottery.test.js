const assert = require('assert');
// const ganache = require('ganache-cli');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
  'captain spread subway garment major stairs anger elbow gun syrup slender frost',
  'https://rinkeby.infura.io/v3/1bb2b0b14ee243e1a15080bccfd8c69c'
);

const Web3 = require('web3');


const web3 = new Web3(provider);

const { interface, bytecode} = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : '0x' + bytecode})
    .send({from: accounts[0], gas: '1000000'})
    .catch((err) => {
      console.log('err--', err);
    });

    console.log('lottery', lottery);
  lottery.setProvider(provider);
});

describe('Lottery Contract', () => {
  it('deploys a contract', () =>{
    assert.ok(lottery.options.address);
  })
});
