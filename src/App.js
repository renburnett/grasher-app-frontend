import React from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Fridge from './pages/Fridge';
import Account from './pages/Account';
import FridgesContainer from './pages/FridgesContainer';
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path='/login' render={() => <Login /> }/>
        <Route path='/account' component={() => <Account />}/>
        <Route exact path='/' render={ () => <FridgesContainer /> }/>
        <Route path='/fridges' render={ () => <FridgesContainer /> }/>
        <Route path='/fridges/:id' render={ () => <Fridge /> }/>
      </Router>
    </div>
  );
}

export default App;
