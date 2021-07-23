import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { alertActions, userActions } from '../../_actions';
import CustomButton from '../custom-button/custom-button.component';
import "../Login/LoginPage.css"
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { history } from '../../_helpers';
import Navigation from '../HomePage-Components/navigation';
import axios from "axios"
import { useSelector } from 'react-redux';

function RegisterPage() {
	const _alert = useSelector(state => state.alert);
	const [ user, setUser ] = useState({
		firstName: 'default',
		lastName: 'default',
		username: '',
		password: '',
		confirmPassword:"",
	});
	const dispatch = useDispatch();

	
    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
	}, []);
	useEffect(() => {
		dispatch(userActions.logout());
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setUser((user) => ({ ...user, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (user.firstName && user.lastName && user.username && user.password && user.password===user.confirmPassword){
			const registerUser={
				username:user.username,
    			password:user.password
			}			
			dispatch(userActions.register(registerUser));

			setUser({
				firstName: 'default',
				lastName: 'default',
				username: '',
				password: '',
				confirmPassword:""
			});
		}else if(user.password!==user.confirmPassword){
			alert("Passward and Confirm Password Doesn't match")
		}
	}

	return (
		<div className="login">
			<Navigation showLoginButton/>
		<div className="login_box register_box col-lg-8 offset-lg-2">
			<h2>Survey Buddy</h2>
			<h3>Hey, good to see you again</h3>
			<h4>Log in to get going</h4>
			<div className="form_box">
			<form name="form" className="login-form" onSubmit={handleSubmit}>
				<TextField
    				id="outlined-secondary"
					label="Outlined secondary"
    				variant="outlined"
					color="primary"
					size="normal"
					type="text"
					name="username"
					value={user.username}
					onChange={handleChange}
					label="Email"
					required
					submitted
					username
				/>
				<TextField
    				id="outlined-secondary"
					label="Outlined secondary"
    				variant="outlined"
					color="primary"
					size="normal"
					type="password"
					name="password"
					value={user.password}
					onChange={handleChange}
					label="Password"
					required
					submitted
					username={user.password}
				/>
				<TextField
    				id="outlined-secondary"
					label="Outlined secondary"
    				variant="outlined"
					color="primary"
					size="normal"
					type="password"
					name="confirmPassword"
					value={user.confirmPassword}
					onChange={handleChange}
					label="Confirm Password"
					submitted
				/>
				<CustomButton onClick={handleSubmit} type="submit">Register</CustomButton>
				{_alert.message &&
                        <div className="alert">{_alert.message}</div>
            	}
			</form>
		</div>
			<div className="add_details">
				<h4 >Already Have an account ? &nbsp;&nbsp;&nbsp; <Link to="/login">Login here</Link></h4>
			</div>
		</div>
		</div>
	);
}

export { RegisterPage };
