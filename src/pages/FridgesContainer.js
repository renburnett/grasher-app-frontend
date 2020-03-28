import React from 'react';
import Fridge from '../components/Fridge';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Grid, Card } from 'semantic-ui-react'
import NewFridgeForm from './NewFridgeForm';
import useGlobal from '../util/store';
import CONSTANTS from '../constants';

const FridgesContainer = (props) => {
  const [state, actions] = useGlobal();

  const handleFridgeDelete = async (e, {fridge_id}) => {
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(CONSTANTS.FRIDGES_URL + '/' + fridge_id, config);
    const fridgeId = await res.json().id;
    actions.setCurrentUsersFridges(state.currentUsersFridges.filter(fridge => fridge.id !== fridgeId));
  }

  const displayFridges = () => {
    return state.currentUsersFridges.map((fridge, idx) => {
      return <Fridge handleFridgeDelete={handleFridgeDelete} fridge={fridge} key={fridge.id} idx={idx} />
    })
  }

  return (
    <Grid columns={3} stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '100vh'}}>
          <Card.Group centered>
            {displayFridges()}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SecurityHOC(FridgesContainer);