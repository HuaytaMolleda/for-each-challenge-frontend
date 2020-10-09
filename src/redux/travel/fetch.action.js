import {
    FETCH_TRAVEL_FAILURE,
    FETCH_TRAVEL_REQUEST,
    FETCH_TRAVEL_SUCCESS
} from "./fetch.types";

export const fetchTravelRequestAction = () =>{
    return{
        type : FETCH_TRAVEL_REQUEST
    }
}

export const fetchTravelSuccessAction = (data)=>{
    return{
        type : FETCH_TRAVEL_SUCCESS,
        payload : data
    }
}
export const fetchTravelFailureAction = (error)=>{
    return{
        type : FETCH_TRAVEL_FAILURE,
        payload : error
    }
}
