
const { FETCH_TRAVEL_REQUEST , FETCH_TRAVEL_FAILURE, FETCH_TRAVEL_SUCCESS } = require("./fetch.types")

const initialState = {
    loading : false,
    travel : [],
    error : ''
}


const fetchReducer = (state = initialState, {type,payload} ) =>{
    switch(type){
        case FETCH_TRAVEL_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_TRAVEL_SUCCESS : {
            return {
                ...state,
                loading: false,
                travel: payload
            }
        }
        case FETCH_TRAVEL_FAILURE : {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }
        default : return state
    }
}

export default fetchReducer
