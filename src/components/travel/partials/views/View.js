import {
    Grid,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody, TablePagination
} from "@material-ui/core";
import React, {useEffect} from "react"
import {viewStyles} from "./Styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchTravelFailureAction, fetchTravelRequestAction, fetchTravelSuccessAction} from "../../../../redux";
import axios from "axios"
import {buildUrl,isOneWayHelper} from "../../../../helpers";
import {serverControllers} from "../../constants";

export default function View(){

    const classes = viewStyles()

    const data = useSelector(state => state.create.data)
    const travels = useSelector(state=>state.fetch.travel)

    const dispatch = useDispatch()

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, travels.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchTravels =  () => {
        return function (dispatch){
            dispatch(fetchTravelRequestAction())
            axios.get(buildUrl(process.env.REACT_APP_URL_BASE,serverControllers.list)+'?'+new URLSearchParams({
                size : 10,
                page :1
            }))
                .then(response=>{
                    const data = response.data
                    dispatch(fetchTravelSuccessAction(data.items))
                }).catch(error => {
                    dispatch(fetchTravelFailureAction(error))
            })
        }
    }

    useEffect(()=>{
        dispatch(fetchTravels())
    },[data])

    return(
        <Grid item xs={12} container direction={"column"}>
            <TableContainer  component={Paper} >
                <Table  className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="center"><Typography className={classes.tableRow}>N° de viaje</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Día y hora</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Punto de inicio</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Punto de termino</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Kilometros recorridos</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Medio de transporte</Typography> </TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Personas en el viaje</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>Ida y vuelta</Typography></TableCell>
                            <TableCell align="center"><Typography className={classes.tableRow}>KgCO2 por persona</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { travels.length !== 0 && travels.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((row,index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.travelNumber}</TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.startPoint}</TableCell>
                                <TableCell align="center">{row.endPoint}</TableCell>
                                <TableCell align="center">{row.kmQuantity}</TableCell>
                                <TableCell align="center">{row.conveyanceWay}</TableCell>
                                <TableCell align="center">{row.peopleInTravel}</TableCell>
                                <TableCell align="center">{isOneWayHelper(row.isOneWay)}</TableCell>
                                <TableCell align="center">{row.kgCO2ByPerson}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 150}}>
                                <TableCell colSpan={9} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={travels.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Grid>
    )
}
