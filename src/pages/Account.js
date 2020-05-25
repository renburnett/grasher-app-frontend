import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import CONSTANTS from '../constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useGlobal from '../util/store';
import SecurityHOC from '../HOCs/SecurityHOC';

//TODO: this is basically exact same as SIGNUP component; strip out duplicate code plz and tnx

const Account = (props) => {
  const [state, actions] = useGlobal();
  const history = useHistory();

  const currentUser = state.currentUser;

  const [newUser, setNewUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    phone_number: currentUser.phone_number,
    budget: currentUser.budget,
  });

  const handleNewUserFormSubmit = async () => {
    //TODO: validate that user form fully filled out
    //TODO: VALIDATIONS!!!!!!!!!!!!!
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);

    try {
      const response = await axios.patch(
        CONSTANTS.BASE_API_URL + CONSTANTS.USER_UPDATE_URL(currentUser.id),
        { user: newUser, jwt: state.jwt },
      );
      const { user } = response.data;

      await actions.setCurrentUser(user);
      props.setUserAndJwtToLocalStorage(user);
      await history.push('/');

    } catch (error) {
      console.log('signup error:', error);
    }
  }

  const handleNewUserFormChange = (e, val) => {
    const { name, value } = val;
    setNewUser({ ...newUser, [name]: value });
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: '55vh' }}>
        <Segment>
          <Form size='large' onSubmit={handleNewUserFormSubmit}>
            <Header as='h2' color='blue' textAlign='left'>
              Update Account
            </Header>
            <Form.Input
              label="Username"
              name='username'
              fluid
              icon='user'
              iconPosition='left'
              onChange={handleNewUserFormChange}
            />
            <Form.Input
              label="Email"
              name='email'
              fluid
              icon='mail'
              iconPosition='left'
              onChange={handleNewUserFormChange}
            />
            <Form.Input
              label="Password"
              name='password'
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              onChange={handleNewUserFormChange}
            />
            <Form.Input
              label="Phone Number"
              name='phone_number'
              fluid
              icon='phone'
              iconPosition='left'
              onChange={handleNewUserFormChange}
            />
            <Form.Input
              label="Budget"
              name='budget'
              fluid
              icon='dollar sign'
              iconPosition='left'
              onChange={handleNewUserFormChange}
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

export default SecurityHOC(Account);