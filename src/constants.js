
const CONSTANTS = {
  USERS_URL: "https://grasher-food-tracker-backend.herokuapp.com/users",
  FRIDGES_URL: "https://grasher-food-tracker-backend.herokuapp.com/fridges",
  FOOD_ITEMS_URL: "https://grasher-food-tracker-backend.herokuapp.com/food_items",
  FOOD_OPTIONS: [
    { key: 'vegetable', text: 'vegetable', value: 'vegetable' },
    { key: 'fruit', text: 'fruit', value: 'fruit' },
    { key: 'dairy', text: 'dairy', value: 'dairy' },
    { key: 'processed', text: 'processed', value: 'processed' },
    { key: 'meat', text: 'meat', value: 'meat' },
  ],
  COLOR_ARRAY: ["#FFC103", "#FF5331", "#007AD9", "#0BE7D7", "#EE3B95", "#14CE2A", "#CD1DEE"],
  RANDOM_COLORS:  (num) => {
    const arr = ["#FFC103", "#FF5331", "#007AD9", "#0BE7D7", "#EE3B95", "#14CE2A", "#CD1DEE"]
    const arrCopy = [...arr]
    const return_arr = []
  
    if (num > arr.length)
      num = arr.length
      
    let i = 0;

    while (i < num) {
      let randIdx = Math.floor(Math.random() * arr.length)
      if (arrCopy[randIdx] !== null) {
        return_arr.push(arrCopy[randIdx])
        arrCopy[randIdx] = null
        i++;
        }
      }
    return return_arr
  },
}

export default CONSTANTS;