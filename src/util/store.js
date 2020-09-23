import React from 'react';
import useGlobalHook from 'use-global-hook';
import initialState from './initalState';

const actions = {
  setJwt: (store, newJwt) => {
    store.setState({ jwt: newJwt });
  },
  setEmail: (store, newEmail) => {
    store.setState({ email: newEmail });
  },
  setPassword: (store, newPassword) => {
    store.setState({ password: newPassword });
  },
  setCurrentUser: (store, newCurrentUser) => {
    store.setState({ currentUser: newCurrentUser });
  },
  setCurrentFridge: (store, newCurrentFridge) => {
    store.setState({ currentFridge: newCurrentFridge });
  },
  setNewFridge: (store, newNewFridge) => {
    store.setState({ newFridge: newNewFridge });
  },
  setCurrentUsersFridges: (store, newCurrentUsersFridges) => {
    store.setState({ currentUsersFridges: newCurrentUsersFridges });
  },
  setRecipes: (store, newRecipes) => {
    store.setState({ recipes: newRecipes });
  },
  setNewFood: (store, newNewFood) => {
    store.setState({ newFood: newNewFood });
  },
}

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;

