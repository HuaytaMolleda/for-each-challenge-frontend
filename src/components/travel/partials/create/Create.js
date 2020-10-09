import React, {useEffect, useState} from "react";
import {
    FormControl,
    Grid,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Button, FormHelperText, Typography,
} from "@material-ui/core";
import {createStyles} from "./Styles";
import {buildUrl, verifyInputLength} from "../../../../helpers";
import {serverControllers} from "../../constants";
import axios from "axios"
import {
    fetchCarTypesFailureAction,
    fetchCarTypesRequestAction,
    fetchCarTypesSuccessAction
} from "../../../../redux/cartypes/car-type.action";
import {useDispatch} from "react-redux";
import {
    createTravelFailureAction,
    createTravelRequestAction,
    createTravelSuccessAction
} from "../../../../redux/create/create.action";


export default function Create(){

    const classes = createStyles()

    const dispatch = useDispatch()

    const [errorValidator ,setErrorValidator] = useState(false)

    const [formData,setFormData] = useState({
        startPoint : '',
        endPoint : '',
        kmQuantity: '',
        peopleInTravel : '',
        conveyanceWay :'',
        isOneWay : ''
    })


    const [formValidators,setFormValidators] = useState({
        startPoint : false,
        endPoint : false,
        kmQuantity: false,
        peopleInTravel :false,
        conveyanceWay :false,
        isOneWay : false
    })




    const [types,setTypes] = useState([])

    const fetchCartTypes =()=>{
        return (dispatch) =>{
            dispatch(fetchCarTypesRequestAction())
            axios.get(buildUrl(process.env.REACT_APP_URL_BASE,serverControllers.types))
                .then(response=>{
                    const data = response.data
                    dispatch(fetchCarTypesSuccessAction(data))
                    setTypes(data)
                }).catch(error=>{
                    dispatch(fetchCarTypesFailureAction(error))
            })
        }
    }

    const createTravel =() =>{
        return (dispatch) => {
            dispatch(createTravelRequestAction())
            axios.post(buildUrl(process.env.REACT_APP_URL_BASE,serverControllers.create),formData)
                .then(response => {
                    const travel = response.data
                    dispatch(createTravelSuccessAction(travel))

                }).catch(error =>{
                    dispatch(createTravelFailureAction(error))
            })
        }
    }




    useEffect(()=>{
        dispatch(fetchCartTypes())
    },[])


    function onChangeInput(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        formData[name] = value
        setFormData({...formData})
        setErrorValidator(false)
    }

    function onSubmit(event){

        let flag = true

        for (let index  = 0  ; index <  Object.keys(formValidators).length ; index++ ){
            formValidators[Object.keys(formValidators)[index]] = verifyInputLength(formData[Object.keys(formValidators)[index]])
            setFormValidators({
                ...formValidators
            })
            flag = flag && verifyInputLength(formData[Object.keys(formValidators)[index]])
        }
        if (flag){
            dispatch(createTravel())
            setFormData({...formData,
                startPoint : '',
                endPoint : '',
                kmQuantity: '',
                peopleInTravel : '',
                conveyanceWay :'',
                isOneWay : ''})
        }
        else
            setErrorValidator(true)
    }


    console.log(errorValidator)
    return(
        <Grid  className={classes.root}  item xs={12} container direction={"column"} justify={"center"} >
            <Typography align={"center"} variant={"h5"}>Formulario</Typography>
            <TextField
                error={!formValidators.startPoint && errorValidator}
                helperText={!formValidators.startPoint && errorValidator ? "Dato obligatorio" : null }
                fullWidth={true}
                value={formData.startPoint}
                name={"startPoint"}
                label={ "Punto de inicio" }
                autoComplete={"off"}
                autoFocus={false}
                margin={"normal"}
                variant={"outlined"}
                onChange={onChangeInput}
            />
            <TextField
                error={!formValidators.endPoint && errorValidator}
                helperText={!formValidators.endPoint && errorValidator ? "Dato obligatorio" : null }
                fullWidth={true}
                value={formData.endPoint}
                name={"endPoint"}
                label={ "Punto de termino" }
                autoComplete={"off"}
                autoFocus={false}
                margin={"normal"}
                variant={"outlined"}
                onChange={onChangeInput}
            />
            <TextField
                error={!formValidators.kmQuantity && errorValidator}
                helperText={!formValidators.kmQuantity && errorValidator ? "Dato obligatorio" : null }
                fullWidth={true}
                value={ formData.kmQuantity}
                name={"kmQuantity"}
                label={ "Kilometros recorridos" }
                autoComplete={"off"}
                autoFocus={false}
                margin={"normal"}
                variant={"outlined"}
                onChange={onChangeInput}
            />
            <TextField
                error={!formValidators.peopleInTravel && errorValidator}
                helperText={!formValidators.peopleInTravel && errorValidator ? "Dato obligatorio" : null }
                fullWidth={true}
                value={ formData.peopleInTravel }
                name={"peopleInTravel"}
                label={ "Personas en el viaje" }
                autoComplete={"off"}
                autoFocus={false}
                margin={"normal"}
                variant={"outlined"}
                onChange={onChangeInput}
            />
            <FormControl  style={{marginTop : 15}} variant="outlined"  error={!formValidators.conveyanceWay && errorValidator}  >
                <InputLabel>Medio de Transporte</InputLabel>
                <Select name={"conveyanceWay"} onChange={onChangeInput} value={formData.conveyanceWay} label={"Medio de Transporte"} >
                    { types.length !==0 &&  types.map((status,index)=>{
                        return <MenuItem key={index} value={status}>{status}</MenuItem>
                    })}
                </Select>
                {!formValidators.conveyanceWay && errorValidator ?  <FormHelperText>Dato Obligatorio</FormHelperText> : null}
            </FormControl>
            <FormControl  style={{marginTop : 15}} variant="outlined"  error={!formValidators.isOneWay && errorValidator}>
                <InputLabel>Viaje de Ida</InputLabel>
                <Select name={"isOneWay"} onChange={onChangeInput} value={formData.isOneWay} label={"Viaje de Ida"}>
                    <MenuItem value={true} >Si</MenuItem>
                    <MenuItem value={false} >No</MenuItem>
                </Select>
                {!formValidators.isOneWay && errorValidator ? <FormHelperText>Dato Obligatorio</FormHelperText> : null}
            </FormControl>
            <Button onClick={onSubmit}  style={{marginTop:15}} variant={"contained"} color={"primary"} fullWidth={true}>Crear viaje</Button>
        </Grid>
    )
}
