import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import CONSTANTS from '../constants';

class Signup extends Component {

  state = {
    newUser: { name: '', email: '_@_.com', password: 'shred420', budget: 0, fridges: [] },
  }

  //handlers/helpers for account form 
  handleNewUserFormSubmit = (props) => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newUser),
    }

    fetch(CONSTANTS.USERS_URL, config)
    .then(res => res.json())
    .then(user => this.props.updateCurrentUser(user, props))
  }

  handleNewUserFormChange = (e, val) => {
    const {name, value} = val;
    this.setState((prevState) => {
      prevState.newUser[name] = value;
      return prevState;
    })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '50vh' }}>
          <Segment>
            <Form size='large' onSubmit={() => {this.handleNewUserFormSubmit(this.props)}}>
                <Header as='h2' color='blue' textAlign='left'>
                  Create Account
                </Header>
                <Form.Input 
                  label="Email"
                  name='email'
                  fluid 
                  icon='mail'
                  iconPosition='left'
                  onChange={this.handleNewUserFormChange}
                />
                <Form.Input 
                  label="Name"
                  name='name'
                  fluid 
                  icon='user'
                  iconPosition='left'
                  onChange={this.handleNewUserFormChange}
                />
                <Form.Input
                  label="Password"
                  name='password'
                  fluid
                  icon='lock'
                  iconPosition='left'
                  type='password'
                  onChange={this.handleNewUserFormChange}
                />
                <Form.Input
                  label="Budget"
                  name='budget'
                  fluid
                  icon='dollar sign'
                  iconPosition='left'
                  onChange={this.handleNewUserFormChange}
                />
                <Button color='teal' fluid size='large' type='submit'>
                  Submit
                </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Signup;