import React from 'react';
import { Form, Header, Grid, Segment, Image } from 'semantic-ui-react';
import useGlobal from '../util/store';
import CONSTANTS from '../constants';
import SecurityHOC from '../HOCs/SecurityHOC';
import new_fridge from '../images/new_fridge.png';

const NewFridgeForm = (props) => {
  const [state, actions] = useGlobal();

  const handleFridgeFormChange = (e, { name, value }) => {
    actions.setNewFridge({ ...state.newFridge, [name]: value })
  }

  const handleFridgeFormSubmit = async () => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...state.newFridge, user_id: state.currentUser.id }),
    }

    const res = await fetch(CONSTANTS.FRIDGES_URL, config);
    const fridge = await res.json();
    actions.setCurrentUsersFridges([...state.currentUsersFridges, fridge])
  }

  return (
    <Grid stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: '75vh' }}>
        <Segment>
        <Image src={new_fridge} fluid />
        <br/>
          <Form onSubmit={handleFridgeFormSubmit} size="mini">
            <Header>Add New Fridge:</Header>
            <Form.Input
              onChange={handleFridgeFormChange}
              name="name"
              label="Fridge Name"
              placeholder="Food Bank Fridge"
              required
            />
            <Form.Input
              onChange={handleFridgeFormChange}
              name="food_capacity"
              label="Food Capacity"
              placeholder="10"
              required
            />
            <Form.Input
              onChange={handleFridgeFormChange}
              name="drink_capacity"
              label="Drink Capacity"
              placeholder="12"
              required
            />
            <Form.Button type="submit">Create</Form.Button>
            {/* https://react.semantic-ui.com/collections/form/#states-error */}
            {/* TODO: add modal */}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SecurityHOC(NewFridgeForm);