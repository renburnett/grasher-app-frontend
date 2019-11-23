import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import FridgeDetail from './pages/FridgeDetail';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import URLS from './constants';

class App extends Component {

  state = {
    fridges: [],
    currentFridge: {
      name: '',
      drink_capacity: 0,
      food_capacity: 0,
      total_items_value: 0,
      food_items: [],
      },
  }

  componentDidMount() {
    fetch(URLS.FRIDGES)
    .then(res => res.json())
    .then(fridges => {
      this.setState({fridges: fridges})
      //TODO: ONLY GET INDIVIDUAL USERS FRIDGES
    })
  }

  setCurrentFridge = (props) => {
    this.setState({currentFridge: this.state.fridges.find(fridge => fridge.id === props.match.params.id)})
  }

  render() {
    const { fridges } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route path='/login' render={ () => <Login /> }/>
          <Route path='/account' component={ () => <Account /> }/>
          <Route exact path='/' render={ () => <FridgesContainer fridges={fridges} /> }/>
          <Route exact path='/fridges' render={ () => <FridgesContainer fridges={fridges} /> }/>
          <Route path='/fridges/:id' render={ props => {
            return (
              <FridgeDetail 
                {...props}
                fridges={this.state.fridges}
                currentFridge={this.state.currentFridge}
                setCurrentFridge={this.setCurrentFridge}
              />
            )
          } }/>
        </Router>
      </div>
    )  
  }
}

export default App;
