import React from "react"
import { GoogleLogin } from 'react-google-login';
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import config from "../../config.js"
import { Link } from "react-router-dom";

class GoogleSignIn extends React.Component{
    responseGoogle = async (response) => {
        window.location.replace(`${config.redirecturl}/user/profile`);
        console.log(response);
        const { setGoogleUser } = this.props;
        setGoogleUser(response)
        await localStorage.setItem('user', JSON.stringify(response));
    }

    render(){
    return(
        <a>
            <GoogleLogin
                clientId="917745149092-168boso7l59uto2krblq8k1fur1rv2ah.apps.googleusercontent.com"
                render={renderProps => (
                  <CustomButton isGoogleSignIn onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google  sign in</CustomButton>
                )}
                ux_mode="redirect"
                jsSrc="https://apis.google.com/js/api.js"
                redirectUri={`http://localhost:3000/user/profile`}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                // cookiePolicy={'single_host_origin'}
            />
          </a>
    )}
}
// zigvmW5DkAZsvxlZooLQAHj8

const setGoogleUser = googleUser => ({
    type: "SET_GOOGLE_USER",
    payload: googleUser
});

const mapDispatchToProps = dispatch => ({
    setGoogleUser: user =>
      dispatch(setGoogleUser(user))
});

export default connect(null,mapDispatchToProps)(GoogleSignIn)