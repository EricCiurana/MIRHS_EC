import React, { Component, useState } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import launcher from '../../ethereum/launcher';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

export default function New() {
	const [uniqueID, setUniqueID] = useState('')

	const handleOnChange = (event) => {
	    event.preventDefault()
	    setUniqueID(event.target.value)
  	}

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		
			// Get accs from MetaMask (from within the browser)
			const accounts = await web3.eth.getAccounts();
			// Launch using first MetaMask acc found
			await launcher.methods.newMIR(uniqueID).send({
				from: accounts[0],
			});
			Router.pushRoute('/');
		
	};

	return (
    <Layout>
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              type="number"
              label="MIR_YEAR"
              labelPosition="left"
              placeholder='Minimum Contribution'
              value={uniqueID}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Button primary type='submit'>Create!</Button>
        </Form>
      </Container>
    </Layout>
  )
}
