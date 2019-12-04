import React, { Component } from 'react';
import FoodItem from '../components/FoodItem';
import SecurityHOC from '../HOCs/SecurityHOC';
import FridgeLoadHOC from '../HOCs/FridgeLoadHOC';
import FoodDetailsForm from '../components/FoodDetailsForm';
import { Card, Grid, Divider, Button, Icon } from 'semantic-ui-react';
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';
import CONSTANTS from '../constants';

class FridgeDetail extends Component {

  componentDidMount() {
    this.props.setCurrentFridge(this.props.match.params.fridge_id)
  }

  displayFoodItems = () => {
    return this.props.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem handleFoodItemDelete={this.props.handleFoodItemDelete} foodItem={foodItem} key={id} />
    })
  }

  displayFridge = () => {
    return (
    <>
      <FoodDetailsForm handleFoodFormSubmit={this.props.handleFoodFormSubmit} handleFoodFormChange={this.props.handleFoodFormChange} fetchUsersFridges={this.props.fetchUsersFridges} currentFridge={this.props.currentFridge} />
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
                colorScale={CONSTANTS.randomColors(5)}
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
    </>
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

FridgeDetail.defaultProps = {
  currentFridge: {
    name: '',
    drink_capacity: 0,
    food_capacity: 0,
    total_items_value: 0,
    food_items: [],
  }
}

export default SecurityHOC(FridgeLoadHOC(FridgeDetail));