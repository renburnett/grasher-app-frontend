import React, { Component } from 'react';
import { VictoryPie } from 'victory';
import CONSTANTS from '../constants';

class ProcessedFoodGraph extends Component {
  
  state = {
    graphData: [
      { x: "processed food", y: 0 },
      { x: "non-processed food", y: 0 },
    ]
  }

  componentDidMount() {
    //update state from 0 => val so graph animates
    this.setState(() => {
      const { food_items } = this.props.fridge;
      const len = food_items.length;
      const numProcessedArr = food_items.filter(food => food.is_processed);
      const numNotProcessedArr = food_items.filter(food => !food.is_processed);

      let numNotProcessed = 0;
      let numProcessed = 0;

      if (numProcessedArr.length < 1) {
        numProcessed = 0.01;
      } else {
        numProcessed = numProcessedArr.length;
      }

      if (numNotProcessedArr.length < 1) {
        numNotProcessed = 0.01;
      } else {
        numNotProcessed = numNotProcessedArr.length;
      }
    
      return {
        graphData: [
        { x: "processed", y: numProcessed },
        { x: "un-processed", y: numNotProcessed },
      ]}
    })
  }

  render() {
    return (
      <VictoryPie
        animate={{ easing: 'exp',  duration: 5000 }}
        padding={80}
        colorScale={CONSTANTS.randomColors(2)}
        style={{ labels: { fontSize: 13 } }}
        innerRadius={75}
        data={this.state.graphData}
      />
    )
  }
}

export default ProcessedFoodGraph;