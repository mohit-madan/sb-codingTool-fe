import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import "./app.css"
import { history } from '../_helpers';
import "./app.css"
import { LoginPage } from '../components/Login';
import { RegisterPage } from '../components/Register';
import { useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../components/Reset-Password/ResetPassword';
import UploaderPage from "../pages/Uploader/UploaderPage.js"
import CodeIt from '../pages/CodeIt/CodeIt';
import {initialState} from '../Reducers/authentication.reducer'
import ProjectsDashboard from '../pages/ProjectsDashboard/ProjectsDashboard';
import UserProjectsDashboard from '../pages/UserProjectsDashboard/UserProjectsDashboard';
import Profile from '../pages/Profile/Profile';

function App() {
    
    useEffect(() => {
        if(initialState?.loggedIn ==true){
            userActions.jwtTokenCheck()
        }
    },[])
    useEffect(() => {
        const intervalId = setInterval(() => { 
            if(initialState?.loggedIn ==true){
                userActions.jwtTokenCheck()
            }
          }, 1000*60)
          return () => clearInterval(intervalId);
          
    })

    function hasQuiet() {
        var cold = false,
        hike = function() {};
        
        try {
        var aid = Object.defineProperty({}, 'passive', {
        get: function() {cold = true}
        });
        window.addEventListener('test', hike, aid);
        window.removeEventListener('test', hike, aid);
        } catch (e) {}

        return cold;
    }
    useEffect(() => {
        window.addEventListener('wheel', function() {
        }, hasQuiet() ? {passive: false} : false);
    }, [])
    return (
        <div className="">
            <div className="">
                <div className="">
                    <Router history={history}>
                        <Switch>
                            <Route  path="/login" component={LoginPage} />
                            <Route  path="/register" component={RegisterPage} />
                            <Route  path="/forgot-password" component={ForgotPassword} />
                            <Route  path="/dash" component={ProjectsDashboard} />
                            <PrivateRoute exact  path="/user/profile"  component={Profile}/>
                            <PrivateRoute  path="/userProjectsDashboard" component={UserProjectsDashboard} />
                            <PrivateRoute  path="/tool" component={CodeIt} />
                            <PrivateRoute  path="/uploader" component={UploaderPage} />
                            <Route  path={`/resetPassword/:token`} component={ResetPassword} />
                            <PrivateRoute  path="/" component={UserProjectsDashboard} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };