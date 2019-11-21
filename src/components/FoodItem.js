import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
const moment = require('moment');

class FoodItem extends Component {
  
  state = {
    expired: false,
    expirationDate: moment().add(7, 'days'),
    //TODO: change this to user input
  }
  
  render() {
    return (
      <Card >
        <Card.Title> FOOD ITEM!!!!!! </Card.Title>
        <Card.Body>
          Expiration Date: {this.state.expirationDate}
        </Card.Body>
      </Card> 
    )
  }
}

export default FoodItem