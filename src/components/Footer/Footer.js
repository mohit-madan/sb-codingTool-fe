import React,{useEffect} from 'react'
import "./Footer.css"
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {setProgressNumber} from "../../Redux/Progress-number/progress.actions.js"
import { selectColumn, selectRow } from '../../Redux/SelectedRowandColumn/tableSelections.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSurveyDetails } from '../../Redux/SurveyDetails/survey-details.selectors';
import { selectExcelData } from '../../Redux/ExcelData/excel-data.selectors';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { handleResponse } from '../../services';
import {history} from "../../_helpers"
import { userActions } from '../../_actions';
import { setExcelData } from '../../Redux/ExcelData/excel-data.actions';

const Footer=({setExcelData,setProgressNumber,progressNumber,row,column,surveyDetails,excelData})=> {

    // {
    //     "projectId":"601a4556fb38610c70c688ba",
    //     "questionId":"601a4577fb38610c70c688bb"
    // }

    const next=()=>{
        if(progressNumber===1 && !excelData){
            alert("Please Uplaod a file")
            return
        }
        if(progressNumber===2){
            if(!column){
                alert("Please Selelct a Column to Continue")
                return
            }
        }
        if(progressNumber===3 && !surveyDetails?.description && !surveyDetails?.name && !surveyDetails?.industry && !surveyDetails?.type){
            alert("Please fill all the fields to continue")
            return
        }
        progressNumber<=3 && setProgressNumber(progressNumber+1)
    }
    const [excel,setExcel] = React.useState(null) 
    useEffect(() => {
        if(typeof(excel)==`object` && excel?.length > 0){
            history.push('/tool')
        }
        console.log(excel)
    }, [excel])
    const onSubmit=async ()=>{
        // const details={
        //     "name":surveyDetails.name,
        //     "desc":surveyDetails.description,
        //     "key":localStorage.fileKey
        // }
        const details={
            "name":`surveyDetails.name`,
            "desc":`surveyDetails.descriptio`,
            "key":`localStorage.fileKey`
        }
        const _token=JSON.parse(localStorage.token).accessToken
        const requestOptions = {
            headers: {'Authorization': `Bearer ${_token}`}
        };
         axios.post(`${config.apiUrl}/createProject`,(details), requestOptions)
        .then(data=>{
            alert(data?.data?.message);
            // history.push('/tool')
            localStorage.setItem('projectId',data?.data?.project?._id)
            console.log(data)
        })
        .catch(err=>console.log(err))
        // history.push('/tool')
        let dataResp = await userActions.responsePagination({pageNumber:1,limit:20})
        setExcel(dataResp)
    }
    return (
        <div className="footer">
            <div className="left">
                <Button  variant="contained"  color="primary">CANCEL</Button>
            </div>
            <div className="middle"></div>
            <div className="right">
                <Button color="primary" onClick={()=>{progressNumber>1 && setProgressNumber(progressNumber-1)}}>Prev</Button>
                {progressNumber<=3 && <Button variant="contained"  color="primary" onClick={next}>Next</Button>}
                {progressNumber===4 && <Button variant="contained"  color="primary" onClick={onSubmit}>Submit</Button>}
            
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
    setExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),

});
const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn,
    excelData:selectExcelData,
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)