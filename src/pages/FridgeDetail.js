import React, { useState, useLayoutEffect, useEffect } from 'react';
import FoodItem from '../components/FoodItem';
import SecurityHOC from '../HOCs/SecurityHOC';
import FridgeLoadHOC from '../HOCs/FridgeLoadHOC';
import FoodDetailsForm from '../components/FoodDetailsForm';
import FoodDetailsGraphs from '../components/FoodDetailsGraphs';
import { Card, Grid } from 'semantic-ui-react';
import CONSTANTS from '../constants';
let moment = require('moment');

const FridgeDetail = (props) => {
  const [foodItemsExpiringIn48Hrs, setFoodItemsExpiringIn48Hrs] = useState([]);
  const [recipes, setRecipes] = useState({});
  const [newFood, setNewFood] = useState({ name: '', is_drink: false, price: 0.00, food_type: 'fruit', expiration_date: '11/12/2089', fridge_id: -1, quantity: 0 });

  useEffect(() => {
    props.setCurrentFridgeHelper(props)
  })

  //food item add form handlers / helpers
  const isCurrentFridgeFoodOrDrinkFull = () => {
    const foodOrDrinkFull = {
      food: {full: false, total: 0}, 
      drink: {full: false, total: 0},
    }
    let totalFood = 0;
    let totalDrink = 0;

    props.currentFridge.food_items.forEach((food) => {
      if (food.is_drink) {
        totalDrink += 1;
      } else if (!food.is_drink) {
        totalFood += 1;
      }
    })
    if (totalFood >= props.currentFridge.food_capacity) {
      foodOrDrinkFull.foodFull = true;
    }
    if (totalDrink >= props.currentFridge.drink_capacity) {
      foodOrDrinkFull.drinkFull = true;
    }
    foodOrDrinkFull.food.total = totalFood;
    foodOrDrinkFull.drink.total = totalDrink;
    return foodOrDrinkFull;
  }

  const handleFoodFormSubmit = () => {
    const fridgeCapacity = isCurrentFridgeFoodOrDrinkFull();
    const newFood_quantity = Number(newFood.quantity);

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFood),
    }
    //check to ensure the newly submitted item wont go over our fridges food capacity
    if (newFood.is_drink) {
      if ((!fridgeCapacity.drink.full) && (fridgeCapacity.drink.total + newFood_quantity) <= props.currentFridge.drink_capacity) {
        fetch(CONSTANTS.FOOD_ITEMS_URL, config)
        .then(res => res.json())
        .then(foodItem => addFoodToCurrentFridge(foodItem))
      } else {
        console.log("ERROR: Current fridge is at capacity")
      }
    } else if (!newFood.is_drink) {
      if ((!fridgeCapacity.food.full) && (fridgeCapacity.food.total + newFood_quantity) <= props.currentFridge.food_capacity) {
        fetch(CONSTANTS.FOOD_ITEMS_URL, config)
        .then(res => res.json())
        .then(foodItem => addFoodToCurrentFridge(foodItem))
      } else {
        console.log("ERROR: Current fridge is at capacity")
      }
    } else {
      console.log("ERROR: Current fridge is at capacity")
      // TODO: Add error modal?
    }
  }

  const handleFoodFormChange = (e, val) => {
    const {name, value, checked} = val;

    if (name === 'is_drink') {
      setNewFood({ ...newFood, [name]: checked })
    } else {
      setNewFood({ ...newFood, [name]: value })
    }
  }

  const addFoodToCurrentFridge = (foodItem) => {
    props.setCurrentFridge({...props.currentFridge, food_items: [...props.currentFridge.food_items, foodItem]}); //TODO: check syntax
  }

  const removeFoodFromCurrentFridge = (foodItem) => {
    props.setCurrentFridge({...props.currentFridge, food_items: props.currentFridge.food_items.filter(food => food.id !== foodItem.id)})
  }

  const handleFoodItemDelete = (e, foodItem) => {
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch(CONSTANTS.FOOD_ITEMS_URL + '/' + foodItem.id, config)
    .then(removeFoodFromCurrentFridge(foodItem))
  }

  const calculateTimeUntilExpiry = (expiryDate, inDays=true) => {
    const now = moment();
    const expiry = moment(expiryDate);
    if (inDays === true) {
      const timeTilExpiry = moment.duration(expiry.diff(now)).asDays();
      if (timeTilExpiry < 0)
        return 0;
      else 
        return timeTilExpiry;
    } else {
      const timeTilExpiry = moment.duration(expiry.diff(now)).asHours();
      if (timeTilExpiry < 0)
        return 0;
      else 
        return timeTilExpiry;
    }
  }

  const getRecipesForFoodItemsNearExpiry = () => {
    const foodItemsNearExpiry = props.currentFridge.food_items
      .filter(foodItem => calculateTimeUntilExpiry(foodItem.expiration_date, false) <= 48)
      .map(foodItem => foodItem.name)
      .join(',');
    setFoodItemsExpiringIn48Hrs(foodItemsNearExpiry);
    fetchRecipes(); //put in .then() ???  add to useEffect() ???
  }

  const displayFoodItems = () => {
    return props.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem handleFoodItemDelete={handleFoodItemDelete} foodItem={foodItem} key={id} />
    })
  }

  const fetchRecipes = () => {
    const config = {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": CONSTANTS.SPOONACULAR_HEADER,
        "x-rapidapi-key": process.env.REACT_APP_SPOONACULAR_KEY
        }
      }

    fetch(CONSTANTS.SPOONACULAR_URL + `/recipes/findByIngredients?ingredients=${foodItemsExpiringIn48Hrs}&number=3`, config)
    .then(res => res.json())
    .then(recipes => setRecipes(recipes))
    .catch(error => console.log(error))
  }

  const displayFridge = () => {
    return (
      <>
        <FoodDetailsForm
          handleFoodFormSubmit={handleFoodFormSubmit}
          handleFoodFormChange={handleFoodFormChange}
          currentFridge={props.currentFridge}
        />
        <FoodDetailsGraphs 
          currentFridge={props.currentFridge}
          calculateTimeUntilExpiry={calculateTimeUntilExpiry}
          getRecipesForFoodItemsNearExpiry={getRecipesForFoodItemsNearExpiry}
          recipes={recipes}
        />
      </>
    )
  }

  return (
    <Grid centered textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: '100vh'}}>
        <Card.Group centered>
          {displayFridge()}
        </Card.Group>
        <Card.Group centered>
          {displayFoodItems()}
        </Card.Group>
      </Grid.Column>
    </Grid>
  )
}

export default SecurityHOC(FridgeDetail);