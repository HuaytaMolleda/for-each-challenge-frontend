import React from "react"
import {Avatar, Box, Grid, Typography} from "@material-ui/core";
import {navbarStyles} from "./Styles"
import './Navbar.css'




export default function Navbar(){

    const classes = navbarStyles();




    return (
        <Box boxShadow={3} component={Grid} className={classes.root}  justify={"flex-start"} alignItems={"center"}  container >
        </Box>
    )

}
