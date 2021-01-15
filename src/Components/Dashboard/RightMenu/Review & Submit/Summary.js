import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectSurveyDetails } from "../../../../Redux/SurveyDetails/survey-details.selectors"
import "./Summary.css"
const Summary=({surveyDetails})=>{
    console.log(surveyDetails)
    return(
        <div className="summary">
            <h1>Upload Summary</h1>
            <div className="summary_subheading">
                <p>Survey</p>
                <p className="edit">Edit</p>
            </div>
            <div className='survey_summary'>
                <div className='survey_summary_name'>
                    <p>{surveyDetails?.name}</p>
                    <p>0</p>
                </div>
                <p>INDUSTRY:<span>{surveyDetails?.industry}</span></p>
                <p>SURVEY TYPE: <span>{surveyDetails?.type}</span></p>
                <h5>{surveyDetails?.description}</h5>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
})
export default connect(mapStateToProps)(Summary)