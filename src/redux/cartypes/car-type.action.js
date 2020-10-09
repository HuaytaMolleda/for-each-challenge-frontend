import {FETCH_CAR_TYPES_FAILURE, FETCH_CAR_TYPES_REQUEST, FETCH_CAR_TYPES_SUCCESS} from "./car-type.types";

export const fetchCarTypesRequestAction = () =>{
    return{
        type : FETCH_CAR_TYPES_REQUEST
    }
}
export const fetchCarTypesSuccessAction= (data) =>{
    return{
        type : FETCH_CAR_TYPES_SUCCESS,
        payload : data
    }
}
export const fetchCarTypesFailureAction = (error) =>{
    return{
        type : FETCH_CAR_TYPES_FAILURE,
        payload : error
    }
}


