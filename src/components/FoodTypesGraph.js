import React, { Component } from 'react';
import { VictoryPie } from 'victory';
import CONSTANTS from '../constants';

class FoodTypesGraph extends Component {

  
  state = {
    graphData: [
      { x: "vegetable", y: 0 },
      { x: "meat", y: 0 },
      { x: "fruit", y: 0 },
      { x: "processed", y: 0 },
      { x: "dairy", y: 0 },
    ]
  }

  componentDidMount() {
    //update state from 0 => val so graph animates
    this.setState(() => {
      const { food_items } = this.props.fridge;
      const foodGroups = {};
      const processedData = [];

      foodGroups["vegetable"] = food_items.filter(food => food.food_type === "vegetable");
      foodGroups["meat"] = food_items.filter(food => food.food_type === "meat");
      foodGroups["fruit"] = food_items.filter(food => food.food_type === "fruit");
      foodGroups["processed"] = food_items.filter(food => food.food_type === "processed");
      foodGroups["dairy"] = food_items.filter(food => food.food_type === "dairy");
      
      for (const food of Object.entries(foodGroups)) {
        if (food[1].length > 0) {
          processedData.push({
            x: food[0], y: food[1].length
          })
        }
      }
      return { graphData: processedData }
    })
  }

  render() {
    return (
      <VictoryPie
        animate={{ duration: 1000 }}
        padding={80}
        colorScale={CONSTANTS.randomColors(this.state.graphData.length)}
        style={{ labels: { fontSize: 13 } }}
        innerRadius={75}
        data={this.state.graphData}
      />
    )
  }
}

export default FoodTypesGraph;