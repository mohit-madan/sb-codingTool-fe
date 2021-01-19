import { userConstants } from '../Constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../_helpers';
import config from "../config.js"
import { authHeader } from '../_helpers';
// import {handleResponse} from "../services"
import axios from "axios"

export const userActions = {
    login,
    logout,
    register,
    getAll,
    forgotPass,
    resetPass,
    forgotPassOTP
};

function resetPass(user) {
    return dispatch => {
        // dispatch(request(user));
        userService.resetPass(user)
            .then(
                user => { 
                    console.log("user-Actions-user",user)
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Password Reset Sucessfully'));
                },
                error => {
                    console.log("user-Actions-error",error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function forgotPassOTP(user) {
    return dispatch => {
        // dispatch(request(user));
        userService.forgotPass(user)
            .then(
                user => { 
                    console.log("user-Actions-user",user)
                    dispatch(success());
                    dispatch(alertActions.success('OTP sent to the Mobile'));
                },
                error => {

                    console.log("user-Actions-error",error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function forgotPass(user) {
    return dispatch => {
        // dispatch(request(user));
        userService.forgotPass(user)
            .then(
                user => { 
                    console.log("user-Actions-user",user)
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Reset Password link sent successful'));
                },
                error => {

                    console.log("user-Actions-error",error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        // userService.login(username, password)
            // .then(
            //     user => { 
            //         console.log("user-->actions",user)
                    // dispatch(success(user));
                    // window.location.replace(`${config.redirecturl}/user/profile`);
            //     },
                // error => {
                //     console.log("error-->actions",error)
                //     dispatch(failure(error.toString()));
                //     dispatch(alertActions.error(error.toString()));
                // }
            // );

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
        let _token
    
         fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log("_token -->",data.accessToken)
            localStorage.setItem('token', JSON.stringify(data));
            _token=data.accessToken
            console.log("_token -->",_token)
            if(data?.message){
                dispatch(failure(data?.message.toString()));
                dispatch(alertActions.error(data?.message.toString()));
            }else{
                const _RequestOptions = {
                    method: 'GET',
                    headers: {"authorization":`surveybuddytoken ${_token}`}
                };
                
                 fetch(`${config.apiUrl}/`, _RequestOptions)
                .then(handleResponse)
                .then(user=>{
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log("user -->",user);
                    dispatch(success(user));
                    window.location.replace(`${config.redirecturl}/`);
                    return user;
                },error => {
                    console.log("error-->actions",error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
                );
            }
        })

    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
// 
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // const data=text
        if (!response) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);
        return data;
    });
}