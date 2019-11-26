import React from 'react';
import { Image, Icon, Card, Button, Divider, Form, Header } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';
const moment = require('moment');

const FoodDetailsHeader = (props) => {

  return(
    <Card style={{minWidth: '39%'}}>
      <Image src={open_fridge} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{ props.currentFridge.name }</Card.Header>
        <Divider />
        <Card.Description>
          <p>Location: TODO: hook this up</p>
          <p>Drink Capacity: { props.currentFridge.drink_capacity }</p>
          <p>Food Capacity: { props.currentFridge.food_capacity }</p>
          <p>Food Expiring in less than 48hrs: {}</p>
          <br/>
          <p>Fetch recipes for food near it's expiration date:</p>
          <Divider />
          <Form>
            <Header>Add Food Item to Fridge:</Header>
            <Form.Field required>
              <label>Food Name</label>
              <input placeholder="Milk" />
            </Form.Field>
            <Form.Field required>
              <label>Quantity</label>
              <input placeholder="3" />
            </Form.Field>
            {/* <Button type="submit" loading>Loading</Button>  TODO: implement after recipe API fetch */}
            <Button type="submit" animated>
              <Button.Content visible> Next </Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Form>
          
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {moment().format('LLLL')}
      </Card.Content>
    </Card>
  )
}

export default FoodDetailsHeader;

