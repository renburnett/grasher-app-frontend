import { Header, Card, Image, Divider, Progress, Button, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import useGlobal from '../util/store';
import FoodTypesGraph from './FoodTypesGraph';
import fridge_icon1 from '../images/fridge_01.svg';
import fridge_icon2 from '../images/fridge_02.svg';
import fridge_icon3 from '../images/fridge_03.svg';
let moment = require('moment');

const Fridge = (props) => {
  const [state, actions] = useGlobal();
  const history = useHistory();

  const shuffleIcon = () => {
    if (props.idx % 3 === 0) {
      return <Image size="big" src={fridge_icon1}/>
    } else if (props.idx % 3 === 1) {
      return <Image size="big" src={fridge_icon2}/>
    } else if (props.idx % 3 === 2) {
      return <Image size="big" src={fridge_icon3}/>
    }
  }

  const foodExpiringIn48Hrs = (expiryDate) => {
    const now = moment();
    const expiry = moment(expiryDate);
    const timeTilExpiry = moment.duration(expiry.diff(now)).asHours();
    
    if (timeTilExpiry <= 48) {
      return true;
    } else {
      return false;
    }
  }

  const calculateAmountOfFoodExpiringIn48Hrs = () => {
    let expiringFood = 0;
    props.fridge.food_items.forEach((food) => {
      if (foodExpiringIn48Hrs(food.expiration_date)) {
        expiringFood += 1;
      }
    })
    const percentage = Math.round((expiringFood / props.fridge.food_items.length) * 100);
    return percentage;
  }

  const updateCurrentFridge = () => {
    const matchedFridge = state.currentUsersFridges.find(fridge => fridge.id === props.fridge.id);
    actions.setCurrentFridge(matchedFridge);
  }

  const handleFridgeClick = async () => {
    history.push(`/fridges/${props.fridge.id}`);
    updateCurrentFridge();
    actions.setNewFood({...state.newFood, fridge_id: props.fridge.id})
  }

  return (
    <Card style={{minWidth: '40vh'}} >
      <Card.Content>
        <Grid textAlign='center' columns={3} verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column>
              <Image size='mini'>{ shuffleIcon() }</Image>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' color='blue'>{ props.fridge.name }</Header>
            </Grid.Column>
            <Grid.Column>
              <Button fridge_id={props.fridge.id} icon='x' size='medium' onClick={props.handleFridgeDelete} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content
        onClick={handleFridgeClick}
      >
        <Divider horizontal>fridge contents</Divider>
        <a>
          <Card.Description>
            <FoodTypesGraph fridge={props.fridge}/>
            <Divider horizontal>food within 48hrs of expiring</Divider>
            <br/>
            <Progress progress percent={calculateAmountOfFoodExpiringIn48Hrs()} color='violet' />
          </Card.Description>
        </a>
      </Card.Content>
    </Card>
  )
}

export default Fridge;