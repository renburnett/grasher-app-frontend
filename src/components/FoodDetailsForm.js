import React, { Component } from 'react';
import { Image, Card, Divider, Form, Header, Label } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';
import CONSTANTS from '../constants';
let moment = require('moment');

class FoodDetailsForm extends Component {
  
  state = {
    newFood: {
      name: 'TRASH',
      is_drink: false,
      price: 1.99,
      food_type: 'fruit',
      expiration_date: '11/12/2089',
      fridge_id: -1,
      //quantity: 0, // TODO: Add ability to change quantity upon form submit
    }
  }

  componentDidMount() {
    if (localStorage.currentFridgeId) {
      this.setState((prevState) => {
        const currentFridgeId = JSON.parse(localStorage.currentFridgeId);
        return prevState.newFood.fridge_id = currentFridgeId;
      })
    }
  }

  handleFormSubmit = () => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newFood),
    }

    fetch(CONSTANTS.FOOD_ITEMS_URL, config)
    .then(this.props.fetchUsersFridges())
    .then(console.log)
  }

  handleFormChange = (e, val) => {
    // console.log('e', e)
    // console.log('val', val)
    
  }

  render() {
    const { drink_capacity, food_capacity, name } = this.props.currentFridge;
    
    return (
      <Card style={{minWidth: "40%"}}>
        <Image src={open_fridge} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{ name }</Card.Header>
          <Divider />
          <Card.Description>
            <Form onSubmit={this.handleFormSubmit} size="mini">
              <Header>Add Food:</Header>
              <Form.Group inline>
                <Form.Dropdown label="Food Type" placeholder={"dairy"} options={CONSTANTS.FOOD_OPTIONS} />
                <Form.Radio label="Beverage" toggle />
              </Form.Group>
              <Form.Input onChange={this.handleFormChange} label="Food Name" placeholder="Eggs" />
              <Form.Input label="Quantity" placeholder="1" max={drink_capacity + food_capacity} />
              {/* TODO: change to dropdown? */}
              <Form.Input label="Price" labelPosition='right' type='text' placeholder="2.99">
                <Label basic>$</Label>
                <input/>
                <Label>.00</Label>
              </Form.Input>
              <Form.Input label="Expiration Date" placeholder={moment().format("L")} type="date" />
              {/* https://react.semantic-ui.com/collections/form/#states-error */}
              <Form.Button type="submit">Submit</Form.Button>
            </Form>
            
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {moment().format("LLLL")}
        </Card.Content>
      </Card>
    )
  }
}

export default FoodDetailsForm;

