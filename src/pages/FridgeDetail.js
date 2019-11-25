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
      },
  }

  componentDidMount() {
    //set currentFridge according to url param
    //this.setState({currentFridge: this.props.fridges.find(fridge => fridge.id === this.props.match.params.id)})
    const fridge = this.props.fridges.find(fridge => fridge.id === this.props.match.params.id) 
    console.log("hey!!!!", fridge)
  }

  displayFoodItems = () => {
    console.log('state', this.state)

    return this.state.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem foodItem={foodItem} key={id} />
    })
  }
  
  displayFridge = () => {
    return (
      <Card>
        <Image src={open_fridge} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{ console.log(".", this.state.currentFridge) }</Card.Header>
          <Card.Description>
            Graphs for: 
            <span>how full fridge is drinks: {  }</span>
            <span>how full fridge is food: {  }</span>
            <span>food that will be bad in 48hrs</span>
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
      <Grid stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '35vh'}}>
          <Grid.Row centered>
            {this.displayFridge()}
          </Grid.Row>
          <Card.Group centered>
            {this.displayFoodItems()}
          </Card.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

export default FridgeDetail;