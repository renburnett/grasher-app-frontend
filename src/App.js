import React, { useState, useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import Signup from './pages/Signup';
import CONSTANTS from './constants';
require('dotenv').config()

//TODO: MODAL ON FRIDGE DETAIL PAGE TO TELL WHEN EXXPIRED
//TODO: azure function that fires daily to seed rails db
//TODO: If its open calculate new dates (open boolean) (data source?)
//Twilio API to send alert to phone for expiring food

const App  = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newFridge, setNewFridge] = useState({ name: '', user_id: -1, food_capacity: 0, drink_capacity: 0, is_full: false, total_items_value: 0 });
  const [currentUser, setCurrentUser] = useState(localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null);

  const fetchUsersFridges = () => {
    fetch(CONSTANTS.FRIDGES_URL)
    .then(res => res.json())
    .then(fridges => {
      let userId = -1;
      if (currentUser) {
        userId = currentUser.id;
      } else if (localStorage.currentUser) {
        userId = JSON.parse(localStorage.currentUser).id
      } else {
        console.log('User not found')
      }
      const currentUsersFoundFridges = fridges.filter(fridge => fridge.user_id === userId)
      localStorage.setItem('currentUsersFridges', JSON.stringify(currentUsersFoundFridges))
      return currentUsersFoundFridges;
    })
  }

  const initializeCurrentUsersFridges = () => {
    if (localStorage.currentUsersFridges) {
      return JSON.parse(localStorage.currentUsersFridges);
    }
    return fetchUsersFridges();
  }
  const [currentUsersFridges, setCurrentUsersFridges] = useState(initializeCurrentUsersFridges());

  const setCurrentFridgeHelper = (props) => {
    const matchedFridge = props.currentUsersFridges.find(fridge => fridge.id === Number(props.match.params.fridge_id));
    localStorage.setItem('currentFridge', JSON.stringify(matchedFridge));
    setCurrentFridge(matchedFridge);
    return matchedFridge;
  }

  const initializeCurrentFridge = (props) => {
    if (localStorage.currentFridge) {
      return JSON.parse(localStorage.currentFridge);
    } else if (props && props.currentUsersFridges.length > 0) {
      return setCurrentFridgeHelper(props);
    }
    return { name: '', drink_capacity: 0, food_capacity: 0, total_items_value: 0, food_items: [] };
  }
  const [currentFridge, setCurrentFridge] = useState(initializeCurrentFridge());

  const setUserToLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  const handleLogout = () => {
    if (localStorage.currentUser) {
      localStorage.removeItem('currentUser');
    }
    if (localStorage.currentUsersFridges) {
      localStorage.removeItem('currentUsersFridges');
    }
    if (localStorage.currentFridge) {
      localStorage.removeItem('currentFridge');
    }
    setCurrentUser(null);
  }

  //login form handlers
  const handleLoginChange = (e, val) => {
    const { name, value } = val;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleLoginSubmit = (props) => {
    fetch(CONSTANTS.USERS_URL)
    .then(res => res.json())
    .then(users => {
      const foundUser = users.find(user => user.email === email);
      setUserToLocalStorage(foundUser);
      setCurrentUser(foundUser);
    })
    .then(() => {
      props.history.push("/")
    });
  }

  //new fridge handlers / helpers
  const handleFridgeFormChange = (e, val) => {
    const { name, value } = val;
    setNewFridge({...newFridge, [name]: value}) //computed property syntax i.e. [dynamic_key]:
  }
  
  const handleFridgeFormSubmit = () => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...newFridge, user_id: currentUser.id}),
    }

    fetch(CONSTANTS.FRIDGES_URL, config)
    .then(res => res.json())
    .then(fridge => addNewFridgeToUserStore(fridge))
  }

  const handleFridgeDelete = (e, val) => {
    const { fridge_id } = val;

    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch(CONSTANTS.FRIDGES_URL + '/' + fridge_id, config)
    .then(removeFridgeFromCurrentUserStore(fridge_id))
  }

  const addNewFridgeToUserStore = (fridge) => {
    setCurrentUsersFridges([...currentUsersFridges, fridge])
  }

  const removeFridgeFromCurrentUserStore = (fridgeId) => {
    setCurrentUsersFridges(currentUsersFridges.filter(fridge => fridge.id !== fridgeId));
  }

  const updateCurrentUser = (user, props) => {
    setUserToLocalStorage(user);
    setCurrentUser(user);
  }

  return (
    <div className="App">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Route exact path='/' render={ () => <FridgesContainer fetchUsersFridges={fetchUsersFridges} handleFridgeDelete={handleFridgeDelete} handleFridgeFormChange={handleFridgeFormChange} handleFridgeFormSubmit={handleFridgeFormSubmit} fridgesReady={currentUsersFridges.length > 0} currentUsersFridges={currentUsersFridges} loggedIn={currentUser} /> }/>
        <Route exact path='/fridges' render={ props => <FridgesContainer {...props} fetchUsersFridges={fetchUsersFridges} handleFridgeDelete={handleFridgeDelete} handleFridgeFormChange={handleFridgeFormChange} handleFridgeFormSubmit={handleFridgeFormSubmit} fridgesReady={currentUsersFridges.length > 0} currentUsersFridges={currentUsersFridges} loggedIn={currentUser} /> }/>
        {/* </Router>/<Route exact path='/login'><Route/> */}
        <Route exact path='login'>
          { currentUser ? <Redirect to='/fridges'/> : props => <Login {...props} handleLoginSubmit={(props) => handleLoginSubmit(props)} handleLoginChange={handleLoginChange} email={email} password={password} currentUser={currentUser}/> }
        </Route>
        <Route exact path='/account' render={ props => <Account {...props} updateCurrentUser={updateCurrentUser} loggedIn={currentUser} currentUser={currentUser}/> }/>
        <Route exact path='/signup' render={ props => <Signup {...props} updateCurrentUser={updateCurrentUser} /> }/>
        <Route 
          path='/fridges/:fridge_id' 
          render={ props => {
            return <FridgeDetail {...props} currentFridge={currentFridge} setCurrentFridge={setCurrentFridge} setCurrentFridgeHelper={setCurrentFridgeHelper} currentUsersFridges={currentUsersFridges} loggedIn={currentUser} />
          } }/>
      </Router>
    </div>
  )
}

export default App;
