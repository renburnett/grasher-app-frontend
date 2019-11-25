import React, { Component } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import fridge_icon from '../images/fridge_icon.svg';

class Fridge extends Component {
  
  componentDidMount() {
    //#TODO: make fetch call to set initial state
    //TODO: call this.DisplayFoodITems() inside render
  }

  displayFridgeMetrics = () => {
    // TODO: display chart of fridge FULL-ness and percentage of food about to go bad 
  }

  render() {
    const { fridge } = this.props;

    return (
      <Card
        as={Link}
        to={`/fridges/${fridge.id}`}
      >
        <Card.Content>
          <Header as='h2' color='teal'>{fridge.name}</Header>
          <Image size="small" src={fridge_icon}/>
          <Card.Description>

          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Fridge;