export default {
  BASE_API_URL:
    process.env.REACT_APP_ENV === "production"
      ? "https://grasher-food-tracker-backend.herokuapp.com"
      : "http://localhost:3000",
  // BASE_API_URL: "https://grasher-food-tracker-backend.herokuapp.com",
  USER_LOGIN_URL: "/user_auth",
  USER_CREATE_URL: "/users/create",
  USER_UPDATE_URL: (userId) => `/users/${userId}/update`,
  FRIDGE_CREATE_URL: "/fridges/create",
  FRIDGE_DELETE_URL: (fridgeId) => `/fridges/${fridgeId}/delete`,
  FOOD_DELETE_URL: (foodItemId) => `/food_items/${foodItemId}/delete`,
  SPOONACULAR_HEADER: "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  SPOONACULAR_URL:
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  FOOD_OPTIONS: [
    { key: "vegetable", text: "vegetable", value: "vegetable" },
    { key: "fruit", text: "fruit", value: "fruit" },
    { key: "dairy", text: "dairy", value: "dairy" },
    { key: "grain", text: "grain", value: "grain" },
    { key: "processed", text: "processed", value: "processed" },
    { key: "meat", text: "meat", value: "meat" },
  ],
  COLOR_ARRAY: [
    "#FFC103",
    "#FF5331",
    "#007AD9",
    "#0BE7D7",
    "#EE3B95",
    "#14CE2A",
    "#CD1DEE",
  ],
  RANDOM_COLORS: (num) => {
    const arr = [
      "#FFC103",
      "#FF5331",
      "#007AD9",
      "#0BE7D7",
      "#EE3B95",
      "#14CE2A",
      "#CD1DEE",
    ];
    const arrCopy = [...arr];
    const return_arr = [];
    if (num > arr.length) num = arr.length;

    let i = 0;

    while (i < num) {
      let randIdx = Math.floor(Math.random() * arr.length);
      if (arrCopy[randIdx] !== null) {
        return_arr.push(arrCopy[randIdx]);
        arrCopy[randIdx] = null;
        i++;
      }
    }
    return return_arr;
  },
};
