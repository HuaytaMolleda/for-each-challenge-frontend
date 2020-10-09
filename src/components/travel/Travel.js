import React from "react"
import {Grid} from "@material-ui/core";
import {travelStyles} from "./Styles";
import Create from "./partials/create/Create";
import View from "./partials/views/View";



export default function Travel(){

    const classes = travelStyles();

    return (
        <Grid item xs={12} className={classes.root} container direction={"row"} alignItems={"center"}  >
            <Grid container  item xs={3}  style={{marginTop : 15,padding:25, backgroundColor:"white"}}>
                <Create/>
            </Grid>
            <Grid item xs={9} style={{backgroundColor:"transparent",padding: 10, marginTop:0}}>
                <View/>
            </Grid>
        </Grid>
    )
}
