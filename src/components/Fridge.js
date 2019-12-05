import { Header, Card, Image, Divider, Progress, Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import FoodTypesGraph from './FoodTypesGraph';
import fridge_icon1 from '../images/fridge_01.svg';
import fridge_icon2 from '../images/fridge_02.svg';
import fridge_icon3 from '../images/fridge_03.svg';
let moment = require('moment');

class Fridge extends Component {

  shuffleIcon = () => {
    if (this.props.idx % 3 === 0) {
      return <Image size="big" src={fridge_icon1}/>
    } else if (this.props.idx % 3 === 1) {
      return <Image size="big" src={fridge_icon2}/>
    } else if (this.props.idx % 3 === 2) {
      return <Image size="big" src={fridge_icon3}/>
    }
  }

  foodExpiringIn48Hrs = (expiryDate) => {
    const now = moment();
    const expiry = moment(expiryDate);
    const timeTilExpiry = moment.duration(expiry.diff(now)).asHours();
    
    if (timeTilExpiry <= 48) {
      return true;
    } else {
      return false;
    }
  }

  calculateAmountOfFoodExpiringIn48Hrs = () => {
    let expiringFood = 0;
    this.props.fridge.food_items.forEach((food) => {
      if (this.foodExpiringIn48Hrs(food.expiration_date)) {
        expiringFood += 1;
      }
    })
    const percentage = Math.round((expiringFood / this.props.fridge.food_items.length) * 100);
    return percentage;
  }

  render(){
    return (
      <Card style={{minWidth: '40vh'}} >
        <Card.Content>
          <Grid textAlign='center' columns={3} verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column>
                <Image size='mini'>{ this.shuffleIcon() }</Image>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' color='blue'>{ this.props.fridge.name }</Header>
              </Grid.Column>
              <Grid.Column>
                <Button fridge_id={this.props.fridge.id} icon='x' size='medium' onClick={this.props.handleFridgeDelete} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content
          as={Link}
          to={`/fridges/${this.props.fridge.id}`}
        >
          <Divider horizontal>fridge contents</Divider>
          <Card.Description>
            <FoodTypesGraph fridge={this.props.fridge}/>
            <Divider horizontal>food within 48hrs of expiring</Divider>
            <br/>
            <Progress progress percent={this.calculateAmountOfFoodExpiringIn48Hrs()} color='violet' />
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Fridge;