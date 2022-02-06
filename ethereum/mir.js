import web3 from './web3';
import MIR_Hospital_Selection from './build/MIR_Hospital_Selection.json';

export default (address) => {
	return new web3.eth.Contract(
		JSON.parse(JSON.stringify(MIR_Hospital_Selection.abi)),
		address
	);
};