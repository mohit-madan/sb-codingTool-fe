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
function App() {
    // const users = useSelector(state => state.users);
    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    // let re= new RegExp("[A-za-z0–9_]")
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);
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
                            {/* UploaderPage */}
                            <Route  path="/" component={UploaderPage} />
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