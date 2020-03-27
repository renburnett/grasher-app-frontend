import React, { useEffect } from 'react';
import useGlobal from './util/store';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import Signup from './pages/Signup';
import CONSTANTS from './constants';
require('dotenv').config();

//TODO: MODAL ON FRIDGE DETAIL PAGE TO TELL WHEN EXXPIRED
//TODO: azure function that fires daily to seed rails db
//TODO: If its open calculate new dates (open boolean) (data source?)
//Twilio API to send alert to phone for expiring food

const App  = () => {
  const [state, actions] = useGlobal();

  const setUserToLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  const setCurrentUsersFridgesToLocalStorage = (usersFridges) => {
    localStorage.setItem('currentUsersFridges', JSON.stringify(usersFridges))
  }

  const updateCurrentUser = (user) => {
    setUserToLocalStorage(user);
    actions.setCurrentUser(user);
  }

  const updateCurrentUsersFridges = async () => {
    let userId = -1;
    if (state.currentUser) {
      userId = state.currentUser.id;
    } else if (localStorage.currentUser) {
      userId = JSON.parse(localStorage.currentUser).id;
    }
    const res = await fetch(CONSTANTS.FRIDGES_URL);
    const fridges = await res.json();
    const usersFridges = fridges.filter(fridge => fridge.user_id === userId);
    
    setCurrentUsersFridgesToLocalStorage(usersFridges);
    actions.setCurrentUsersFridges(usersFridges);
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
    actions.setCurrentUser(null);
  }

  //login form handlers
  const handleLoginChange = (e, val) => {
    const { name, value } = val;
    if (name === 'email') {
      actions.setEmail(value);
    } else if (name === 'password') {
      actions.setPassword(value);
    }
  }

  const handleLoginSubmit = (props) => {
    fetch(CONSTANTS.USERS_URL)
    .then(res => res.json())
    .then(users => {
      const foundUser = users.find(user => user.email === state.email);
      setUserToLocalStorage(foundUser);
      actions.setCurrentUser(foundUser);
      updateCurrentUsersFridges(); //TODO: does this work?
    })
    .then(() => {
      props.history.push("/")
    });
  }

  //new fridge handlers / helpers
  const handleFridgeFormChange = (e, val) => {
    const { name, value } = val;
    actions.setNewFridge({...state.newFridge, [name]: value}) //computed property syntax i.e. [dynamic_key]:
  }
  
  const addNewFridgeToUserStore = (fridge) => {
    actions.setCurrentUsersFridges([...state.currentUsersFridges, fridge])
  }

  const handleFridgeFormSubmit = () => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...state.newFridge, user_id: state.currentUser.id}),
    }

    fetch(CONSTANTS.FRIDGES_URL, config)
    .then(res => res.json())
    .then(fridge => addNewFridgeToUserStore(fridge))
  }

  const removeFridgeFromCurrentUserStore = (fridgeId) => {
    actions.setCurrentUsersFridges(state.currentUsersFridges.filter(fridge => fridge.id !== fridgeId));
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

  return (
    <div className="App">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Route exact path='/' render={ () => <FridgesContainer fetchUsersFridges={state.fetchUsersFridges} handleFridgeDelete={handleFridgeDelete} handleFridgeFormChange={handleFridgeFormChange} handleFridgeFormSubmit={handleFridgeFormSubmit} fridgesReady={state.currentUsersFridges.length > 0} currentUsersFridges={state.currentUsersFridges} loggedIn={state.currentUser} /> }/>
        <Route exact path='/fridges' render={ props => <FridgesContainer {...props} fetchUsersFridges={state.fetchUsersFridges} handleFridgeDelete={handleFridgeDelete} handleFridgeFormChange={handleFridgeFormChange} handleFridgeFormSubmit={handleFridgeFormSubmit} fridgesReady={state.currentUsersFridges.length > 0} currentUsersFridges={state.currentUsersFridges} loggedIn={state.currentUser} /> }/>
        {/* </Router>/<Route exact path='/login'><Route/> */}
        <Route exact path='login'>
          { state.currentUser ? <Redirect to='/fridges'/> : props => <Login {...props} handleLoginSubmit={(props) => handleLoginSubmit(props)} handleLoginChange={handleLoginChange} email={state.email} password={state.password} currentUser={state.currentUser}/> }
        </Route>
        <Route exact path='/account' render={ props => <Account {...props} updateCurrentUser={updateCurrentUser} loggedIn={state.currentUser} currentUser={state.currentUser}/> }/>
        <Route exact path='/signup' render={ props => <Signup {...props} updateCurrentUser={updateCurrentUser} /> }/>
        <Route 
          path='/fridges/:fridge_id' 
          render={ props => {
            return <FridgeDetail {...props} loggedIn={state.currentUser} />
          } }/>
      </Router>
    </div>
  )
}

export default App;
