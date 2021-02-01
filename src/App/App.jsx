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
function App() {

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
                            {/* <Route
                                exact
                                path='/user'
                                render={() =>
                                !user ? (
                                <Redirect to='/' />
                                  ) : (
                                <Profile />
                                  )
                                }
                            /> */}
                            <PrivateRoute  path="/tool" component={CodeIt} />
                            <PrivateRoute  path="/" component={UploaderPage} />
                            <Route  path={`/resetPassword/:token`} component={ResetPassword} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };