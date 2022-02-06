import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import MIRLauncher from '../ethereum/launcher';
import Layout from '../components/Layout';
import { Link } from '../routes';

class MIRIndex extends Component {
	static async getInitialProps () {
		const MIRList = await MIRLauncher.methods.getMIRList().call();
		return { MIRList };
	}


	renderMIRList() {
		const items = this.props.MIRList.map((address) => {
			return {
				header: address,
				description: (
					<Link route={`/MIR/${address}`}>
						<a>View Selection</a>
					</Link>
				),
				fluid: true
			};
		});

		return <Card.Group items={items} />;
  }
  render() {
  	//This returns the list of MIR_Hospital_Selection contract adresses
    return (
    <Layout>
	    <div>
	    	<h2>Past MIRs</h2>
	    	<Link route="/MIR/new">
		    	<a>
			    	<Button
			    		floated="right"
			    		content="Start a new MIR Hospital Selection"
			    		icon="add circle"
			    		primary
			    	/>
			    </a>
		    </Link>
	    	{this.renderMIRList()}
	    </div>
	</Layout>
    );
  }
}

export default MIRIndex;