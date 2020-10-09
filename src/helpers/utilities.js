import {FALSE, TRUE} from "./constants";

function verifyPatternPassword(password){
    const pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    return pattern.test(password)
}

function verifyEmailPattern  (email){
    const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return pattern.test(email)
}

function verifyInputLength (input){
    return input.length !== 0;
}


function buildUrl(...args){
    if(args.length ===0)
        return null
    return args.reduce((firstArgument,secondArgument)=>{
        return  firstArgument.concat("/",secondArgument)
    })
}


function isOneWayHelper(isOneWay){
    return isOneWay ? TRUE : FALSE
}

export {
    verifyEmailPattern,
    verifyInputLength,
    verifyPatternPassword,
    buildUrl,
    isOneWayHelper
}

