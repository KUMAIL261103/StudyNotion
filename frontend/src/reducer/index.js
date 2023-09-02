import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileRuducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileRuducer,
    cart:cartReducer,
})
export default rootReducer