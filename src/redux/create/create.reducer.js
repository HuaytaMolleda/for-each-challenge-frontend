import {CREATE_TRAVEL_FAILURE, CREATE_TRAVEL_REQUEST, CREATE_TRAVEL_SUCCESS} from "./create.types";

const initialState = {
    loading : false,
    data : {},
    error : ''
}


const createReducer = (state = initialState, {type,payload} ) =>{
    switch(type){
        case CREATE_TRAVEL_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case CREATE_TRAVEL_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: payload
            }
        }
        case CREATE_TRAVEL_FAILURE : {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }
        default : return state
    }
}

export default createReducer
