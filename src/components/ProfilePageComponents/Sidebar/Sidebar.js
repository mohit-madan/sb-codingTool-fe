import React,{useEffect,useState} from 'react'
import "./Sidebar.css"
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SidebarComponent from './SideBarComponent/SidebarComponent';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link, Redirect, useParams } from 'react-router-dom';
import SidebarCard from "./SidebarCard/SidebarCard.js"

const Sidebar =({full})=> {
    // let option
    // useEffect(() => {
    //     option = window.location.href.split("/")
    //     option = option[option.length-1]
    //     console.log("option",option);
    // }, [option])


        return (
        <div id={full && `leftmenu`} className={!full && `leftmenu`}>
            <SidebarCard />
            <h3 className="leftmenu_title"><Link to="/user/profile">User Profile</Link></h3>

            <div className="_list">
                <Link className="_list" to={`/user/info`}>
                    <SidebarComponent 
                    // onClick={()=>{this.setState({contact:false,info:true},console.log(this.state))}} 
                    className="downloadText" Icon={PersonOutlineOutlinedIcon} 
                    text={"User Info"} 
                    // active={this.state.info}
                    />
                </Link>
                <Link className="_list" to={`/user/contact`}>
                    <SidebarComponent 
                    // onClick={()=>{this.setState({info:false,contact:true})}} 
                    className="downloadText" Icon={PermContactCalendarOutlinedIcon} 
                    text={"Contact Info"} 
                    // active={this.state.contact}
                    />
                </Link>
            </div>
        </div>
    )}


export default Sidebar
