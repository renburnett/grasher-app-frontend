import React from 'react';
import Fridge from '../components/Fridge';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Grid, Card } from 'semantic-ui-react'
import NewFridgeForm from '../components/NewFridgeForm';
import useGlobal from '../util/store';

const FridgesContainer = (props) => {
  const [state, actions] = useGlobal();

  const displayFridges = () => {
    console.log('state', state)
    return state.currentUsersFridges.map((fridge, idx) => {
      return <Fridge handleFridgeDelete={props.handleFridgeDelete} fridge={fridge} key={fridge.id} idx={idx} />
    })
  }

  return (
    <Grid columns={3} stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '100vh'}}>
          <NewFridgeForm handleFridgeFormSubmit={props.handleFridgeFormSubmit} handleFridgeFormChange={props.handleFridgeFormChange} />
          <Card.Group centered>
            {displayFridges()}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SecurityHOC(FridgesContainer);