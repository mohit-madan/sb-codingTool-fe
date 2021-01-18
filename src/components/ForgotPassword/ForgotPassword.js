import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../_actions';
import '../Login/LoginPage.css';
import { alertActions } from '../../_actions';
import { history } from '../../_helpers';
import { useSelector } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { TextField } from '@material-ui/core';
import Navigation from '../HomePage-Components/navigation';
import "./Forgotpassword.css"
function ForgotPassword() {
    const [submit,setSubmit]=useState(false);
    const [ minutes, setMinutes ] = useState(2);
	const [seconds, setSeconds ] =  useState(10);
	const [email,setEmail]=useState(true)
	const [resetPasswordWithEmail,setResetPasswordWithEmail]=useState(true);
	const [phoneNumber,setPhoneNumber]=useState("")
	const [OTP,setOTP]=useState("")
    const Timer = () => {
        useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });
    
        return (
            <div>
            {
                <h4 className="forgot_password_timer_h4"> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h4> 
            }
            </div>
        )
    }
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

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

	function emailHandleChange(e){
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    	if ( re.test(e.target.value) ) {
			setEmail(true);
    	}
    	else {
			setEmail(false);
    	}
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	}

	function handleChange(e) {
		const { name, value } = e.target;
		// setPhoneNumber((inputs) => ({ ...inputs, [name]: value }));
		setPhoneNumber(e.target.value)
	}
	function handleChangeOTP(e){
		const { name, value } = e.target;
		setOTP((inputs) => ({ ...inputs, [name]: value }));
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (username) {
			const rew={
				username:username
			}
			dispatch(userActions.forgotPass(rew));
		}
	}
	function handleSubmitOTP(e){
		e.preventDefault();
		if (phoneNumber) {
			const rew={
				username:phoneNumber
			}
			dispatch(userActions.forgotPassOTP(rew));
		}else if(phoneNumber&& OTP){
			const rew={
				username:OTP
			}
			dispatch(userActions.forgotPassOTP(rew));
		}
	}

	return (
		<div className="login">
			<Navigation showSignUpButton/>
		<div className="login_box col-lg-8 offset-lg-2">
			<h2>Forgot Password  ?</h2>
			<h3>Enter your Email below</h3>
			<h4>We'll email you with a Link</h4>
			<h4 styles={{"cursor": "pointer"}} onClick={()=>{setResetPasswordWithEmail(!resetPasswordWithEmail)}}>{resetPasswordWithEmail ? <a>Click Here to Reset Using Phone Number</a> : <a>Click Here to Reset Using Email</a>}</h4>
			<div className="form_box">
			{resetPasswordWithEmail && <form name="form" className="login-form" onSubmit={handleSubmit}>
				<TextField
    				id="outlined-secondary"
					label="Outlined secondary"
    				variant="outlined"
					color="primary"
					size="normal"
					type={`email`}
					name="username"
					value={username}
					onChange={emailHandleChange}
					label={`Email`}
					required
					submitted
				/>
				<CustomButton type="submit" onClick={()=>{setSubmit(!submit)}}>Submit</CustomButton>
			</form>
			}
			{!resetPasswordWithEmail && <form name="form" className="login-form" onSubmit={handleSubmitOTP}>
                {
                    submit && phoneNumber && <Timer />
                }
				<TextField
    				id="outlined-secondary"
					label="Outlined secondary"
    				variant="outlined"
					color="primary"
					size="normal"
					type={`text`}
					name="phoneNumber"
					value={phoneNumber}
					onChange={handleChange}
					label={`Phone Number`}
					required
					submitted
					disabled={submit && phoneNumber}
				/>
				{submit && phoneNumber && <TextField
    				id="outlined-secondary"
    				label="Outlined secondary"
    				variant="outlined"
					size="normal"
    				color="primary"
					type="number"
					name="OTP"
					value={OTP}
					onChange={handleChangeOTP}
                    label="OTP"
					required
                    submitted
                    disabled={minutes || seconds ? false : true}
					username
				/>}
				<CustomButton type="submit" onClick={()=>{setSubmit(!submit)}}>Submit</CustomButton>
			</form>
		}
			</div><div className="add_details">
				<h4 >Got your Password ? &nbsp;&nbsp;&nbsp; <Link to="/login">Login here</Link></h4>
			</div>
		</div>
		</div>
	);
}

export default ForgotPassword;