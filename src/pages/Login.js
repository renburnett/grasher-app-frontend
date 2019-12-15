import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Login extends Component {

  render() {
    return (
      <Grid stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '75vh'}}>
          <Form onSubmit={() => {this.props.handleLoginSubmit(this.props)}} size='large'>
            <Segment>
              <Header as='h1' color='blue' textAlign='left'>
                Grasher
                <Header.Subheader>
                  we don't let your groceries expire on you!
                </Header.Subheader>
              </Header>
              <Form.Input 
                value={this.props.email}
                fluid 
                icon='user' 
                iconPosition='left'
                placeholder='r@r.com'
                name="email"
                onChange={this.props.handleLoginChange}
              />
              <Form.Input
                value={this.props.password}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='123'
                name='password'
                onChange={this.props.handleLoginChange}
              />
              <Form.Button type="submit" content='Submit' color='teal' fluid size='large' />
              <Message>
                Never been here before? <Link to="/signup">Sign Up!</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login;