import React from 'react';
import useGlobal from './util/store';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import NewFridgeForm from './pages/NewFridgeForm';
import Signup from './pages/Signup';
import CONSTANTS from './constants';
import axios from 'axios';
require('dotenv').config();

//TODO: MODAL ON FRIDGE DETAIL PAGE TO TELL WHEN EXXPIRED
//TODO: azure function that fires daily to seed rails db
//TODO: If its open calculate new dates (open boolean) (data source?)
//Twilio API to send alert to phone for expiring food

const App = () => {
  const [state, actions] = useGlobal();

  const setUserAndJwtToLocalStorage = (user = state.currentUser, jwt = state.jwt) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }

  const setUsersFridgesToLocalStorage = (fridges) => {
    localStorage.setItem('currentUsersFridges', JSON.stringify(fridges));
  }

  const updateCurrentUser = (user) => {
    setUserAndJwtToLocalStorage(user);
    actions.setCurrentUser(user);
  }

  const fetchCurrentUsersFridges = async (userId, jwt) => {
    console.log('jwt', jwt)
    const axiosConfig = {
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.get(
      CONSTANTS.BASE_API_URL + `/users/${userId}/fridges`,
      { headers: axiosConfig },
    );
    console.log(response)
    return response;
  }

  const handleLoginChange = (e, { name, value }) => {
    if (name === 'email') {
      actions.setEmail(value);
    } else if (name === 'password') {
      actions.setPassword(value);
    }
  }

  const handleLoginSubmit = async ({ history }, { email, password }) => {
    try {
      const { data } = await axios.post(
        CONSTANTS.BASE_API_URL + CONSTANTS.USER_LOGIN_URL,
        { user: { email, password } },
      );
      console.log(data);
      const { user, jwt } = data;

      setUserAndJwtToLocalStorage(user, jwt);
      await actions.setCurrentUser(user);
      await actions.setJwt(jwt);

      const response = await fetchCurrentUsersFridges(user.id, jwt);
      await actions.setCurrentUsersFridges(response.data.fridges);
      setUsersFridgesToLocalStorage(response.data.fridges)

      await history.push('/');
    } catch (error) {
      console.log('Errrrror:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUsersFridges');
    localStorage.removeItem('currentFridge');

    actions.setCurrentUser(null);
    actions.setJwt(null)
    actions.setCurrentFridge(null);
    actions.setCurrentUsersFridges([]);
  }
  return (
    <div className="App">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Route exact path='/' render={() => <FridgesContainer fetchUsersFridges={state.fetchUsersFridges} fridgesReady={state.currentUsersFridges.length > 0} currentUsersFridges={state.currentUsersFridges} loggedIn={state.currentUser} />} />
        <Route exact path='/fridges' render={props => <FridgesContainer {...props} fridgesReady={state.currentUsersFridges.length > 0} currentUsersFridges={state.currentUsersFridges} loggedIn={state.currentUser} />} />
        <Switch>
          <Route path='/login'>
            {state.currentUser ? <Redirect to='/fridges' /> : props => <Login {...props} handleLoginSubmit={(props) => handleLoginSubmit(props, state)} handleLoginChange={handleLoginChange} email={state.email} password={state.password} currentUser={state.currentUser} />}
          </Route>
          <Route path='/signup' render={props => <Signup {...props} setUserAndJwtToLocalStorage={setUserAndJwtToLocalStorage} />} />
        </Switch>
        <Route exact path='/account' render={props => <Account {...props} setUserAndJwtToLocalStorage={setUserAndJwtToLocalStorage} loggedIn={state.currentUser} />} />
        <Route exact path='/new_fridge' render={props => <NewFridgeForm {...props} />} />
        <Route
          path='/fridges/:fridge_id'
          render={props => {
            return <FridgeDetail {...props} loggedIn={state.currentUser} />
          }} />
      </Router>
    </div>
  )
}

export default App;
