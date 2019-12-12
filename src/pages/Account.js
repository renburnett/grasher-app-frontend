import React, { Component } from 'react';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import CONSTANTS from '../constants';

class Account extends Component {

  state = {
    newUser: { name: '', email: '_@_.com', password: 'shred420', budget: 0, fridges: [] },
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.currentUser);
    this.setState({newUser: user})
  }

  //handlers/helpers for account form 
  handleAccountFormSubmit = (e, val) => {
    const userCopy = {...this.state.newUser};
    
    const config = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCopy),
    }

    fetch(CONSTANTS.USERS_URL + '/' + userCopy.id, config)
    .then(res => res.json())
    .then(user => this.props.updateCurrentUser(user))
  }

  handleAccountFormChange = (e, val) => {
    const {name, value} = val;
    this.setState((prevState) => {
      prevState.newUser[name] = value;
      return prevState;
    })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      {/* //TODO: refactor to pull GRID out of login AND FridgesContainer? */}
        <Grid.Column style={{ maxWidth: '50vh' }}>
          <Segment>
            <Form size='large' onSubmit={this.handleAccountFormSubmit}>
                <Header as='h2' color='blue' textAlign='left'>
                  Change Account Info
                </Header>
                <Form.Input 
                  label="New Email"
                  name='email'
                  fluid 
                  icon='user'
                  iconPosition='left'
                  onChange={this.handleAccountFormChange}
                />
                <Form.Input
                  label="New Password"
                  name='password'
                  fluid
                  icon='lock'
                  iconPosition='left'
                  type='password'
                  onChange={this.handleAccountFormChange}
                />
                <Form.Input
                  label="New Budget"
                  name='budget'
                  fluid
                  icon='dollar sign'
                  iconPosition='left'
                  onChange={this.props.handleAccountFormChange}
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

export default SecurityHOC(Account);