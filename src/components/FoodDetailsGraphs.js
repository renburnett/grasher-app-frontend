import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';
import CONSTANTS from '../constants';
import { Card, Divider, Button, Icon } from 'semantic-ui-react';

class FoodDetailsGraphs extends Component {
  render() {
    return (
      <Card style={{minWidth: '50%'}}>
        <Card.Content>
          <Card.Header>Breakdown of Consumables</Card.Header>
          <Divider />
          <div>
            <VictoryChart domainPadding={30}>
              <VictoryBar
                animate={{ onLoad: { duration: 1000 } }}
                style={{ data: { fill: "#6DB65B" }, labels: { fontSize: 16 } }}
                data={[
                  { x: "chips", y: 1234 },
                  { x: "meat", y: 10000 },
                  { x: "beer", y: 12000 },
                ]}
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
          <p>Drink Capacity: { this.props.currentFridge.drink_capacity }</p>
          <p>Food Capacity: { this.props.currentFridge.food_capacity }</p>
          <br/>
          <p>Fetch recipes for food near it's expiration date:</p>
          {/* <Button type="submit" loading>Loading</Button>  TODO: implement after recipe API fetch */}
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