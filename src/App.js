import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import SignUp from './pages/SignUp';
import CONSTANTS from './constants';

//TODO: MODAL ON FRIDGE DETAIL PAGE TO TELL WHEN EXXPIRED
//TODO: If its open calculate new dates (open boolean) (data source?)
//Twilio API to send alert to phone for expiring food
//TODO: Matt ask about food recipe API
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
    
    newFridge: {name: '', user_id: -1, food_capacity: 0, drink_capacity: 0, is_full: false, total_items_value: 0},
    newFood: { name: '', is_drink: false, price: 0.00, food_type: 'fruit', expiration_date: '11/12/2089', fridge_id: -1, quantity: 0},
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
          console.log('User not found')
        }
        const currentUsersFridges = fridges.filter(fridge => fridge.user_id === userId)
        localStorage.setItem('currentUsersFridges', JSON.stringify(currentUsersFridges))
        return { currentUsersFridges: currentUsersFridges };
      })
    })
  }

  setUserToLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage = () => {
    if (localStorage.currentUser) {
      const rehydratedUser = JSON.parse(localStorage.currentUser)
      this.setState({currentUser: rehydratedUser})
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
    this.setState({currentUser: null})
  }

  //login form handlers
  handleLoginChange = (e, val) => {
    const { name, value } = val;
    this.setState({ [name]: value })
  }

  handleLoginSubmit = (props) => {
    fetch(CONSTANTS.USERS_URL)
    .then(res => res.json())
    .then(users => {
      const foundUser = users.find((user) => {
        return user.email === this.state.email;
      })
      this.setState((prevState) => {
        this.setUserToLocalStorage(foundUser)
        prevState.currentUser = foundUser;
        return prevState;
      }, () => { props.history.push('/') })
    })
  }

  //new fridge handlers / helpers
  handleFridgeFormChange = (e, val) => {    
    const { name, value } = val;
    
    this.setState((prevState) => {
      prevState.newFridge[name] = value;
      return prevState;
    })
  }
  
  handleFridgeFormSubmit = () => {
    const fridgeCopy = {...this.state.newFridge};
    fridgeCopy.user_id = this.state.currentUser.id;

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fridgeCopy),
    }

    fetch(CONSTANTS.FRIDGES_URL, config)
    .then(res => res.json())
    .then(fridge => this.addNewFridgeToUserStore(fridge))
  }

  handleFridgeDelete = (e, val) => {
    const { fridge_id } = val;

    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch(CONSTANTS.FRIDGES_URL + '/' + fridge_id, config)
    .then(this.removeFridgeFromCurrentUserStore(fridge_id))
  }

  addNewFridgeToUserStore = (fridge) => {
    this.setState((prevState) => {
      prevState.currentUsersFridges.push(fridge)
      return prevState;
    })
  }

  removeFridgeFromCurrentUserStore = (fridgeId) => {
    this.setState((prevState) => {
      const updatedFridgesStore = prevState.currentUsersFridges.filter(frg => frg.id !== fridgeId)
      prevState.currentUsersFridges = updatedFridgesStore;
      return prevState;
    })
  }

    //food item add form handlers / helpers
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

  updateCurrentUser = (user) => {
    this.setState((prevState) => {
      prevState.currentUser = user;
      return prevState;
    })
  }

  render() {
    const { currentUsersFridges, currentUser } = this.state;
    
    return (
      <div className="App">
        <Router>
          <Navbar handleLogout={this.handleLogout} />
          <Route exact path='/' render={ () => <FridgesContainer fetchUsersFridges={this.fetchUsersFridges} handleFridgeDelete={this.handleFridgeDelete} handleFridgeFormChange={this.handleFridgeFormChange} handleFridgeFormSubmit={this.handleFridgeFormSubmit} fridgesReady={this.state.currentUsersFridges.length > 0} currentUsersFridges={currentUsersFridges} loggedIn={currentUser} /> }/>
          <Route exact path='/fridges' render={ props => <FridgesContainer {...props} fetchUsersFridges={this.fetchUsersFridges} handleFridgeDelete={this.handleFridgeDelete} handleFridgeFormChange={this.handleFridgeFormChange} handleFridgeFormSubmit={this.handleFridgeFormSubmit} fridgesReady={this.state.currentUsersFridges.length > 0} currentUsersFridges={currentUsersFridges} loggedIn={currentUser} /> }/>
          <Route path='/login' render={ props => <Login {...props} handleLoginSubmit={this.handleLoginSubmit} handleLoginChange={this.handleLoginChange} email={this.state.email} password={this.state.password} currentUser={this.state.currentUser}/> }/>
          <Route path='/account' component={ () => <Account updateCurrentUser={this.updateCurrentUser} loggedIn={currentUser} currentUser={currentUser}/> }/>
          <Route path='/signup' component={ () => <SignUp /> }/>
          <Route 
            path='/fridges/:fridge_id' 
            render={ props => {
              return <FridgeDetail {...props} fridgesReady={this.state.currentUsersFridges.length > 0} handleFoodItemDelete={this.handleFoodItemDelete} handleFoodFormSubmit={this.handleFoodFormSubmit} handleFoodFormChange={this.handleFoodFormChange} fetchUsersFridges={this.fetchUsersFridges} currentFridge={this.state.currentFridge} setCurrentFridge={this.setCurrentFridge} loggedIn={currentUser} />
            } }/>
        </Router>
      </div>
    )
  }
}

export default App;
