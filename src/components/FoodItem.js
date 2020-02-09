import React, { Component } from 'react';
import { Card, Icon, Divider, Button } from 'semantic-ui-react';
const moment = require('moment');

class FoodItem extends Component {
  
  state = {
    expirationDate: moment().add(7, 'days')
    //TODO: change this to user input
  }
  
  render() {
    const { foodItem } = this.props

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <Icon floated='left' size='large' name='food' />
            { foodItem.name }
            <Button onClick={(e, foodItem) => {this.props.handleFoodItemDelete(e, foodItem)}} floated='right' icon='x' id={foodItem.id} />
              {/* TODO: Add "Are you sure" Modal on delete button */}
          </Card.Header>
          <Divider />
          <Card.Description>
            <p> Expiration Date: </p> 
            {moment(foodItem.expiration_date).format('LLLL')}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default FoodItem;