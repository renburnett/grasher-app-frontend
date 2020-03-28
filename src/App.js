import React from 'react';
import useGlobal from './util/store';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import NewFridgeForm from './pages/NewFridgeForm';
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

    actions.setCurrentUsersFridges(usersFridges);
  }

  const handleLogout = () => {
    if (localStorage.currentUser) {
      localStorage.removeItem('currentUser');
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

  const handleLoginSubmit = async (props) => {
    const res = await fetch(CONSTANTS.USERS_URL);
    const users = await res.json();
    const foundUser = users.find(user => user.email === state.email);
    setUserToLocalStorage(foundUser);
    actions.setCurrentUser(foundUser);
    updateCurrentUsersFridges();
    await props.history.push("/");
  }

  return (
    <div className="App">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Route exact path='/' render={ () => <FridgesContainer fetchUsersFridges={state.fetchUsersFridges} fridgesReady={state.currentUsersFridges.length > 0} currentUsersFridges={state.currentUsersFridges} loggedIn={state.currentUser} /> }/>
        <Route exact path='/fridges' render={ props => <FridgesContainer {...props} fridgesReady={state.currentUsersFridges.length > 0} currentUsersFridges={state.currentUsersFridges} loggedIn={state.currentUser} /> }/>
        <Route exact path='login'>
          { state.currentUser ? <Redirect to='/fridges'/> : props => <Login {...props} handleLoginSubmit={(props) => handleLoginSubmit(props)} handleLoginChange={handleLoginChange} email={state.email} password={state.password} currentUser={state.currentUser}/> }
        </Route>
        <Route exact path='/account' render={ props => <Account {...props} updateCurrentUser={updateCurrentUser} loggedIn={state.currentUser} currentUser={state.currentUser}/> }/>
        <Route exact path='/signup' render={ props => <Signup {...props} updateCurrentUser={updateCurrentUser} /> }/>
        <Route exact path='/new_fridge' render={ props => <NewFridgeForm {...props} /> }/>
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
