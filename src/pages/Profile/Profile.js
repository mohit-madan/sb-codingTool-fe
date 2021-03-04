import React, {useState,useEffect } from 'react';
import { Route,  BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import "./Profile.css"
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../../components/ProfilePageComponents/Sidebar/Sidebar';
import Info from '../../components/ProfilePageComponents/Info/Info';
import Contact from '../../components/ProfilePageComponents/ContactInfo/Contact.js';
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import UserProfile from '../../components/ProfilePageComponents/UserProfile/UserProfile';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SidebarComponent from '../../components/ProfilePageComponents/Sidebar/SideBarComponent/SidebarComponent';
import {initialState} from "../../Reducers/authentication.reducer"
import axios from "axios"
import config from "../../config.js"
import { Button } from '@material-ui/core';
import ZoomPage from '../../components/ProfilePageComponents/zoomPage/zoomPage';
import Navbar from '../../components/ProfilePageComponents/Navbar/Navbar.js';

const Profile=()=> {

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      
       function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
      }
      
    const { height, width } = useWindowDimensions();
    const [showSidebar,setShowSidebar]=useState(true);
    const [fullSidebarbarWidth,setFullSidebarWidth]=useState(false)
    useEffect(()=>{
        if(width<600){
            setShowSidebar(false);
            setFullSidebarWidth(true)
        }return(()=>{
            setFullSidebarWidth(false)
            setShowSidebar(true);
        })
    }
    ,[width])

    return (
        <div className="profile">
            <Navbar />

            <div className="_main">
                <Router>
                    {showSidebar && <Sidebar full={showSidebar && fullSidebarbarWidth} user={initialState?.loggedIn ? initialState?.user : null}/>}
                    {/* {showSidebar && <Sidebar full={showSidebar && fullSidebarbarWidth} />} */}
                    <Switch>
                    <Route exact path="/user/profile" >
                        <ZoomPage full={showSidebar && fullSidebarbarWidth} user={initialState?.loggedIn ? initialState?.user : null} />
                    </Route>
                    <Route exact path="/user/surveys" >
                        <UserProfile full={showSidebar && fullSidebarbarWidth} user={initialState?.loggedIn ? initialState?.user : null} />
                    </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}




export default Profile ;