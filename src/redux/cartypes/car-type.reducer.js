import {FETCH_CAR_TYPES_FAILURE, FETCH_CAR_TYPES_REQUEST, FETCH_CAR_TYPES_SUCCESS} from "./car-type.types";

const initialState = {
    loading : false,
    carTypes : [],
    error : ''
}

const fetchCartTypesReducer = (state = initialState, {type,payload} ) =>{
    switch(type){
        case FETCH_CAR_TYPES_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_CAR_TYPES_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: payload
            }
        }
        case FETCH_CAR_TYPES_FAILURE : {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }
        default : return state
    }
}

export default fetchCartTypesReducer
