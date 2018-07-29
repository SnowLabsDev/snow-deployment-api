// COMPILE DEPENDENCIES
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// DEPLOYMENT DEPENDENCIES
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
  'air tool apology ghost arrow gown tunnel velvet trouble spy shell pyramid',
  'https://rinkeby.infura.io/v3/7b0aa545a93f437882b5a5161882c289' // why are we using this?
  );

const web3 = new Web3(provider);

const deployFromAddress = "0x7120FF8FE37015CF708672Fef018849D3c0717dB";

module.exports = {

  compile(req, res, next) {

    const props = req.body;
    const {
      contractType,
      contractId,
     } = props;

    contractFilename = contractType + '.sol';

    const contractPath = path.resolve(__dirname, '../contracts', contractFilename);
    const source = fs.readFileSync(contractPath, 'utf8');

    const iter = ':' + contractType;

    const { interface, bytecode } = solc.compile(source, 1).contracts[iter];

    res.send({ "contractId": contractId, "ethABI": interface, "ethBytecode": bytecode });
  },

  async deploy(req, res, next) {

    const props = req.body;

    const {
      contractId,
      ethABI,
      ethBytecode,
      arguments
    } = props;

    const result = await new web3.eth.Contract(JSON.parse(ethABI))
      .deploy({
        data: '0x' + ethBytecode,
        arguments: arguments
      })
      .send({ gas: '1000000', from: deployFromAddress })
      .catch((err) => {
        console.log(err);
      });

      res.send({ "contractId": contractId, "ethAddress": result.options.address });

  },
};
