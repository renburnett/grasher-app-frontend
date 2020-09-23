import React from 'react';
import Fridge from '../components/Fridge';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Grid, Card } from 'semantic-ui-react'
import useGlobal from '../util/store';
import CONSTANTS from '../constants';

const FridgesContainer = (props) => {
  const { BASE_API_URL, FRIDGE_DELETE_URL } = CONSTANTS;
  const [state, actions] = useGlobal();

  const handleFridgeDelete = async (e, { fridge_id }) => {
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.jwt}`,
      },
    }
    const res = await fetch(BASE_API_URL + FRIDGE_DELETE_URL(fridge_id), config);
    const { id } = await res.json();

    actions.setCurrentUsersFridges(state.currentUsersFridges.filter(fridge => fridge.id !== id));
    localStorage.setItem('currentUsersFridges', JSON.stringify(state.currentUsersFridges.filter(fridge => fridge.id !== id)));
  }

  const displayFridges = () => {
    return state.currentUsersFridges.map((fridge, idx) => {
      return <Fridge handleFridgeDelete={handleFridgeDelete} fridge={fridge} key={fridge.id} idx={idx} />
    })
  }

  return (
    <Grid columns={3} stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '100vh' }}>
          <Card.Group centered>
            {state.currentUsersFridges.length > 0 ? displayFridges() : null}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SecurityHOC(FridgesContainer);