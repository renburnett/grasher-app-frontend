import React, { Component } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import fridge_icon1 from '../images/fridge_01.svg';
import fridge_icon2 from '../images/fridge_02.svg';
import fridge_icon3 from '../images/fridge_03.svg';

class Fridge extends Component {
  
  componentDidMount() {
    //#TODO: make fetch call to set initial state
    //TODO: call this.DisplayFoodITems() inside render
  }

  displayFridgeMetrics = () => {
    // TODO: display chart of fridge FULL-ness and percentage of food about to go bad 
  }

  shuffleIcon = () => {
    if (this.props.idx % 3 === 0) {
      return <Image size="medium" src={fridge_icon1}/>
    } else if (this.props.idx % 3 === 1) {
      return <Image size="medium" src={fridge_icon2}/>
    } else if (this.props.idx % 3 === 2) {
      return <Image size="medium" src={fridge_icon3}/>
    }
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
          
          { this.shuffleIcon()}

          <Card.Description>

          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Fridge;