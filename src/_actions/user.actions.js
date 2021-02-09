import { userConstants } from '../Constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../_helpers';
import config from "../config.js"
import { authHeader } from '../_helpers';
import axios from "axios"
import { useParams } from "react-router-dom";
// import {handleResponse} from "../services"

export const userActions = {
    login,
    logout,
    register,
    getAll,
    forgotPass,
    resetPass,
    forgotPassOTP,
    uploadFile,
    projectDetails,
    responsePagination,
    filteredPagination
};

async function filteredPagination({pageNumber,limit,filters}) {
    let temp3=null
    const details={
        "projectId":localStorage.projectId,
        "questionId":localStorage.listOfQuestion,
        "filters":filters
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    await axios.post(`${config.apiUrl}/filter/${pageNumber}/${limit}`,(details), requestOptions)
    .then(data=>{
        if(data?.data?.length!==0){
            // let temp1=[...JSON.parse(localStorage.excelData),...data?.data]
            localStorage.setItem('filterdExcelData',JSON.stringify(data?.data))
            console.log(`Filtered Pagination DAta from user actions`,data?.data)
            temp3=data?.data
        }
    },err=>console.log(err))
    return JSON.stringify(temp3)
}

async function responsePagination({pageNumber,limit,push}){
    let temp3=null
    const details={
        "projectId":localStorage.projectId,
        "questionId":localStorage.listOfQuestion
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    return await axios.post(`${config.apiUrl}/response/${pageNumber}/${limit}`,(details), requestOptions)
    .then(data=>{
        if(data?.data?.length!==0){
            // let temp1=[...JSON.parse(localStorage.excelData),...data?.data]
            push && localStorage.setItem('excelData',JSON.stringify(data?.data))
            push && history.push('/tool')
            console.log(`Pagination DAta from user actions`,data?.data)
            temp3=data?.data
            return JSON.stringify(temp3)
        }
    },err=>console.log(err))
   
}

async function projectDetails(){

    const details={
        "id":localStorage.projectId,
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    await axios.post(`${config.apiUrl}/projectDetails`,details, requestOptions)
    .then(async data=>{
        console.log(`project details from user actions`,data)
        localStorage.setItem('fileKey',data?.data?.project?.docKey)
        localStorage.setItem('codebook',data?.data?.project?.codebooks)
        localStorage.setItem('listOfQuestion',data?.data?.project?.listOfQuestion)
    },err=>console.log(err))
}

async function uploadFile(){
    var data = new FormData();
    var fileData = document.querySelector('input[type="file"]').files[0];
    data.append("file", fileData);
    
    const _token=JSON.parse(localStorage.token).accessToken
    await axios.post(`${config.apiUrl}/uploadFile`,data, {
      headers:{
        'Authorization': `Bearer ${_token}`,
      },
    }).then(resp=>resp.data)
    .then(resp1=>{
        console.log('Upload FIle Response',resp1)
        if(resp1?.err){
            alert(`${resp1?.err?.message},"Please Login Again"`)
        }else{
            if(resp1?.key){
                localStorage.setItem("fileKey",resp1?.key)
                alert(`${resp1?.message}`)
                return 2
            }
        }
    })
    .catch(err=> alert(`Please Login Again`))
}


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
                    // window.location.replace(`${config.redirecturl}/`);
                    const interval = setInterval(() => {
                        localStorage.removeItem('user')
                        history.push('/login')
                        alert('Session Timed Out ! , Please Login Again')
                        clearInterval(interval);
                    }, 1000*60*30);

                    history.push('/')
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
