import React from "react"
import './Home.css'
import Navbar from "./partials/navbar/Navbar";
import Travel from "../travel/Travel";

export default function Home(){
    return(
        <div className={"main"}>
            <Navbar/>
            <Travel/>
        </div>
    )
}
