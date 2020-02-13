import React, { Component } from 'react';
import FoodItem from '../components/FoodItem';
import SecurityHOC from '../HOCs/SecurityHOC';
import SingleFridgeLoadHOC from '../HOCs/SingleFridgeLoadHOC';
import FoodDetailsForm from '../components/FoodDetailsForm';
import FoodDetailsGraphs from '../components/FoodDetailsGraphs';
import { Card, Grid } from 'semantic-ui-react';
import CONSTANTS from '../constants';
let moment = require('moment');

class FridgeDetail extends Component {

  state = {
    foodItemsExpiringIn48Hrs: [],
    recipes: {}
  }

  componentDidMount() {
    this.props.setCurrentFridge(this.props.match.params.fridge_id);
  }

  calculateTimeUntilExpiry = (expiryDate, inDays=true) => {
    const now = moment();
    const expiry = moment(expiryDate);
    if (inDays === true) {
      const timeTilExpiry = moment.duration(expiry.diff(now)).asDays();
      if (timeTilExpiry < 0)
        return 0.1;
      else 
        return timeTilExpiry;
    } else {
      const timeTilExpiry = moment.duration(expiry.diff(now)).asHours();
      if (timeTilExpiry < 0)
        return 0.1;
      else 
        return timeTilExpiry;
    }
  }

  getRecipesForFoodItemsNearExpiry = () => {
    this.setState((prevState) => {
      prevState.foodItemsNearExpiry = this.props.currentFridge.food_items
        .filter(foodItem => this.calculateTimeUntilExpiry(foodItem.expiration_date, false) <= 48)
        .map(foodItem => foodItem.name)
        .join(',');

      return prevState;
    }, () => {
      this.fetchRecipes()
    })
  }

  displayFoodItems = () => {
    return this.props.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem handleFoodItemDelete={this.props.handleFoodItemDelete} foodItem={foodItem} key={id} />
    })
  }

  fetchRecipes = () => {
    const config = {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": CONSTANTS.SPOONACULAR_HEADER,
        "x-rapidapi-key": process.env.REACT_APP_SPOONACULAR_KEY
        }
      }

    const modifiedUrl = CONSTANTS.SPOONACULAR_URL + `/recipes/findByIngredients?ingredients=${this.state.foodItemsNearExpiry}&number=3`;

    fetch(modifiedUrl, config)
    .then(res => res.json())
    .then(recipes => {
      this.setState({recipes});
    })
    .catch(error => console.log(error))
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
        <FoodDetailsGraphs 
          currentFridge={this.props.currentFridge}
          calculateTimeUntilExpiry={this.calculateTimeUntilExpiry}
          getRecipesForFoodItemsNearExpiry={this.getRecipesForFoodItemsNearExpiry}
          recipes={this.state.recipes}
        />
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

export default SecurityHOC(SingleFridgeLoadHOC(FridgeDetail));