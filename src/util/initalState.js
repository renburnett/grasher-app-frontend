export default {
    jwt: undefined,
    email: '',
    password: '',
    currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null,
    currentFridge: null,
    currentUsersFridges: [],
    newFridge: {},
    foodItemsExpiringIn48Hrs: [],
    recipes: [],
    newFood: { name: '', is_drink: false, price: 0.00, food_type: 'fruit', expiration_date: '11/12/2089', fridge_id: -1, quantity: 0 },
}