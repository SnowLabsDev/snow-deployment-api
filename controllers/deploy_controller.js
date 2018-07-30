// COMPILE DEPENDENCIES
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const axios = require('axios');

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
    const compileProps = req.body;
    const {
      contractType,
      contractId,
    } = compileProps;

    contractFilename = contractType + '.sol';

    const contractPath = path.resolve(__dirname, '../contracts', contractFilename);
    const source = fs.readFileSync(contractPath, 'utf8');

    const iter = ':' + contractType;

    // send response that we're starting the compilation process
    res.send({"compiling": "true"});

    const { interface, bytecode } = solc.compile(source, 1).contracts[iter];

    axios.put(`https://snowlabsdev-api.herokuapp.com/api/contracts/id/${contractId}`, {
      ethABI: interface,
      ethBytecode: bytecode
    });
  },

  async deploy(req, res, next) {
    const deployProps = req.body;

    const {
      contractId,
      ethABI,
      ethBytecode,
      arguments
    } = deployProps;

    // send the response that we're starting the deployment process
    res.send({"deploying": "true"});

    const result = await new web3.eth.Contract(JSON.parse(ethABI))
      .deploy({
        data: '0x' + ethBytecode,
        arguments: arguments
      })
      .send({ gas: '1000000', from: deployFromAddress })
      .catch((err) => {
        console.log(err);
      });

      axios.put(`https://snowlabsdev-api.herokuapp.com/api/contracts/id/${contractId}`, {
        ethAddress: result.options.address
      });
  },
};
