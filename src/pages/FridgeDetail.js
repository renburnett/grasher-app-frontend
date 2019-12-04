import React, { Component } from 'react';
import FoodItem from '../components/FoodItem';
import SecurityHOC from '../HOCs/SecurityHOC';
import FridgeLoadHOC from '../HOCs/FridgeLoadHOC';
import FoodDetailsForm from '../components/FoodDetailsForm';
import FoodDetailsGraphs from '../components/FoodDetailsGraphs';
import { Card, Grid } from 'semantic-ui-react';

class FridgeDetail extends Component {

  componentDidMount() {
    this.props.setCurrentFridge(this.props.match.params.fridge_id)
  }

  displayFoodItems = () => {
    return this.props.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem handleFoodItemDelete={this.props.handleFoodItemDelete} foodItem={foodItem} key={id} />
    })
  }

  displayFridge = () => {
    return (
      <>
        <FoodDetailsForm
          handleFoodFormSubmit={this.props.handleFoodFormSubmit} 
          handleFoodFormChange={this.props.handleFoodFormChange} 
          fetchUsersFridges={this.props.fetchUsersFridges} 
          currentFridge={this.props.currentFridge} 
        />
        <FoodDetailsGraphs currentFridge={this.props.currentFridge} />
      </>
    )
  }

  render() {
    return (
      <Grid centered textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '100vh'}}>
          <Card.Group centered>
            {this.displayFridge()}
          </Card.Group>
          <Card.Group centered>
            {this.displayFoodItems()}
          </Card.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

FridgeDetail.defaultProps = {
  currentFridge: {
    name: '',
    drink_capacity: 0,
    food_capacity: 0,
    total_items_value: 0,
    food_items: [],
  }
}

export default SecurityHOC(FridgeLoadHOC(FridgeDetail));