import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../Slices/authSlice"
import profileRuducer from "../Slices/profileSlice"
import cartReducer from "../Slices/cartSlice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileRuducer,
    cart:cartReducer,
})
export default rootReducer