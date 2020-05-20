export default {
    jwt: localStorage.jwt ? JSON.parse(localStorage.jwt) : null,
    email: '',
    password: '',
    currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null,
    currentFridge: localStorage.currentFridge ? JSON.parse(localStorage.currentFridge) : null,
    currentUsersFridges: localStorage.currentUsersFridges ? JSON.parse(localStorage.currentUsersFridges) : [],
    newFridge: {},
    foodItemsExpiringIn48Hrs: [],
    recipes: [],
    newFood: { name: '', is_drink: false, price: 0.00, food_type: 'fruit', expiration_date: '11/12/2089', fridge_id: -1, quantity: 0 },
}
