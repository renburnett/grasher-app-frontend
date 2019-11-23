import React, { Component } from 'react';
import FoodItem from '../components/FoodItem';
import { Image, Header, Card, Grid } from 'semantic-ui-react';
import open_fridge from '../images/open_fridge.png';

class Fridge extends Component {

  displayFoodItems = () => {
    return this.props.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem foodItem={foodItem} key={id} />
    })
  }
  
  displayFridge = () => {
    return (
      <Card>
        <Image src={open_fridge} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{ console.log(this.props.currentFridge) }</Card.Header>
          <Card.Description>
            Graphs for: 
            <span>how full fridge is drinks: { console.log(this.props) }</span>
            <span>how full fridge is food: { console.log(this.props) }</span>
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
    this.props.setCurrentFridge(this.props)
    return (
      <Grid stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '100vh'}}>
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

export default Fridge;