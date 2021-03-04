import React,{useEffect,useState} from 'react'
import "./Sidebar.css"
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SidebarComponent from './SideBarComponent/SidebarComponent';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link, Redirect, useParams } from 'react-router-dom';
import SidebarCard from "./SidebarCard/SidebarCard.js"

const Sidebar =({full,user})=> {
    const activeComponentStyle={backgroundColor:"#0e71eb!important",color:"white!important"}
    const state={
        profile:true,
        surveys:false,
        contact:false,
    }
    const [urlParam,setUrlParam]=useState({
        profile:true,
        surveys:false,
        contact:false,
    })
    return (
    <div id={full && `leftmenu`} className={!full && `leftmenu`}>
        {/* <SidebarCard user/> */}
        {/* <h3 className="leftmenu_title"><Link to="/user/profile">User Profile</Link></h3> */}
        <h2>PERSONAL</h2>
        <div className="_list">
            
            <Link className="_list" to={`/user/profile`}>
                <div
                onClick={()=>{setUrlParam({profile:true,
                    surveys:false,})}}
                className="sidebarcomponent">
                    {urlParam.profile && <a style={{backgroundColor:"#0e71eb",color:"white"}} className="sidebarcomponentoption">
                    {"User Profile"} 
                    </a>}
                    {!urlParam.profile && <a className="sidebarcomponentoption">
                    {"User Profile"} 
                    </a>}
                </div>
            </Link>
            <Link className="_list" to={`/user/surveys`}>
                <div
                onClick={()=>{setUrlParam({profile:false,
                    surveys:true,},)}}
                className="sidebarcomponent">
                    {urlParam.surveys && <a style={{backgroundColor:"#0e71eb",color:"white"}} className="sidebarcomponentoption">
                        {"Surveys"}
                    </a>}
                    {!urlParam.surveys && <a className="sidebarcomponentoption">
                        {"Surveys"}
                    </a>}
                </div>
            </Link>
        </div>
    </div>
    )}


export default Sidebar
