const path = require('path');
const fs = require('fs');
const solc = require('solc');


const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
// console.log(lotteryPath);
const source = fs.readFileSync(lotteryPath, 'utf8');

const compiled = solc.compile(source, 1); //1 - no. of contracts that we are trying to compile

// console.log(compiled['contracts'][':Lottery']); //for troubleshooting

module.exports = compiled.contracts[':Lottery'];
