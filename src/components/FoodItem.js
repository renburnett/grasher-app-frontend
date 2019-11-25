import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
const moment = require('moment');

class FoodItem extends Component {
  
  state = {
    expired: false,
    expirationDate: moment().add(7, 'days'),
    //TODO: change this to user input
  }
  
  render() {
    const { foodItem } = this.props

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <Icon
              floated='left'
              size='large'
              name='food'
            />
            { foodItem.name }
            </Card.Header>
          <Card.Description>
            Expiration Date: 
            {moment(foodItem.expiration_date).format('LLLL')}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default FoodItem;