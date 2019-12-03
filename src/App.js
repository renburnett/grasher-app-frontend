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
      //quantity: 0, // TODO: Add ability to change quantity upon form submit
    },
  }
  
  componentDidMount() {
    this.fetchUsersFridges()
    this.getUserFromLocalStorage()
  }

  setCurrentFridge = (id) => {
    let fridge = null;
    
    this.state.currentUsersFridges.forEach(fridgeItem => {
      console.log(fridgeItem)
      if (fridgeItem.id == id) {
        fridge = fridgeItem;
      }
    })


    console.log('set current fridge', fridge)

    this.setState((prevState) => {
      localStorage.setItem('currentFridge', JSON.stringify(fridge))
      // prevState.currentFridge = fridge;
      // prevState.newFood.fridge_id = id;
      // return prevState;
      return {currentFridge: fridge}
    })
  }

  setNewFoodItemFridgeId = () => {
    if (localStorage.currentFridge) {
      this.setState((prevState) => {
        const currentFridgeId = JSON.parse(localStorage.currentFridge).id;
        return prevState.newFood.fridge_id = currentFridgeId;
      })
    }
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
          console.log('error, user not found')
        }
        const currentUsersFridges = fridges.filter(fridge => fridge.user_id === userId)
        localStorage.setItem('currentUsersFridges', JSON.stringify(currentUsersFridges))
        console.log('currentUsersFridges', currentUsersFridges)
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
      //return rehydratedFridges;
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
  handleFoodFormSubmit = () => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newFood),
    }

    fetch(CONSTANTS.FOOD_ITEMS_URL, config)
    .then(res => res.json())
    .then(foodItem => this.addFoodToCurrentFridge(foodItem))
    //.then(this.fetchUsersFridges())
  }

  handleFoodFormChange = (e, val) => {
    const {name, value} = val;
    this.setState((prevState) => {
      prevState.newFood[name] = value
      return prevState;
    })
  }

  addFoodToCurrentFridge = (foodItem) => {
    //TODO: make sure fridge is not full first
    this.setState((prevState) => {
      prevState.currentFridge.food_items.push(foodItem)
      return prevState;
    })
  }

  removeFoodFromCurrentFridge = (foodItem) => {
    //TODO: make sure fridge is not full first
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
    .then(res => res.json())
    .then(deletedItem => this.removeFoodFromCurrentFridge(deletedItem))
  }


  render() {
    const { currentUsersFridges, loggedIn } = this.state;
    
    return (
      <div className="App">
        <Router>
          <Navbar handleLogout={this.handleLogout} />
          <Route exact path='/' render={ () => <FridgesContainer currentUsersFridges={currentUsersFridges} loggedIn={loggedIn} /> }/>
          <Route exact path='/fridges' render={ () => <FridgesContainer currentUsersFridges={currentUsersFridges} loggedIn={loggedIn} /> }/>
          <Route path='/login' render={ props => <Login {...props} handleLoginSubmit={this.handleLoginSubmit} handleLoginChange={this.handleLoginChange} email={this.state.email} password={this.state.password} loggedIn={loggedIn}/> }/>
          <Route path='/account' component={ () => <Account loggedIn={loggedIn} /> }/>
          <Route path='/signup' component={ () => <Signup /> }/>
          <Route 
            path='/fridges/:fridge_id' 
            render={ props => {
              return <FridgeDetail {...props} fridgesReady={this.state.currentUsersFridges.length>0} handleFoodItemDelete={this.handleFoodItemDelete} handleFoodFormSubmit={this.handleFoodFormSubmit} handleFoodFormChange={this.handleFoodFormChange} fetchUsersFridges={this.fetchUsersFridges} currentFridge={this.state.currentFridge} setCurrentFridge={this.setCurrentFridge} loggedIn={loggedIn} />
            } }/>
        </Router>
      </div>
    )
  }
}

export default App;
