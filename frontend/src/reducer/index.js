import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import courseReducer from "../slices/courseSlice"
import profileRuducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileRuducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse: viewCourseReducer,
})
export default rootReducer