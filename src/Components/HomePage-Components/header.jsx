import React,{useState} from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import "./styles.css"
import detectBrowserLanguage from 'detect-browser-language'
import Chat from "./Chat_Animantion/Chat-Animation"
const Header =()=> {
  const Dic={
    title:{
      "en-US":{
        "line_1":"Survey Bharo",
        "line_2":"Paisa Kamao"
      },
      "hi":{
        "line_1":"सर्वे भरो",
        "line_2":"पइसा कामो"
      }
    },
    subTitle:{
      "en-US":"Get exciting rewards for sharing your views",
      "hi":"अपने विचारों को साझा करने के लिए रोमांचक पुरस्कार प्राप्त करें"
    },
    login:{
      "en-US":"Login",
      "hi":"लॉग इन करें"
    }
  }
    return (
            <div id="home" class={"row _header"}>
              <div className="col-xs-12 col-md-6">
                <div class="_left">
                <h1>{Dic.title[detectBrowserLanguage()]["line_1"]}</h1>
                <h1>{Dic.title[detectBrowserLanguage()]["line_2"]}</h1>
                <h3>{Dic.subTitle[detectBrowserLanguage()]}</h3>
                <Link to="/login"><CustomButton isGoogleSignIn>{Dic.login[detectBrowserLanguage()]}</CustomButton></Link> 
                </div>
              </div>
              <div class="col-xs-12 col-md-6 _right">
                {/* <img className="_img" src="https://image.winudf.com/v2/image1/aW4uYW5kcm9pZC52Y3JlZGl0X3NjcmVlbl8zXzE1NzA2NzM0NDJfMDk3/screen-3.jpg?fakeurl=1&type=.jpg" alt="SurveyBuddy" /> */}
                <Chat className="_img" />
              </div>
          </div>
    );
  }

export default Header;
