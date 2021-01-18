import React from "react"
import { Link } from "react-router-dom"
import "./styles.css"
import detectBrowserLanguage from 'detect-browser-language'


const Footer =()=>{
    const footerDic={
        home:{
          "en-US":"Home",
          "hi":"होम"
        },
        about_us:{
          "en-US":"About Us",
          "hi":"हमारे बारे में"
        },
        contact:{
            "en-US":"Contact Us",
            "hi":"संपर्क करें"
        },
        facebook:{
            "en-US":"Facebook",
            "hi":"फेसबुक"
        },
        copyright:{
            "en-US":"Copyright 2020, Survey Buddy Inc.",
            "hi":"कॉपीराइट 2020, सर्वे बडी इंक।"
        }
      }
    return(
    <div class="footer row _header">
        <div className="row">
            <div className=" col-md-4 col-sm-6">
                <ul><a href="#home">
                    <li>{footerDic.home[detectBrowserLanguage()]}</li></a><br/>
                </ul>
            </div>
            <div className=" col-md-4 col-sm-6">
                <ul><a><Link to="/about">
                    <li>{footerDic.about_us[detectBrowserLanguage()]}</li></Link></a><br/>
                </ul>
            </div>
            <div className=" col-md-4 col-sm-6">
            <ul>
            <a><Link to="/contact"><li>{footerDic.contact[detectBrowserLanguage()]}</li></Link></a>
                </ul>
            </div>
        </div> 
        <div className="footer_end">
            <div>
                © {footerDic.copyright[detectBrowserLanguage()]}
            </div>
            <div>
                <a>{footerDic.facebook[detectBrowserLanguage()]}</a>
            </div>
        </div>
    </div>
)
}
export default Footer