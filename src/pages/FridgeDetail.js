import React from 'react';
import useGlobal from '../util/store';
import FoodItem from '../components/FoodItem';
import SecurityHOC from '../HOCs/SecurityHOC';
import FoodDetailsForm from '../components/FoodDetailsForm';
import FoodDetailsGraphs from '../components/FoodDetailsGraphs';
import { Card, Grid } from 'semantic-ui-react';
import CONSTANTS from '../constants';

const FridgeDetail = (props) => {
  const { BASE_API_URL, FOOD_DELETE_URL, SPOONACULAR_URL, SPOONACULAR_HEADER } = CONSTANTS;
  const [state, actions] = useGlobal();

  //food item add form handlers / helpers
  const isCurrentFridgeFoodOrDrinkFull = () => {
    const foodOrDrinkFull = {
      food: { full: false, total: 0 },
      drink: { full: false, total: 0 },
    }
    let totalFood = 0;
    let totalDrink = 0;

    state.currentFridge.food_items.forEach((food) => {
      if (food.is_drink) {
        totalDrink += 1;
      } else if (!food.is_drink) {
        totalFood += 1;
      }
    })
    if (totalFood >= state.currentFridge.food_capacity) {
      foodOrDrinkFull.foodFull = true;
    }
    if (totalDrink >= state.currentFridge.drink_capacity) {
      foodOrDrinkFull.drinkFull = true;
    }
    foodOrDrinkFull.food.total = totalFood;
    foodOrDrinkFull.drink.total = totalDrink;
    return foodOrDrinkFull;
  }

  const handleFoodFormSubmit = () => {
    const fridgeCapacity = isCurrentFridgeFoodOrDrinkFull();
    const newFood_quantity = Number(state.newFood.quantity);

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.jwt}`,
      },
      body: JSON.stringify(state.newFood),
    }
    // TODO: UPDATE state.  so the recipe fetch button toggles properly
    //check to ensure the newly submitted item wont go over our fridges food capacity
    if (state.newFood.is_drink) {
      if ((!fridgeCapacity.drink.full) && (fridgeCapacity.drink.total + newFood_quantity) <= state.currentFridge.drink_capacity) {
        fetch(BASE_API_URL + "/food_items/create", config)
          .then(res => res.json())
          .then(({food_item}) => addFoodToCurrentFridge(food_item))
      } else {
        console.log("ERROR: Current fridge is at capacity")
      }
    } else if (!state.newFood.is_drink) {
      if ((!fridgeCapacity.food.full) && (fridgeCapacity.food.total + newFood_quantity) <= state.currentFridge.food_capacity) {
        fetch(BASE_API_URL + "/food_items/create", config)
          .then(res => res.json())
          .then(({food_item}) => addFoodToCurrentFridge(food_item))
      } else {
        console.log("ERROR: Current fridge is at capacity")
      }
    } else {
      console.log("ERROR: Current fridge is at capacity")
      // TODO: Add error modal?
    }
  }

  const handleFoodFormChange = (e, val) => {
    const { name, value, checked } = val;

    if (name === 'is_drink') {
      actions.setNewFood({ ...state.newFood, [name]: checked })
    } else {
      actions.setNewFood({ ...state.newFood, [name]: value })
    }
  }

  const addFoodToCurrentFridge = (foodItem) => {
    actions.setCurrentFridge({ ...state.currentFridge, food_items: [...state.currentFridge.food_items, foodItem] });
    setCurrentFoodItemsNearExpiry();
    localStorage.setItem('currentFridge', JSON.stringify({ ...state.currentFridge, food_items: [...state.currentFridge.food_items, foodItem] }));
  }

  const removeFoodFromCurrentFridge = (foodItem) => {
    actions.setCurrentFridge({ ...state.currentFridge, food_items: state.currentFridge.food_items.filter(food => food.id !== foodItem.id) });
    localStorage.setItem('currentFridge', JSON.stringify({ ...state.currentFridge, food_items: state.currentFridge.food_items.filter(food => food.id !== foodItem.id) }));
  }

  const handleFoodItemDelete = (e, foodItem) => {
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.jwt}`,
      },
    }
    fetch(BASE_API_URL + FOOD_DELETE_URL(foodItem.id), config)
    .then(removeFoodFromCurrentFridge(foodItem))
  }

  const checkFoodItemsNearExpiry = async ( foodItem ) => {
    const config = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.jwt}`,
      },
    }

    const response = await fetch(BASE_API_URL + `/food_items/${foodItem.id}/check_if_expiring`, config);
    const expiringIn48h = await response.json();
    console.log(expiringIn48h)
    return expiringIn48h;
  }

  const setCurrentFoodItemsNearExpiry = async () => {
    // TODO: return ONLY items within 48h of expiration
    return await Promise.all(state.currentFridge.food_items.filter((foodItem) => {
      if (checkFoodItemsNearExpiry(foodItem)) {
        foodItem.expires_in_48h = true;
        return true;
      }
      return false;
    }));
  }

  const getRecipesForFoodItemsNearExpiry = async () => {
    const expiringFoodItems = await setCurrentFoodItemsNearExpiry();
    if (expiringFoodItems.length === 0) {
      console.log("Error: No food items are currently near expiration.");
      alert("Error: No food items are currently near expiration.");
    } else {
      const foodNameString = expiringFoodItems.map(foodItem => foodItem.name).join(',');
      fetchRecipes(3, foodNameString);
    }
  }

  const displayFoodItems = () => {
    return state.currentFridge.food_items.map((foodItem, id) => {
      return <FoodItem handleFoodItemDelete={handleFoodItemDelete} foodItem={foodItem} key={id} />
    })
  }

  const fetchRecipes = async (numOfRecipes = 3, foodNameString) => {
    const config = {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": SPOONACULAR_HEADER,
        "x-rapidapi-key": process.env.REACT_APP_SPOONACULAR_KEY
      }
    }

    const res = await fetch(SPOONACULAR_URL + `/recipes/findByIngredients?ingredients=${foodNameString}&number=${numOfRecipes}`, config);
    const recipes = await res.json();
    await actions.setRecipes(recipes);
  }

  const displayFridge = () => {
    return (
      <>
        <FoodDetailsForm
          handleFoodFormSubmit={handleFoodFormSubmit}
          handleFoodFormChange={handleFoodFormChange}
          currentFridge={state.currentFridge}
        />
        <FoodDetailsGraphs
          currentFridge={state.currentFridge}
          getRecipesForFoodItemsNearExpiry={getRecipesForFoodItemsNearExpiry}
          recipes={state.recipes}
        />
      </>
    )
  }

  return (
    <Grid centered textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: '100vh' }}>
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