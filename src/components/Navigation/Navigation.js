import axios from "axios";
import React from "react"
import config from "../../config";
import "./Navigation.css"
const Navigation=()=>{
    const logout=()=>{
        axios.get(`${config.apiUrl}/logout`).then(resp=>console.log(resp));
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.replace(`${config.redirecturl}`);
    }
    
    return(
    <div className="navigation">
        <h2>Coding Tool</h2>
        <h2 onClick={logout}>Logout</h2>
    </div>
)}
export default Navigation