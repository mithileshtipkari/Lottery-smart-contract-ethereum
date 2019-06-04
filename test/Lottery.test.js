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
let deployedContractAddress;

beforeEach(async () => {
  try{
    accounts = await web3.eth.getAccounts();
    console.log('accounts--\n', accounts);
    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data : '0x'+bytecode})
      .send({from: accounts[0], gas: '1000000'})
      .on(('receipt'), (receipt) =>{
        console.log(receipt.contractAddress);
        deployedContractAddress = receipt.contractAddress;
      })
      .catch((err) => {
        console.log('err--', err);
      });

      // console.log('lottery aftr--\n', lottery.options.address);
    lottery.setProvider(provider);
  } catch(error){
    console.log('error in beforeEach--', error);
  }

});

describe('Lottery Contract', () => {
  it('deploys a contract',() => {
    try{
      assert.ok(deployedContractAddress);
      assert.ok(lottery.options.address);
    } catch(error){
      console.log('error in beforeEach--', error);
    }
  });

  it('enters an account', async () => {
    try{
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.02', 'ether')
      });

      const players = await lottery.methods.getPlayers().call({
        from: accounts[0]
      });

      assert.equal(accounts[0], players[0]);
      assert.equal(1, player.length);
    }
    catch(error){
      console.log('error in enters an account--', error);
    }
  });

  it('only manager can call pickWinner', async () =>{
    try{
      await lottery.methods.pickWinner().send({
        from: '0x123456ascbffbf' //some address which is not manager
      }); //if manager calls pickWinner then no error will occur so err object
          // in catch will be undefined and assert.ok will fail, that means
          // manager has called pickWinner, but we need to check it,
          // so to go into catch anyway, fire an error
      assert(false);
    } catch (err){
      console.log('someone else is calling pickWinner');
      assert.ok(err); // if err is undefined - no error - manager called - all ok
    }
  });

  it('enters player and picks a winner', async () =>{
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    // ex - 100 ether remaining after giving 2 ether to lottery contract
    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({
      from : accoun[0]
    }); // 2 ether paid to accounts[0] so he has 102 ether now

    const finalBalance = await web.eth.getBalance(accounts[0]);

    const difference = finalBalance - initialBalance;

    console.log('gas cost - ', difference);
    assert(difference > web3.utils.toWei('1.8', 'ether'));
  });
});
