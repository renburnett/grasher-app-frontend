export default {
  jwt: localStorage.jwt ? JSON.parse(localStorage.jwt) : null,
  email: "",
  password: "",
  currentUser: localStorage.currentUser
    ? JSON.parse(localStorage.currentUser)
    : null,
  currentFridge: localStorage.currentFridge
    ? JSON.parse(localStorage.currentFridge)
    : null,
  currentUsersFridges: localStorage.currentUsersFridges
    ? JSON.parse(localStorage.currentUsersFridges)
    : [],
  newFridge: {
    name: "",
    food_capacity: 0,
    drink_capacity: 0,
    is_full: false,
    total_items_value: 0,
    user_id: -1,
    food_items: [],
  },
  checkedFood: [],
  recipes: [],
  newFood: {
    name: "",
    is_drink: false,
    price: 0.0,
    food_type: "fruit",
    expiration_date: "11/12/2089",
    fridge_id: -1,
    quantity: 0,
  },
};

// id: 8, name: "Food Bank Fridge", food_capacity: 12, drink_capacity: 15, is_full: false, total_items_value: 188.41, user_id: 3, created_at: "2020-09-18T20:35:33.797Z", updated_at: "2020-09-18T20:35:33.797Z", food_items: (6) […] }
