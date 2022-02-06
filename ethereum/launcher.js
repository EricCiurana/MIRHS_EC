import web3 from './web3';
import MIRLauncher from './build/MIRLauncher.json';

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(MIRLauncher.abi)),
  '0x914bD795f7a80Ef4e69056B4f11957ebc2b8dB19'
);

export default instance;