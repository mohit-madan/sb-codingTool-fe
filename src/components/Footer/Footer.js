import React from 'react'
import "./Footer.css"
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {setProgressNumber} from "../../Redux/Progress-number/progress.actions.js"
import { selectColumn, selectRow } from '../../Redux/SelectedRowandColumn/tableSelections.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSurveyDetails } from '../../Redux/SurveyDetails/survey-details.selectors';
import { selectExcelData } from '../../Redux/ExcelData/excel-data.selectors';

const Footer=({setProgressNumber,progressNumber,row,column,surveyDetails,excelData})=> {
    console.log(surveyDetails)
    const next=()=>{
        if(progressNumber===1 && !excelData){
            alert("Please Uplaod a file")
            return
        }
        if(progressNumber===2){
            if(!row ){
                alert("Please Selelct a Row to Continue")
                return
            }
            if(!column){
                alert("Please Selelct a Column to Continue")
                return
            }
        }
        if(progressNumber===4 && !surveyDetails?.description && !surveyDetails?.name && !surveyDetails?.industry && !surveyDetails?.type){
            alert("Please fill all the fields to continue")
            return
        }
        progressNumber<=4 && setProgressNumber(progressNumber+1)
    }
    return (
        <div className="footer">
            <div className="left">
                <Button  variant="contained"  color="primary">CANCEL</Button>
            </div>
            <div className="middle"></div>
            <div className="right">
                <Button color="primary" onClick={()=>{progressNumber>1 && setProgressNumber(progressNumber-1)}}>Prev</Button>
                <Button variant="contained"  color="primary" onClick={next}>Next</Button>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),

});
const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn,
    excelData:selectExcelData,
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)