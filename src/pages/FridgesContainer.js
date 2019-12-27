import React, { Component } from 'react';
import Fridge from '../components/Fridge';
import SecurityHOC from '../HOCs/SecurityHOC';
import FridgeLoadHOC from '../HOCs/FridgeLoadHOC';
import { Grid, Card } from 'semantic-ui-react'
import NewFridgeForm from '../components/NewFridgeForm';

class FridgesContainer extends Component {

  componentDidMount() {
    this.props.fetchUsersFridges()
  }

  displayFridges = () => {
    return this.props.currentUsersFridges.map((fridge, idx) => {
      return <Fridge handleFridgeDelete={this.props.handleFridgeDelete} fridge={fridge} key={fridge.id} idx={idx} />
    })
  }

  render() {
    return (
      <Grid columns={3} stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: '100vh'}}>
            <NewFridgeForm handleFridgeFormSubmit={this.props.handleFridgeFormSubmit} handleFridgeFormChange={this.props.handleFridgeFormChange} />
            <Card.Group centered>
              {this.displayFridges()}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default SecurityHOC(FridgeLoadHOC(FridgesContainer));