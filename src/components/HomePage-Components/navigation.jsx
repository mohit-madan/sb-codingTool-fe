import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component"
import "./styles.css"
import detectBrowserLanguage from 'detect-browser-language'
import "./Navigation.css"

const Navigation =({showLoginButton,showSignUpButton})=>{
  const [show, handleshow] = useState(true)
  
  useEffect(() => {
    window?.addEventListener("scroll", () => {
      if (window?.scrollY > 100) {
        handleshow(false)
      } else handleshow(true);
    });
    return () => {
      window?.removeEventListener('scroll', () => {
        if (window?.scrollY < 100) {
          handleshow(true);
        } else handleshow(false);
      });
    }
  },[]);
  const navigationDic={
    title:{
      "en-US":"SurveyBuddy",
      "hi":"सर्वे बडी"
    },
    home:{
      "en-US":"Home",
      "hi":"होम"
    },
    about_us:{
      "en-US":"About Us",
      "hi":"हमारे बारे में"
    },
    login:{
      "en-US":"Login",
      "hi":"लॉग इन करें"
    },
    Sign_up:{
      "en-US":"Sign Up",
      "hi":"साइन अप करें"
    }
  }
    return (
      <nav id="menu" className={`navbar navbar-default navbar-fixed-top width ${show && "nav_white"}`}>
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="home_link navbar-brand page-scroll survey_buddy " href="">
              {/* <Link className="home_link" to="/"> */}
                {navigationDic.title[detectBrowserLanguage()]}
              {/* </Link> */}
            </a>
            {" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right options">
              <li>
                {/* <a href="" className="page-scroll"> */}
                  <Link to="/">{navigationDic.home[detectBrowserLanguage()]}</Link>
                {/* </a> */}
              </li>
              <li>
                {/* <a href="" className="page-scroll"> */}
                 <Link to="/about">{navigationDic.about_us[detectBrowserLanguage()]}</Link>
                {/* </a> */}
              </li>
              {showLoginButton && <li>
                {/* <a href="" className="page-scroll"> */}
                <Link to="/login"><CustomButton>{navigationDic.login[detectBrowserLanguage()]}</CustomButton></Link> 
                {/* </a> */}
              </li>}
              {showSignUpButton && <li>
                {/* <a href="" className="page-scroll"> */}
                <Link to="/register"><CustomButton isGoogleSignIn>{navigationDic.Sign_up[detectBrowserLanguage()]}</CustomButton></Link> 
                {/* </a> */}
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }


export default Navigation;
