import React, { Component } from 'react';
import { Button, Form, Grid, Input, Message } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import { Link } from '../../../routes';


class HospitalManagement extends Component {
	static async getInitialProps(props) {
		const { address } = props.query;

		return { address };
	}

	render() {
		return (
			<Layout>
				<h2>Hospital management</h2>
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<h3>New hospital</h3>
							<Form>
								<Form.Field>
									<Input
										label="ID"
										type="text"
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Name"
										type="text"
									/>
								</Form.Field>
								<Button>Add Hospital</Button>
							</Form>
						</Grid.Column>
						<Grid.Column width={8}>
							<h3>New Service</h3>
							<Form>
								<Form.Field>
									<Input
										label="Hospital ID"
										type="text"
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Name"
										type="text"
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Vacancies"
										type="text"
									/>
								</Form.Field>
								<Button>Add service</Button>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default HospitalManagement;