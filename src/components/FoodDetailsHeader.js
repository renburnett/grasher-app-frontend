import React from 'react';
import { Image, Card, Button, Divider, Form, Header, Label } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';
import CONSTANTS from '../constants';
const moment = require('moment');

const FoodDetailsHeader = (props) => {
  const totalCapacity = props.currentFridge.drink_capacity + props.currentFridge.food_capacity;

  return (
    <Card style={{minWidth: "40%"}}>
      <Image src={open_fridge} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{ props.currentFridge.name }</Card.Header>
        <Divider />
        <Card.Description>
          <Form size="mini">
            <Header>Add Food:</Header>
            <Form.Group inline>
              <Form.Dropdown required label="Food Type" placeholder={"vegetable"} options={CONSTANTS.FOOD_OPTIONS} />
              <Form.Radio required label="Beverage" toggle />
            </Form.Group>
            <Form.Input required label="Food Name" placeholder="Milk" />
            <Form.Input required label="Quantity" placeholder="1" max={totalCapacity} />
            <Form.Input required label="Price" labelPosition='right' type='text' placeholder="2.99">
              <Label basic>$</Label>
              <input/>
              <Label>.00</Label>
            </Form.Input>
            <Form.Input required label="Expiration Date" placeholder={moment().format("L")} type="date" />
            {/* https://react.semantic-ui.com/collections/form/#states-error */}
            <Button type="submit">Submit</Button>
          </Form>
          
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {moment().format("LLLL")}
      </Card.Content>
    </Card>
  )
}

export default FoodDetailsHeader;

