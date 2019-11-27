import { Header, Card, Image, Divider, Progress } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import FoodTypesGraph from './FoodTypesGraph';
import fridge_icon1 from '../images/fridge_01.svg';
import fridge_icon2 from '../images/fridge_02.svg';
import fridge_icon3 from '../images/fridge_03.svg';

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

  render(){
    return (
      <Card
        as={Link}
        to={`/fridges/${this.props.fridge.id}`}
        style={{minWidth: '40vh'}}
      >
        <Card.Content>
          <Header as='h2' color='blue'>
            { this.shuffleIcon() }
            { this.props.fridge.name }
          </Header>
          <Divider horizontal>fridge contents</Divider>
          <Card.Description>
            <FoodTypesGraph fridge={this.props.fridge}/>
            <Divider horizontal>food within 48hrs of expiring</Divider>
            <br/>
            <Progress percent={44} progress />
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Fridge;