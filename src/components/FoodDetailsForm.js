import React, { Component } from 'react';
import { Image, Card, Form, Header, Label } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';
import CONSTANTS from '../constants';
import RecipeApiFetcher from './RecipeApiFetcher';
let moment = require('moment');

class FoodDetailsForm extends Component {

  render() {
    const { drink_capacity, food_capacity, name } = this.props.currentFridge;

    return (
      <Card style={{minWidth: "40%"}}>
        <Image src={open_fridge} wrapped ui={false} />
        <Card.Content>
          <Header as="h2" color="pink">{ name }</Header>
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
                  required
                />
                <Form.Radio 
                  onChange={this.props.handleFoodFormChange}
                  name="is_drink"
                  label="Beverage"
                  toggle={true}
                  required
                />
              </Form.Group>
              <Form.Input 
                onChange={this.props.handleFoodFormChange}
                name="name"
                label="Food Name"
                placeholder="Eggs"
                required
              />
              <Form.Input
                onChange={this.props.handleFoodFormChange}
                name="quantity" 
                label="Quantity" 
                placeholder="1" 
                max={drink_capacity + food_capacity}
                required
              />
              {/* TODO: change to dropdown? */}
              <Form.Input
                onChange={this.props.handleFoodFormChange}
                name="price" 
                label="Price" 
                labelPosition='left' 
                type='text' 
                placeholder="2.99"
                required
              >
                <Label basic>$</Label>
                <input/>
              </Form.Input>
              <Form.Input
                onChange={this.props.handleFoodFormChange}
                name="expiration_date" 
                label="Expiration Date" 
                placeholder={moment().format("L")} 
                type="date"
                required
              />
              {/* https://react.semantic-ui.com/collections/form/#states-error */}
              {/* TODO: add modal */}
              <Form.Button type="submit">Submit</Form.Button>
            </Form>
            <br/>
            <RecipeApiFetcher />
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

