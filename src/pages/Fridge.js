import React, { Component } from 'react';
import FoodItem from '../components/FoodItem';
import { Header, Card } from 'semantic-ui-react';

class Fridge extends Component {
  
  state = {
    foodItems: [],
    drinkItems: [],
    foodItemLimit: 5,
    drinkItemLimit: 5,
  }
  
  componentDidMount() {
    //#TODO: make fetch call to set initial state
    //TODO: call this.DisplayFoodITems() inside render
  }

  displayFoodItems = () => {
    return this.state.foodItems.map((foodItem, id) => {
      return <FoodItem foodItem={foodItem} key={id} />
    })
  }

  render() {
    return (
      <Card.Group centered>
        <Card>
          <Card.Header> FOOD ITEM1!!!!!! </Card.Header>
          <Card.Content>
            Expiration Date: 01/02/2013
          </Card.Content>
          </Card>
          <Card>
            <Card.Header> FOOD ITEM2!!!!!! </Card.Header>
            <Card.Content>
              Expiration Date: 02/02/2013
            </Card.Content>
          </Card>
          <Card>
          <Card.Header> FOOD ITEM13!!!!! </Card.Header>
          <Card.Content>
            Expiration Date: 03/02/2013
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}

export default Fridge;