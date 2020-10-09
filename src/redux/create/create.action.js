import {CREATE_TRAVEL_FAILURE, CREATE_TRAVEL_REQUEST, CREATE_TRAVEL_SUCCESS} from "./create.types";

export const createTravelRequestAction = () =>{
    return{
        type : CREATE_TRAVEL_REQUEST
    }
}
export const createTravelSuccessAction= (data) =>{
    return{
        type : CREATE_TRAVEL_SUCCESS,
        payload : data
    }
}
export const createTravelFailureAction = (error) =>{
    return{
        type : CREATE_TRAVEL_FAILURE,
        payload : error
    }
}
