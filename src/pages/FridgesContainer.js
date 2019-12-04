import React, { Component } from 'react';
import Fridge from '../components/Fridge';
import FridgeContainerLoadHOC from '../HOCs/FridgeContainerLoadHOC';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Grid, Card } from 'semantic-ui-react'

class FridgesContainer extends Component {


  displayFridges = () => {
    return this.props.currentUsersFridges.map((fridge, idx) => {
      return <Fridge fridge={fridge} isCurrentFridgeFoodOrDrinkFull={this.props.isCurrentFridgeFoodOrDrinkFull} key={fridge.id} idx={idx} />
    })
  }

  render() {
    return (
      <Grid stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '100vh'}}>
          <Card.Group centered>
            {this.displayFridges()}
          </Card.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SecurityHOC(FridgeContainerLoadHOC(FridgesContainer));