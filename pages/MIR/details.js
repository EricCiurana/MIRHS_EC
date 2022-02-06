import React, { Component } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import MIR from '../../ethereum/mir';
import Join from '../../components/join';
import { Link } from '../../routes';

class MIRDetails extends Component {
	static async getInitialProps(props) {
		const mirContract = MIR(props.query.address);
		const details = await mirContract.methods.getDetails().call();
		//console.log(details);
		return {
			numHospitals: details[0],
			numExaminees: details[1],
			numSelection: details[2],
			isOpen: details[3],
			addr: props.query.address,
		};
	}

	renderDetails() {
		const items = [
			{
				header: 'Hospitals',
				meta: this.props.numHospitals,
				description: 'Total number of hospitals to choose from'
			},
			{
				header: 'Participants',
				meta: this.props.numExaminees,
				description: 'Total number of participants in this process'
			},
			{
				header: 'Turn',
				meta: this.props.numSelection,
				description: 'Current turn'
			},
			{
				header: 'Is the process still open?',
				meta: this.props.isOpen.toString(),
				description: 'If false, the process is closed'
			},
		];

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h1>{this.props.addr}</h1>
				<Grid>
					<Grid.Row>
						<Grid.Column width={7}>
								<Join  address={this.props.addr} />
						</Grid.Column>
						<Grid.Column width={9}>
							{this.renderDetails()}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Link route={`/MIR/${this.props.address}/hospitals`}>
								<a>
									<Button secondary >Manage hospitals</Button>
								</a>
							</Link>	
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default MIRDetails;