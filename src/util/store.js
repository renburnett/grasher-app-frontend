import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  email: '',
  password: '',
  currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null,
  currentFridge: localStorage.currentFridge ? JSON.parse(localStorage.currentFridge) : null,
  currentUsersFridges: localStorage.currentUsersFridges ? JSON.parse(localStorage.currentUsersFridges) : [], //fetch and filter initial fridges?
  newFridge: null,
  foodItemsExpiringIn48Hrs: [],
  recipes: [],
  newFood: { name: '', is_drink: false, price: 0.00, food_type: 'fruit', expiration_date: '11/12/2089', fridge_id: -1, quantity: 0 },
}

const actions = {
  setEmail: (store, newEmail) => {
    store.setState({email: newEmail});
  },
  setPassword: (store, newPassword) => {
    store.setState({password: newPassword});
  },
  setCurrentUser: (store, newCurrentUser) => {
    store.setState({currentUser: newCurrentUser});
  },
  setCurrentFridge: (store, newCurrentFridge) => {
    store.setState({currentFridge: newCurrentFridge});
  },
  setNewFridge: (store, newFridge) => {
    store.setState({email: newFridge});
  },
  setCurrentUsersFridges: (store, newCurrentUsersFridges) => {
    store.setState({currentUsersFridges: newCurrentUsersFridges});
  },
  setFoodItemsExpiringIn48Hrs: (store, newFoodItemsExpiringIn48Hrs) => {
    store.setState({foodItemsExpiringIn48Hrs: newFoodItemsExpiringIn48Hrs});
  },
  setRecipes: (store, newRecipes) => {
  store.setState({recipes: newRecipes});
  },
  setNewFood: (store, newNewFood) => {
    store.setState({newFood: newNewFood});
  },
}

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal; 

