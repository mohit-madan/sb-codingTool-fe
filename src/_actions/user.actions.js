import { userConstants } from '../Constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../_helpers';
import config from "../config.js"
import { authHeader } from '../_helpers';
import axios from "axios"
import { useParams } from "react-router-dom";
import { data } from 'jquery';
import RESPONSE_MESSAGE from "../responseMessage"

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
    filteredPagination,
    jwtTokenCheck,
    questionCodebookId,
    projectDetailsForUserProjectsDashboard,
    projectList,
    userSearch
};
async function userSearch(name){
    const body ={
        "userQuery":name,
        "limit":-1
    }
    return await axios.post(`${config.apiUrl}/userSearch`,body)
    .then(data => {
      return (data?.data)
    })
}

async function projectList(){
    const _token=JSON.parse(localStorage.token).accessToken
    const _RequestOptions = {
        headers: {"authorization":`surveybuddytoken ${_token}`},
    };
    return await axios.get(`${config.apiUrl}/projectList`,_RequestOptions)
    .then(data => {
      return (data?.data)
    })
}
 async function questionCodebookId(questionId){
    const _token=JSON.parse(localStorage.token).accessToken
    const details={
        "questionId":questionId
    }
    const _RequestOptions = {
        headers: {"authorization":`surveybuddytoken ${_token}`},
    };
    return await axios.post(`${config.apiUrl}/leftMenu`,details,_RequestOptions)
    .then(data =>{
        console.log(`question codebook `,data)
        localStorage.setItem(`questionCodebookId `,data?.data?.questionCodebookId )

        return ({tree:data?.data?.tree,codewords:data?.data?.codewords})
    })
}

function jwtTokenCheck(){
    const _token=JSON.parse(localStorage.token).accessToken
    // const _token= `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5heW92ODgyMTlAYm90ZmVkLmNvbSIsImlhdCI6MTYxMjc4MjMwMCwiZXhwIjoxNjEyNzg0MTAwfQ.60498Yy5azPqcnfiuOUTYaIxdvNMW44R14F3MnISjq4`
    
    const _RequestOptions = {
        method: 'GET',
        headers: {"authorization":`surveybuddytoken ${_token}`}
    };
    fetch(`${config.apiUrl}/`, _RequestOptions)
    .then(data =>{
         if(data?.ok == false){
            console.log(data)
            history.push('/login')
         }
    })
}

async function filteredPagination({pageNumber,limit,filters,questionId}) {
    let temp3=null
    const details={
        "projectId":localStorage.projectId,
        "questions":[{"questionId":questionId}],
        "operators":filters
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    await axios.post(`${config.apiUrl}/operator`,(details), requestOptions)
    .then(data=>{
        if(data?.data?.length!==0){
            localStorage.setItem('filterdExcelData',JSON.stringify(data?.data))
            console.log(`Filtered Pagination DAta from user actions`,data?.data)
            temp3=data?.data?.result
        }
    },err=>console.log(err))
    return JSON.stringify(temp3)
}

async function responsePagination({pageNumber,limit,push,questionId}){
    let temp3=null
    console.log(`user actions response Pagination reached`,questionId,localStorage.projectId)
    const details={
        "projectId":localStorage.projectId,
        "questions":[{"questionId":questionId}],
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    return await axios.post(`${config.apiUrl}/response`,(details), requestOptions).then(data=>{
        console.log(`user actions response Pagination reached`,data)

        if(data?.data?.length!==0){
            // let temp1=[...JSON.parse(localStorage.excelData),...data?.data]
            // push && localStorage.setItem('excelData',JSON.stringify(data?.data))
            // push && history.push('/tool')
            console.log(`Pagination DAta from user actions`,data?.data)
            temp3=data?.data
            return JSON.stringify(temp3)
        }
    },err=>console.log(err))
   
}

async function projectDetails(){
    let details={
        "id":localStorage.projectId,
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    await axios.post(`${config.apiUrl}/projectDetails`,details, requestOptions)
    .then( data=>{
        console.log(`project details from user actions`,data)
        localStorage.setItem('fileKey',data?.data?.project?.docKey)
        localStorage.setItem('codebook',data?.data?.project?.codebook)
        localStorage.setItem('listOfQuestion',JSON.stringify(data?.data?.project?.listOfQuestion))
        console.log('listOfQuestion',JSON.stringify(data?.data?.project?.listOfQuestion))
        history.push(`/tool`)

    },err=>console.log(err))
}

async function projectDetailsForUserProjectsDashboard(projectId){
    let details={
        "id":projectId,
    }
    const _token=JSON.parse(localStorage.token).accessToken
    const requestOptions = {
        headers: {'Authorization': `Bearer ${_token}`}
    };
    return await axios.post(`${config.apiUrl}/projectDetails`,details, requestOptions)
    .then( data=>{
        return  (data?.data?.project)
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
            localStorage.clear();
            history.push('login')
        }else{
            if(resp1?.key){
                localStorage.setItem("fileKey",resp1?.key)
                console.log(`${resp1?.message}`)
                return 2
            }
        }
    })
    .catch(err=>{ localStorage.clear();
    history.push('login')})
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
            const FETCH_TIMEOUT = 3000;
            let didTimeOut = false;
            const timeout = setTimeout(function() {
                didTimeOut = true;
                dispatch(failure((new Error('Request timed out'))));
            }, FETCH_TIMEOUT);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
        let _token
    
         fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // console.log(data)
            clearTimeout(timeout);
            if(!didTimeOut) {
            // console.log("_token -->",data.accessToken)
            localStorage.setItem('token', JSON.stringify(data));
            _token=data.accessToken
            // console.log("_token -->",_token)
            if(data?.message){
                dispatch(failure(data?.message.toString()));
                dispatch(alertActions.error(data?.message.toString()));
                return
            }else if(data?.err){
                dispatch(failure(data?.err?.message.toString()));
                dispatch(alertActions.error(data?.err?.messag.toString()));
                return
            }
            else if(_token !== `undefined` ){
                const _RequestOptions = {
                    method: 'GET',
                    headers: {"authorization":`surveybuddytoken ${_token}`}
                };
                
                 fetch(`${config.apiUrl}/`, _RequestOptions)
                .then(handleResponse)
                .then(user=>{
                    // console.log("user -->",user,user.err);
                    if(user?.err){
                        // console.log(user.err?.message)
                        dispatch(failure(user.err?.message.toString()));
                        dispatch(alertActions.error(user.err?.message.toString()));
                        return
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    
                    dispatch(success(user));
                    // history.push(`/user/profile`);
                    window.location.href = `${config.redirecturl}/userProjectsDashboard`;
                    return user;
                },error => {
                    // console.log("error-->actions",error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
                );
            }else{
                dispatch(failure());
                dispatch(alertActions.error());

            }
            }
        },
        error => {
            dispatch(failure(error.toString('Request timed out')));
            dispatch(alertActions.error(error.toString('Request timed out')));
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
            .then(data=> {
              console.log(data)
              if(data?.message === RESPONSE_MESSAGE.userRegistered){
                dispatch(success());
                history.push('/login');
                dispatch(alertActions.success('Registration successful'));
              }else{
                dispatch(failure(data?.message));
                dispatch(alertActions.error(data?.message));
              }
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
           
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
