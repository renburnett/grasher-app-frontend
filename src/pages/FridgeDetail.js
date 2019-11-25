import React, { Component } from 'react';
import FoodItem from '../components/FoodItem';
import { Image, Header, Card, Grid } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';

class FridgeDetail extends Component {

  state = {
    currentFridge: {
      name: '',
      drink_capacity: 0,
      food_capacity: 0,
      total_items_value: 0,
      food_items: [],
      }
  }

  static getDerivedStateFromProps(nextProps) {
    const emptyFridge = {
      name: '',
      drink_capacity: 0,
      food_capacity: 0,
      total_items_value: 0,
      food_items: [],
      }

    if (nextProps.fridges.length > 0) {
      return {currentFridge: nextProps.fridges.find(fridge => fridge.id === Number(nextProps.match.params.id))}
    } else {
      return { currentFridge: emptyFridge }
    }

  }

  displayFoodItems = () => {
    return this.state.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem foodItem={foodItem} key={id} />
    })
  }
  
  displayFridge = () => {
    return (
      <Card>
        <Image src={open_fridge} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{ this.state.currentFridge.name }</Card.Header>
          <Card.Description>
            Graphs for: 
            <p>how full fridge is drinks: { this.state.currentFridge.food_items.length }</p>
            <p>how full fridge is food: { this.state.currentFridge.food_items.length }</p>
            <p>food that will be bad in 48hrs</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          extra content
        </Card.Content>
      </Card>
    )
  }

  render() {
    return (
      <Grid centered textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '100vh'}}>
          <Card.Group centered>
            {this.displayFridge()}
          </Card.Group>
          <Card.Group centered>
          {this.displayFoodItems()}
          </Card.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

export default FridgeDetail;