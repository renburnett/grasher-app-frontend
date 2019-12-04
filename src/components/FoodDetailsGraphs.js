import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryPie, VictoryLabel } from 'victory';
import CONSTANTS from '../constants';
import { Card, Divider, Button, Icon, Statistic } from 'semantic-ui-react';
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

  }

  render() {
    return (
      <Card style={{minWidth: '50%'}}>
        <Card.Content>
          <Card.Header>Breakdown of Consumables</Card.Header>
          <Divider />
          <div>
            <VictoryChart domainPadding={30}>
            <VictoryLabel text="Days Left Until Expiration" x={225} y={30} textAnchor="middle"/>
              <VictoryBar
                animate={{ onLoad: { duration: 1000 } }}
                style={{ data: { fill: "#007AD9" }, labels: { fontSize: 16 } }}
                data={this.populateBarChart()}
              />
            </VictoryChart>
            <Divider />
            <VictoryPie
                colorScale={CONSTANTS.COLOR_ARRAY}
                style={{ labels: { fontSize: 14 } }}
                innerRadius={75}
                data={[
                  { x: "bread", y: 20 },
                  { x: "pears", y: 20 },
                  { x: "apples", y: 20 },
                  { x: "beer", y: 20 },
                  { x: "lunchable", y: 20 }
                ]}
            />
          </div>
          <Divider />
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
          <br/>
          <Card.Description>Fetch recipes for food nearing it's expiration date:</Card.Description>
          <Button type="submit" animated>
            <Button.Content visible> Next </Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Card.Content>
        <Card.Content extra>
        Location: Seattle, WA
      </Card.Content>
      </Card>
    );
  }
}

export default FoodDetailsGraphs;