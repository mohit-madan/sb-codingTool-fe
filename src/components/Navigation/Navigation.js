import axios from "axios";
import React from "react"
import config, { socket } from "../../config";
import "./Navigation.css"
import { Button } from '@material-ui/core';
import { Link, useParams } from "react-router-dom";
import { history } from "../../_helpers";

const Navigation=()=>{
    const url =window.location.href?.split("/")
    console.log(url[url?.length-1]==="tool")

    const logout=()=>{
        axios.get(`${config.apiUrl}/logout`).then(resp=>console.log(resp));
        localStorage.clear()
        window.location.replace(`${config.redirecturl}`);
    }
    // localStorage.listOfQuestion

    const linkToUserDashboard=()=>{
        // localStorage.questionCodebookId
        localStorage.removeItem("questionCodebookId")
        localStorage.removeItem("listOfQuestion")
        localStorage.removeItem("codebook")
        history.push("/userProjectsDashboard")
        socket.emit("_disconnect")
    }

    return(
    <div className="navigation">
        <h2>Coding Tool</h2>

        <div className="right">
           <Button> <h2 onClick={logout}>Logout</h2></Button>
           {url[url?.length-1]==="tool" && <Button onClick={linkToUserDashboard}><Link ><h2 >Proceed to Project DashBoard</h2></Link></Button>  }

        </div>
    </div>
)}
export default Navigation