import React, { Component } from 'react';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class Account extends Component {

  componentDidMount() {
    //TODO: refactor to pull GRID out of login AND FridgesContainer?
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '80vh'}}>

          <Form size='large'>
            <Segment>
              <Header as='h2' color='blue' textAlign='left'>
                Change Account Info
              </Header>

              <Form.Input fluid icon='user' iconPosition='left' placeholder='maria@nw_harvest.org' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='password'
                type='password'
              />
              <Button color='teal' fluid size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SecurityHOC(Account);