import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../_actions';
import './LoginPage.css';
import { alertActions } from '../../_actions';
import { history } from '../../_helpers';
import { useSelector } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { TextField } from '@material-ui/core';
import Navigation from '../HomePage-Components/navigation';
import GoogleSignIn from '../Google-SignIn/GoogleSignIn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function LoginPage() {
	
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
	const [showPassword,setShowPassword]=useState(false)

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
	}, []);
	
	const [ inputs, setInputs ] = useState({
		username: '',
		password: ''
	});
	const { username, password } = inputs;
	const location = useLocation();

	useEffect(() => {
		dispatch(userActions.logout());
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (username && password) {
			const { from } = location.state || { from: { pathname: '/' } };
			dispatch(userActions.login(username, password, from));
		}
	}

	return (
		<div className="login">
			<Navigation showSignUpButton/>
		<div className="login_box col-lg-8 offset-lg-2">
			<h2>Survey Buddy</h2>
			<h3>Hey, good to see you again</h3>
			<h4>Log In get going</h4>
			<div className="form_box">
			<form name="form" className="login-form" onSubmit={handleSubmit}>
				
				<TextField
    				id="outlined-secondary"
					label="Outlined secondary"
    				variant="outlined"
					color="primary"
					// size="normal"
					type="text"
					name="username"
					value={username}
					onChange={handleChange}
					label="Email"
					required
				/>
				<div className="input_row">
					<TextField
    				id="outlined-secondary"
    				label="Outlined secondary"
    				variant="outlined"
					// size="normal"
    				color="primary"
					type={!showPassword ? "password" : "text"}
					name="password"
					value={password}
					onChange={handleChange}
					label="Password"
					required
					
					/>
					{!showPassword ? <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}} /> :  <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}}/>}

				</div>
				<CustomButton type="submit">Submit</CustomButton>
			{alert.message &&
                        <div className="alert">{alert.message}</div>
            }
			</form>
			</div>
			<div className="add_details">
				<h4 >New User ? &nbsp;&nbsp;&nbsp;<Link to="/register">Register here</Link></h4>
			</div>
				<h4 >Forgot Password ? &nbsp;&nbsp;&nbsp;<Link to="/forgot-password">Click here</Link></h4>
			
				<a to="/user/profile">
				<GoogleSignIn /></a>	
		</div>
		</div>
	);
}

export { LoginPage };
