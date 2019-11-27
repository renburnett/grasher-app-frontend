import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import Signup from './components/Signup';
import CONSTANTS from './constants';

class App extends Component {

  state = {
    fridges: [],
    loggedIn: false,
    currentUser: null,
    email: '',
    password: '',
  }

  componentDidMount() {
    fetch(CONSTANTS.FRIDGES_URL)
    .then(res => res.json())
    .then(fridges => {
      this.setState({fridges: fridges})
      //TODO: ONLY GET INDIVIDUAL USERS FRIDGES
    })
    this.getUserFromLocalStorage()
  }

  handleChange = (e, val) => {
    const { name, value } = val;
    this.setState({ [name]: value })
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

  handleLogout = () => {
    if (localStorage.currentUser) {
      localStorage.removeItem('currentUser');
    }
    if (localStorage.loggedIn) {
      localStorage.removeItem('loggedIn');
    }
    this.setState({loggedIn: false, currentUser: null})
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
          return {
            loggedIn: true,
            currentUser: foundUser,
          }
        })
      } else {
        console.log("Error: User not found")
        //TODO: add error modalll
      }
    })
  }

  render() {
    const { fridges, loggedIn } = this.state;
    
    return (
      <div className="App">
        <Router>
          <Navbar handleLogout={this.handleLogout} />
          <Route exact path='/' render={ () => <FridgesContainer fridges={fridges} loggedIn={loggedIn} /> }/>
          <Route exact path='/fridges' render={ () => <FridgesContainer fridges={fridges} loggedIn={loggedIn} /> }/>
          <Route path='/login' render={ props => <Login {...props} handleLoginSubmit={this.handleLoginSubmit} handleChange={this.handleChange} email={this.state.email} password={this.state.password} loggedIn={loggedIn}/> }/>
          <Route path='/account' component={ () => <Account loggedIn={loggedIn} /> }/>
          <Route path='/signup' component={ () => <Signup /> }/>
          <Route path='/fridges/:id' render={ props => <FridgeDetail {...props} fridges={fridges} loggedIn={loggedIn} /> }/>
        </Router>
      </div>
    )
  }
}

export default App;
