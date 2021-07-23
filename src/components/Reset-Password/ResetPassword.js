import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { alertActions, userActions } from '../../_actions';
import CustomButton from '../custom-button/custom-button.component';
import "../Login/LoginPage.css"
import { TextField } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { history } from '../../_helpers';
import Navigation from '../HomePage-Components/navigation';
import axios from "axios"
import { useSelector } from 'react-redux';
import "./css/style.css"
import "./css/bootstrap.css"

function ResetPassword() {
	const alert = useSelector(state => state.alert);
	const [ user, setUser ] = useState({
		password: '',
		confirmPassword:"",
	});
	const dispatch = useDispatch();
	const _token = useParams();
    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
		})
		
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
		if (user.confirmPassword && user.password && user.password===user.confirmPassword){
			const resetPass={
				token:_token.token,
    			password:user.password
			}
			dispatch(userActions.resetPass(resetPass));
			setUser({
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
			<h4>Create Your New Password to get going</h4>
			<div className="form_box">
			<form name="form" className="login-form" onSubmit={handleSubmit}>
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
					label="New Password"
					required
					submitted
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
					label="Confirm New Password"
					required
					submitted
				/>
				<CustomButton onClick={handleSubmit} type="submit">Submit</CustomButton>
				{alert.message &&
                        <div className="alert">{alert.message}</div>
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

export { ResetPassword };
