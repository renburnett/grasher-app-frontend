import React from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Fridge from './pages/Fridge';
import FridgesContainer from './pages/FridgesContainer';
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Login />
        <FridgesContainer />
        <Fridge />  
      </Router>
    </div>
  );
}

export default App;
