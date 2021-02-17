import React,{useEffect,useState} from 'react'
import "./Footer.css"
import { Button } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
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
import { alertActions, userActions } from '../../_actions';
import { setExcelData } from '../../Redux/ExcelData/excel-data.actions';
import { setLoading } from '../../Redux/Loading/Loading.actions';
import { bindActionCreators } from "redux";
import { requestApiData } from '../../Redux/ApiCalls/ApiCalls.actions';
import { setAlertMessage, setShowUploaderAlerts } from '../../Redux/UploaderAlerts/UploaderAlerts.actions';

const Footer=({setAlertMessage,setShowUploaderAlerts,requestApiData,setLoading,setExcelData,setProgressNumber,progressNumber,row,column,surveyDetails,excelData})=> {

    const dispatch = useDispatch();
    Object.size = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
    const next=()=>{
        if(progressNumber===1 && !excelData){
            // alert("Please Uplaod a file")
            setAlertMessage("Please Upload a file")
            setShowUploaderAlerts(true)
            return
        }
        if(progressNumber===2){
            if(Object.size(column)==0  ){
                // alert("Please Selelct a Column to Continue")
                setAlertMessage("Please Selelct a Column to Continue")
                setShowUploaderAlerts(true)
                return
            }
        }
        if(progressNumber===3 && (surveyDetails==null || surveyDetails?.name?.length==0)){
            // alert("Survey Name Is Required to Continue")

            setAlertMessage("Survey Name Is Required to Continue")
            setShowUploaderAlerts(true)

            return
        }
        progressNumber<=3 && setProgressNumber(progressNumber+1)
        setShowUploaderAlerts(false)
    }

    const previous=()=>{
        progressNumber>1 && setProgressNumber(progressNumber-1)
        setShowUploaderAlerts(false)
    }

    const [creatingProject,setCreatingProject]=useState(true)
    const [gettingProjectDetails,setGettingProjectDetails]=useState(true)
    const [gettingPaginationData,setPaginationData]=useState(false)


    useEffect(() => {
        if(creatingProject===false && localStorage.projectId!==`undefined` && localStorage.projectId?.length>0){
             console.log(`getting project Details`)
               userActions.projectDetails()
             setGettingProjectDetails(false)
        }
    }, [creatingProject])


    const handleColumns=(temp1)=>{
        let col =[]
        Object.keys(temp1).map((item,index)=>{
            if(temp1[item]==true){
                col= [...col,{"coloumn":index,"question":item}]
            }})
            console.log(`modified coolumns`,col)
            return col
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onSubmit= async ()=>{
        setLoading(true)
        const details={
            "name":surveyDetails?.name ? surveyDetails?.name : "test",
            "desc":surveyDetails?.description ? surveyDetails?.description : "test",
            "key":localStorage?.fileKey,
            "coloumns":handleColumns(column),
            "industry":surveyDetails?.industry ? surveyDetails?.industry : "test",
            "type":surveyDetails?.type ? surveyDetails?.type : "test",
            "tags":surveyDetails?.tags ? surveyDetails?.tags : ["test"],
        }
        console.log(details)
        const _token=JSON.parse(localStorage.token).accessToken
        const requestOptions = {
            headers: {'Authorization': `Bearer ${_token}`}
        };
        await axios.post(`${config.apiUrl}/createProject`,(details), requestOptions)
        .then(async data=>{
            console.log(data?.data?.message);
            localStorage.setItem('projectId',data?.data?.projectId)
            console.log(data)

            await delay(200);
            console.log(`waited 5 seconds`)
            // setCreatingProject(false)
            if(localStorage.projectId!==`undefined` && localStorage.projectId?.length>0){
                console.log(`getting project Details`)
                await userActions.projectDetails()
                setGettingProjectDetails(false)
           }
        },err=>console.log(err))

    }
    return (
        <div className="footer">
            <div className="left">
                <Button  variant="contained"  color="primary">CANCEL</Button>
            </div>
            <div className="middle"></div>
            <div className="right">
                <Button color="primary" onClick={previous}>Prev</Button>
                {progressNumber<=3 && <Button variant="contained"  color="primary" onClick={next}>Next</Button>}
                {progressNumber===4 && <Button variant="contained"  color="primary" onClick={onSubmit}>Submit</Button>}
            
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
    setExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),
    setLoading: collectionsMap => dispatch(setLoading(collectionsMap)),
    requestApiData: collectionsMap => dispatch(requestApiData(collectionsMap)),
    setShowUploaderAlerts: collectionsMap => dispatch(setShowUploaderAlerts(collectionsMap)),
    setAlertMessage: collectionsMap => dispatch(setAlertMessage(collectionsMap)),
    
    // bindActionCreators({ requestApiData }, dispatch)
});
const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn,
    excelData:selectExcelData,
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)