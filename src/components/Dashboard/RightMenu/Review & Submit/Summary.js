import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { setProgressNumber } from "../../../../Redux/Progress-number/progress.actions"
import { selectColumn, selectFilterColumn, selectRow } from "../../../../Redux/SelectedRowandColumn/tableSelections.selectors"
import { selectSurveyDetails } from "../../../../Redux/SurveyDetails/survey-details.selectors"
import "./Summary.css"

const Summary=({surveyDetails,column, filterColumn,setProgressNumber})=>{
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
                    <p>1</p>
                </div>
                <p>INDUSTRY:<span>{surveyDetails?.industry}</span></p>
                <p>SURVEY TYPE: <span>{surveyDetails?.type}</span></p>
                <h5>{surveyDetails?.description}</h5>
            </div>
            <div className="summary_selections">
                <div className="summary_selection">
                    <div className="summary_selection_heading">
                        <p>HEADER COLUMN</p>
                        <p className="edit" onClick={()=>setProgressNumber(2)}>Edit</p>
                    </div>
                    {column && Object.keys(column).map((item,index) => {
                            if(column[item]){
                                return(
                                    <h5 key={index}>{`${Object.keys(column)[index]}`}</h5>
                                )
                            }
                    })}
                </div>
                <div className="summary_selection">
                <div className="summary_selection_heading">
                        <p>FILTER COLUMN</p>
                        <p className="edit" onClick={()=>setProgressNumber(2)}>Edit</p>
                    </div>
                    {filterColumn && Object.keys(filterColumn).map((item,index) => {
                            if(filterColumn[item]){
                                return(
                                    <h5 key={index}>{`${Object.keys(filterColumn)[index]}`}</h5>
                                )
                            }
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn,
    filterColumn:selectFilterColumn,
})
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Summary)