import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import Signup from './components/Signup';
import CONSTANTS from './constants';

class App extends Component {

  state = {
    currentUsersFridges: [],
    currentUser: null,
    email: '',
    password: '',

    currentFridge: {
      name: '',
      drink_capacity: 0,
      food_capacity: 0,
      total_items_value: 0,
      food_items: [],
    },
    
    newFood: {
      name: '',
      is_drink: false,
      price: 0.00,
      food_type: 'fruit',
      expiration_date: '11/12/2089',
      fridge_id: -1,
      quantity: 0,
    },
  }
  
  componentDidMount() {
    this.fetchUsersFridges()
    this.getUserFromLocalStorage()
  }

  setCurrentFridge = (id) => {
    let fridge = null;
    
    this.state.currentUsersFridges.forEach(fridgeItem => {
      if (fridgeItem.id === Number(id)) {
        fridge = fridgeItem;
      }
    })

    this.setState((prevState) => {
      localStorage.setItem('currentFridge', JSON.stringify(fridge))
      prevState.newFood.fridge_id = id; //set fridge_id for newFood variable
      prevState.currentFridge = fridge;
      return prevState;
    })
  }

  fetchUsersFridges = () => {
    fetch(CONSTANTS.FRIDGES_URL)
    .then(res => res.json())
    .then(fridges => {
      this.setState(() => {
        let userId = -1;
        if (this.state.currentUser) {
          userId = this.state.currentUser.id;
        } else if (localStorage.currentUser) {
          userId = JSON.parse(localStorage.currentUser).id
        } else {
          console.log('Error: user not found')
        }
        const currentUsersFridges = fridges.filter(fridge => fridge.user_id === userId)
        localStorage.setItem('currentUsersFridges', JSON.stringify(currentUsersFridges))
        return { currentUsersFridges: currentUsersFridges };
      })
    })
  }

  setUserToLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('loggedIn', JSON.stringify(true));
  }

  getUserFromLocalStorage = () => {
    if (localStorage.currentUser) {
      const rehydratedUser = JSON.parse(localStorage.currentUser)
      this.setState({loggedIn: true, currentUser: rehydratedUser})
    }
  }

  getCurrentFridgesFromLocalStorage = () => {
    if (localStorage.currentUsersFridges) {
      const rehydratedFridges = JSON.parse(localStorage.currentUsersFridges)
      this.setState({currentUsersFridges: rehydratedFridges})
    }
  }

  handleLogout = () => {
    if (localStorage.currentUser) {
      localStorage.removeItem('currentUser');
    }
    if (localStorage.fridges) {
      localStorage.removeItem('fridges');
    }
    if (localStorage.currentUsersFridges) {
      localStorage.removeItem('currentUsersFridges');
    }
    if (localStorage.currentFridge) {
      localStorage.removeItem('currentFridge');
    }
    if (localStorage.loggedIn) {
      localStorage.removeItem('loggedIn');
    }
    this.setState({currentUser: null, loggedIn: false})
  }

  //login form handlers
  handleLoginChange = (e, val) => {
    const { name, value } = val;
    this.setState({ [name]: value })
  }

  handleLoginSubmit = () => {
    fetch(CONSTANTS.USERS_URL)
    .then(res => res.json())
    .then(users => {
      const foundUser = users.find((user) => {
        return user.email === this.state.email;
      })
      if (foundUser) {
        this.setState(() => {
          this.setUserToLocalStorage(foundUser)
          return { currentUser: foundUser } 
        })
      } else {
        console.log("Error: User not found, please sign-up")
        //TODO: add error modalll!!!!!!
      }
    })
  }

  //food item add form handlers
  isCurrentFridgeFoodOrDrinkFull = () => {
    const foodOrDrinkFull = {
      food: {full: false, total: 0}, 
      drink: {full: false, total: 0},
    }
    let totalFood = 0;
    let totalDrink = 0;

    this.state.currentFridge.food_items.forEach((food) => {
      if (food.is_drink) {
        totalDrink += 1;
      } else if (!food.is_drink) {
        totalFood += 1;
      }
    })
    if (totalFood >= this.state.currentFridge.food_capacity) {
      foodOrDrinkFull.foodFull = true;
    }
    if (totalDrink >= this.state.currentFridge.drink_capacity) {
      foodOrDrinkFull.drinkFull = true;
    }
    foodOrDrinkFull.food.total = totalFood;
    foodOrDrinkFull.drink.total = totalDrink;
    return foodOrDrinkFull;
  }

  handleFoodFormSubmit = () => {
    const fridgeCapacity = this.isCurrentFridgeFoodOrDrinkFull();
    const { currentFridge, newFood } = this.state;
    const newFood_quantity = Number(this.state.newFood.quantity);

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
      if ((!fridgeCapacity.drink.full) && (fridgeCapacity.drink.total + newFood_quantity) <= currentFridge.drink_capacity) {
        fetch(CONSTANTS.FOOD_ITEMS_URL, config)
        .then(res => res.json())
        .then(foodItem => this.addFoodToCurrentFridge(foodItem))
      } else {
        console.log("ERROR: Current fridge is at capacity")
      }
    } else if (!newFood.is_drink) {
      if ((!fridgeCapacity.food.full) && (fridgeCapacity.food.total + newFood_quantity) <= currentFridge.food_capacity) {
        fetch(CONSTANTS.FOOD_ITEMS_URL, config)
        .then(res => res.json())
        .then(foodItem => this.addFoodToCurrentFridge(foodItem))
      } else {
        console.log("ERROR: Current fridge is at capacity")
      }
    } else {
      console.log("ERROR: Current fridge is at capacity")
      // TODO: Add error modal?
    }
  }

  handleFoodFormChange = (e, val) => {
    const {name, value, checked} = val;

    if (name === 'is_drink') {
      this.setState((prevState) => {
        prevState.newFood[name] = checked;
        return prevState;
      })
    } else {
      this.setState((prevState) => {
        prevState.newFood[name] = value
        return prevState;
      })
    }
  }

  addFoodToCurrentFridge = (foodItem) => {
    this.setState((prevState) => {
      prevState.currentFridge.food_items.push(foodItem)
      return prevState;
    })
  }

  removeFoodFromCurrentFridge = (foodItem) => {
    this.setState((prevState) => {
      const updatedFridge = prevState.currentFridge.food_items.filter(food => food.id !== foodItem.id)
      prevState.currentFridge.food_items = updatedFridge;
      return prevState;
    })
  }

  handleFoodItemDelete = (e, foodItem) => {
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch(CONSTANTS.FOOD_ITEMS_URL + '/' + foodItem.id, config)
    .then(this.removeFoodFromCurrentFridge(foodItem))
  }

  render() {
    const { currentUsersFridges, loggedIn } = this.state;
    
    return (
      <div className="App">
        <Router>
          <Navbar handleLogout={this.handleLogout} />
          <Route exact path='/' render={ () => <FridgesContainer fridgesReady={this.state.currentUsersFridges.length > 0} currentUsersFridges={currentUsersFridges} loggedIn={loggedIn} /> }/>
          <Route exact path='/fridges' render={ () => <FridgesContainer fridgesReady={this.state.currentUsersFridges.length > 0} currentUsersFridges={currentUsersFridges} loggedIn={loggedIn} /> }/>
          <Route path='/login' render={ props => <Login {...props} handleLoginSubmit={this.handleLoginSubmit} handleLoginChange={this.handleLoginChange} email={this.state.email} password={this.state.password} loggedIn={loggedIn}/> }/>
          <Route path='/account' component={ () => <Account loggedIn={loggedIn} /> }/>
          <Route path='/signup' component={ () => <Signup /> }/>
          <Route 
            path='/fridges/:fridge_id' 
            render={ props => {
              return <FridgeDetail {...props} fridgesReady={this.state.currentUsersFridges.length > 0} handleFoodItemDelete={this.handleFoodItemDelete} handleFoodFormSubmit={this.handleFoodFormSubmit} handleFoodFormChange={this.handleFoodFormChange} fetchUsersFridges={this.fetchUsersFridges} currentFridge={this.state.currentFridge} setCurrentFridge={this.setCurrentFridge} loggedIn={loggedIn} />
            } }/>
        </Router>
      </div>
    )
  }
}

export default App;
