import React, { Component } from 'react';
import { Image, Card, Divider, Form, Header, Label } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';
import CONSTANTS from '../constants';
let moment = require('moment');

class FoodDetailsForm extends Component {

  render() {
    const { drink_capacity, food_capacity, name } = this.props.currentFridge;

    return (
      <Card style={{minWidth: "40%"}}>
        <Image src={open_fridge} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{ name }</Card.Header>
          <Divider />
          <Card.Description>
            <Form onSubmit={this.props.handleFoodFormSubmit} size="mini">
              <Header>Add Food:</Header>
              <Form.Group inline>
                <Form.Dropdown 
                  onChange={this.props.handleFoodFormChange}
                  name="food_type" 
                  label="Food Type" 
                  placeholder="dairy"
                  options={CONSTANTS.FOOD_OPTIONS} 
                />
                <Form.Radio 
                  onChange={this.props.handleFoodFormChange}
                  name="is_drink" 
                  label="Beverage" 
                  value="false" 
                  //TODO: FIX THIS TO TOGGLE iehter 0/1 or true/false
                  toggle
                />
              </Form.Group>
              <Form.Input 
                onChange={this.props.handleFoodFormChange}
                name="name" 
                label="Food Name" 
                placeholder="Eggs" 
              />
              <Form.Input
                onChange={this.props.handleFoodFormChange}
                name="quantity" 
                label="Quantity" 
                placeholder="1" 
                max={drink_capacity + food_capacity} 
              />
              {/* TODO: change to dropdown? */}
              <Form.Input
                onChange={this.props.handleFoodFormChange}
                name="price" 
                label="Price" 
                labelPosition='right' 
                type='text' 
                placeholder="2.99"
              >
                <Label basic>$</Label>
                <input/>
                <Label>.00</Label>
              </Form.Input>
              <Form.Input
                onChange={this.props.handleFoodFormChange}
                name="expiration_date" 
                label="Expiration Date" 
                placeholder={moment().format("L")} 
                type="date" 
              />
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

