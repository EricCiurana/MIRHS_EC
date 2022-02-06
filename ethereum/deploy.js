/**
 * This shall allow to deploy to the Rinkeby test network 
 * for real-life delays and accounts scenario
 */


  
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const MIRLauncher = require('./build/MIRLauncher.json')
const MIR = require('./build/MIR_Hospital_Selection.json')

const provider = new HDWalletProvider({
    mnemonic: {
        phrase:  'exotic crater normal medal vote tortoise country floor close door horn welcome'
      },
    providerOrUrl: 'https://rinkeby.infura.io/v3/b269dd1fcad74f65ae120e1f0c93a95d'
    });

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const MIRLauncherResult = await new web3.eth.Contract(MIRLauncher.abi)
    .deploy({ data: MIRLauncher.evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] })

  // 0x851539f3CB937CDE00029B803ff22F95ACFF39B7
  console.log('Contract deployed to:', MIRLauncherResult.options.address)
  provider.engine.stop()
}

deploy()