import React from 'react';
import { VictoryBar, VictoryChart, VictoryPie, VictoryLabel } from 'victory';
import CONSTANTS from '../constants';
import { Card, Header, Divider, Segment, Statistic } from 'semantic-ui-react';
import RecipeApiFetcher from './RecipeApiFetcher';

const FoodDetailsGraphs = (props) => {

  const calculateTotalFoodAndDrink = () => {
    const totalFoodAndDrink = { foodCount: 0, drinkCount: 0 };
    props.currentFridge.food_items.forEach((food) => {
      if (food.is_drink === true) {
        totalFoodAndDrink.drinkCount += food.quantity;
      } else if (food.is_drink === false) {
        totalFoodAndDrink.foodCount += food.quantity;
      } else {
        console.log('possible error on `foodItem.is_drink` property')
      }
    })
    return totalFoodAndDrink;
  }

  const populateBarChart = () => {
    return props.currentFridge.food_items.map((foodItem) => {
      return { x: foodItem.name, y: props.calculateTimeUntilExpiry(foodItem.expiration_date) }
    })
  }

  const populatePieChart = () => {
    return props.currentFridge.food_items.map((foodItem) => {
      return { x: foodItem.name, y: foodItem.quantity }
    })
  }

  return (
    <Card style={{ minWidth: '50%' }}>
      <Card.Content>
        <Segment>
          <Header as="h3">Breakdown of Consumables</Header>
          <Divider />
          <VictoryChart domainPadding={30}>
            <VictoryLabel text="Days Left Until Expiration" x={225} y={30} textAnchor="middle" />
            <VictoryBar
              animate={{ onLoad: { duration: 1000 } }}
              style={{ data: { fill: "#007AD9" }, labels: { fontSize: 14 } }}
              data={populateBarChart()}
            />
          </VictoryChart>
          <VictoryPie
            padding={{ left: 80, right: 80, top: 15, bottom: 15 }}
            colorScale={CONSTANTS.COLOR_ARRAY}
            style={{ labels: { fontSize: 14 } }}
            innerRadius={70}
            data={populatePieChart()}
          />
        </Segment>
        <br />
        <Statistic.Group widths='two'>
          <Statistic>
            <Statistic.Value> {calculateTotalFoodAndDrink().drinkCount} / {props.currentFridge.drink_capacity}</Statistic.Value>
            <Statistic.Label>Drink Capacity</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{calculateTotalFoodAndDrink().foodCount} / {props.currentFridge.food_capacity}</Statistic.Value>
            <Statistic.Label>Food Capacity</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <RecipeApiFetcher
          getRecipesForFoodItemsNearExpiry={props.getRecipesForFoodItemsNearExpiry}
          recipes={props.recipes}
        />
      </Card.Content>
      <Card.Content extra>
        Location: Seattle, WA
      {/* TODO: or pull from user? stretch (Add locator) */}
      </Card.Content>
    </Card>
  );
}

export default FoodDetailsGraphs;