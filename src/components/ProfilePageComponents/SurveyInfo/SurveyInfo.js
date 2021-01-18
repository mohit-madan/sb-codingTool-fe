import React from "react"
import "../Info/Info.css"
const SurveyInfo =()=>{
    return(
    <div className="info">
        <div className="info_profile_pic" />
    <div className="info_details">
        <div className="col-xs-12 col-md-6 _inputs">
            <div className="_input">
            <label for="fname">Number of surveys completed</label>
            <input type="text" id="fname" name="firstname" placeholder="345234" disabled/>
            </div>
        </div>
        <div className="col-xs-12 col-md-6 _inputs _inputs2">
            <div className="_input">
            <label for="fname">Total points scored.</label>
            <input type="text" id="fname" name="firstname" placeholder="45675675" disabled />
            </div>

        </div>
    </div>
        </div>
    )
}
export default SurveyInfo;