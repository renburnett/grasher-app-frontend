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
    fridges: [],
  }

  componentDidMount() {
    fetch(CONSTANTS.FRIDGES_URL)
    .then(res => res.json())
    .then(fridges => {
      this.setState({fridges: fridges})
      //TODO: ONLY GET INDIVIDUAL USERS FRIDGES
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route path='/login' render={ () => <Login /> }/>
          <Route path='/account' component={ () => <Account /> }/>
          <Route path='/signup' component={ () => <Signup /> }/>
          <Route exact path='/' render={ () => <FridgesContainer fridges={this.state.fridges} /> }/>
          <Route exact path='/fridges' render={ () => <FridgesContainer fridges={this.state.fridges} /> }/>
          <Route path='/fridges/:id' render={ props => <FridgeDetail {...props} fridges={this.state.fridges} /> }/>
        </Router>
      </div>
    )  
  }
}

export default App;
