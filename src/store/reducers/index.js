import { combineReducers } from 'redux'
import products from "./products.reducer";
import users from "./users.reducer"
import cart from "./cart.reducer"
import auth from "./auth.reducer"
import orders from "./orders.reducer"
import {reducer as toastrReducer} from 'react-redux-toastr'


export default combineReducers({
    products,
    users,
    auth,
    toastr: toastrReducer,
    cart,
    orders
})
