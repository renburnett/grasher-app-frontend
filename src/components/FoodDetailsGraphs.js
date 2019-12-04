import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryPie, VictoryLabel } from 'victory';
import CONSTANTS from '../constants';
import { Card, Header, Divider, Segment, Statistic } from 'semantic-ui-react';
let moment = require('moment');

class FoodDetailsGraphs extends Component {

  calculateTimeUntilExpiry = (expiryDate) => {
    const now = moment();
    const expiry = moment(expiryDate);
    const timeTilExpiry = moment.duration(expiry.diff(now)).asDays();
    return timeTilExpiry;
  }

  calculateTotalFoodAndDrink = () => {
    const totalFoodAndDrink = {foodCount: 0, drinkCount: 0};
    this.props.currentFridge.food_items.forEach((food) => {
      if (food.is_drink === true) {
        totalFoodAndDrink.drinkCount += 1;
      } else if (food.is_drink === false) {
        totalFoodAndDrink.foodCount += 1;
      } else {
        console.log('possible error on `foodItem.is_drink` property')
      }
    })
    return totalFoodAndDrink;
  }

  populateBarChart = () => {
    return this.props.currentFridge.food_items.map((foodItem) => {
      return {x: foodItem.name, y: this.calculateTimeUntilExpiry(foodItem.expiration_date)}
    })
  }

  populatePieChart = () => {
    return this.props.currentFridge.food_items.map((foodItem) => {
      return {x: foodItem.name, y: foodItem.quantity}
    })
  }

  render() {
    return (
      <Card style={{minWidth: '50%'}}>
        <Card.Content>
          <Segment>
            <Header as="h3">Breakdown of Consumables</Header>
            <Divider />
            <VictoryChart domainPadding={30}>
              <VictoryLabel text="Days Left Until Expiration" x={225} y={30} textAnchor="middle"/>
              <VictoryBar
                animate={{ onLoad: { duration: 1000 } }}
                style={{ data: { fill: "#007AD9" }, labels: { fontSize: 14 } }}
                data={this.populateBarChart()}
              />
            </VictoryChart>
            <VictoryPie
              padding={{left: 80, right: 80, top: 15, bottom: 15}}
              colorScale={CONSTANTS.COLOR_ARRAY}
              style={{ labels: { fontSize: 14 } }}
              innerRadius={70}
              data={this.populatePieChart()}
            />
          </Segment>
          <br/>
          <Statistic.Group widths='two'>
            <Statistic>
              <Statistic.Value> {this.calculateTotalFoodAndDrink().drinkCount} / { this.props.currentFridge.drink_capacity }</Statistic.Value>
              <Statistic.Label>Drink Capacity</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{this.calculateTotalFoodAndDrink().foodCount} / { this.props.currentFridge.food_capacity }</Statistic.Value>
              <Statistic.Label>Food Capacity</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Card.Content>
        <Card.Content extra>
        Location: Seattle, WA    
        {/* TODO: or pull from user? stretch (Add locator) */}
      </Card.Content>
      </Card>
    );
  }
}

export default FoodDetailsGraphs;