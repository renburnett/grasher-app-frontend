import React from 'react';
import FoodItem from './FoodItem';
import { Header, Card } from 'semantic-ui-react';

class Fridge extends React.Component {
  
  state = {
    foodItems: [],
    drinkItems: [],
    foodItemLimit: 5,
    drinkItemLimit: 5,
  }
  
  displayFoodItems = () => {
    return this.state.foodItems.map((foodItem, id) => {
      return <FoodItem foodItem={foodItem} key={id} />
    })
  }

  render() {
    return (
      <>
        <Card>
          <Card.Title> FOOD ITEM1!!!!!! </Card.Title>
          <Card.Body>
            Expiration Date: 01/02/2013
          </Card.Body>
          </Card>
          <Card>
            <Card.Title> FOOD ITEM2!!!!!! </Card.Title>
            <Card.Body>
              Expiration Date: 02/02/2013
            </Card.Body>
          </Card>
          <Card>
          <Card.Title> FOOD ITEM13!!!!! </Card.Title>
          <Card.Body>
            Expiration Date: 03/02/2013
          </Card.Body>
        </Card>
        {/* {this.displayFoodItems()} */}
      </>
    )
  }
}

export default Fridge