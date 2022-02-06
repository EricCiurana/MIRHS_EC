import React, { Component, useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import MIR from '../ethereum/mir';
import web3 from '../ethereum/web3';
import { Router } from '../routes';



const Join = ({address}) => {
	const [loading, setLoading] = useState(false)
	const [state, setState] = React.useState({
    firstName: "",
    lastName: ""
  })
	function handleChange(evt) {
  const value = evt.target.value;
  setState({
    ...state,
    [evt.target.name]: value
  });
}

	const handleOnSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		try {
			const mir = MIR(address)
			const accounts = await web3.eth.getAccounts()
			await mir.methods.joinExaminee(state.firstName, state.lastName).send({ from: accounts[0] })

			Router.replaceRoute(`/MIR/${address}`)
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	return (
    <Form onSubmit={ handleOnSubmit } loading={loading}>
      <Form.Field>
        <label>Name</label>
        <Input
        label="Eric"
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Surname</label>
        <Input
        label="Ciurana"
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
      </Form.Field>
      <Button primary>
				Join
			</Button>
    </Form>
  );
}

export default Join
