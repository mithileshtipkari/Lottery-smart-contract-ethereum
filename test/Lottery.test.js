const assert = require('assert');
// const ganache = require('ganache-cli');
const { interface, bytecode} = require('../compile');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
  'captain spread subway garment major stairs anger elbow gun syrup slender frost',
  'https://rinkeby.infura.io/v3/1bb2b0b14ee243e1a15080bccfd8c69c'
);

// const provider = ganache.provider();
const web3 = new Web3(provider);

let lottery;
let accounts;

beforeEach(async function () {
  try{
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data : '0x' + bytecode})
      .send({from: accounts[0], gas: '1000000'})
      .catch((err) => {
        console.log('err--', err);
      });

      console.log('lottery', lottery);
    // lottery.setProvider(provider);
  } catch(error){
    console.log('error in beforeEach--', error);
  }

});

describe('Lottery Contract', function () {
  it('deploys a contract', function() {
    try{
      assert.ok(lottery.options.address);
    } catch(error){
      console.log('error in beforeEach--', error);
    }
  });

  it('enters an account', async () =>{
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, player.length);
  });

});
