import {combineReducers} from "redux"
import fetchReducer from "./travel/fetch.reducer";
import createReducer from "./create/create.reducer";
import fetchCartTypesReducer from "./cartypes/car-type.reducer";

const rootReducer = combineReducers({
    fetch : fetchReducer,
    create : createReducer,
    cartypes : fetchCartTypesReducer
})

export default rootReducer
