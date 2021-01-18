import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { setProgressNumber } from "../../../../Redux/Progress-number/progress.actions"
import { selectColumn, selectRow } from "../../../../Redux/SelectedRowandColumn/tableSelections.selectors"
import { selectSurveyDetails } from "../../../../Redux/SurveyDetails/survey-details.selectors"
import "./Summary.css"
const Summary=({surveyDetails,row,column,setProgressNumber})=>{
    console.log(row,column)
    return(
        <div className="summary">
            <h1>Upload Summary</h1>
            <div className="summary_subheading">
                <p>Survey</p>
                <p className="edit" onClick={()=>setProgressNumber(1)}>Edit</p>
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
            <div className="summary_selections">
                <div className="summary_selection">
                    <div className="summary_selection_heading">
                        <p>HEADER ROW</p>
                        <p className="edit" onClick={()=>setProgressNumber(2)}>Edit</p>
                    </div>
                    <h5>Row {row?.tableData?.id}</h5>
                </div>
                <div className="summary_selection">
                    <div className="summary_selection_heading">
                        <p>HEADER COLUMN</p>
                        <p className="edit" onClick={()=>setProgressNumber(2)}>Edit</p>
                    </div>
                    <h5>Row {column}</h5>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn
})
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Summary)