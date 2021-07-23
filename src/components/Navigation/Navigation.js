import axios from "axios";
import React from "react"
import config, { socket } from "../../config";
import "./Navigation.css"
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { history } from "../../_helpers";

const Navigation=()=>{

    const logout=()=>{
        axios.get(`${config.apiUrl}/logout`);
        localStorage.clear()
        window.location.replace(`${config.redirecturl}`);
    }
    
    const linkToUserDashboard=()=>{
        localStorage.removeItem("questionCodebookId")
        localStorage.removeItem("listOfQuestion")
        localStorage.removeItem("listOfFilterQuestion")
        localStorage.removeItem("codebook")
        localStorage.removeItem("projectId")
        localStorage.removeItem("filterDetails")
        localStorage.removeItem("filteredExcelData")
        
        history.push("/userProjectsDashboard")
        socket.emit("_disconnect")
        socket.disconnect()
    }

    return(
    <div className="navigation">
        <Button onClick={linkToUserDashboard}><h2>Coding Tool</h2></Button>

        <div className="right">
           <Button> <h2 onClick={logout}>Logout</h2></Button>
           <Button onClick={linkToUserDashboard}><Link ><h2 >Proceed to Project DashBoard</h2></Link></Button>
        </div>
    </div>
)}
export default Navigation