import React from 'react'
import "./Footer.css"
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {setProgressNumber} from "../../Redux/Progress-number/progress.actions.js"
import { selectColumn, selectFilterColumn, selectRow } from '../../Redux/SelectedRowandColumn/tableSelections.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSurveyDetails } from '../../Redux/SurveyDetails/survey-details.selectors';
import { selectExcelData, selectExcelDataColumns } from '../../Redux/ExcelData/excel-data.selectors';
import axios from 'axios';
import config from '../../config';
import {history} from "../../_helpers"
import { userActions } from '../../_actions';
import { setExcelData } from '../../Redux/ExcelData/excel-data.actions';
import { setLoading } from '../../Redux/Loading/Loading.actions';
import { setAlertMessage, setShowUploaderAlerts } from '../../Redux/UploaderAlerts/UploaderAlerts.actions';

const Footer=({selectExcelDataColumns,setAlertMessage,setShowUploaderAlerts,setLoading,setExcelData,setProgressNumber,
    progressNumber,row,column, filterColumn,surveyDetails,excelData})=> {

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
            setAlertMessage("Please Upload a file")
            setShowUploaderAlerts(true)
            return
        }
        if(progressNumber===2){
            var result = true;
            for(var i in column){
                if(column[i]===true){
                    result=false;
                    break;
                }
            }
            if(result){
                setAlertMessage("Please Selelct a Column to Continue")
                setShowUploaderAlerts(true)
                return
            }
        }
        
        if(progressNumber===4 && (surveyDetails==null || surveyDetails?.name?.length==0)){
            setAlertMessage("Survey Name Is Required to Continue")
            setShowUploaderAlerts(true)
            return
        }
        progressNumber<=4 && setProgressNumber(progressNumber+1)
        setShowUploaderAlerts(false)
    }

    const previous=()=>{
        progressNumber>1 && setProgressNumber(progressNumber-1)
        setShowUploaderAlerts(false)
    }


    const handleColumns=(temp1)=>{
        const getIndex=(name)=>{
            let i=100
            selectExcelDataColumns?.map((item,index)=>{
                if(item?.title==name){
                    i=index
                }
            })
            return i
        }
        let col =[]
        Object.keys(temp1).map((item,index)=>{
            if(temp1[item]==true){
                col= [...col,{"column":getIndex(item),"question":item}]
            }})
            return col
    }

    const handleTags=(tags)=>{
        let temp=[]
        if(tags?.length >0){
            tags?.map(item=>{
                temp.push(item._id)
            })
        }
        return temp
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onSubmit= async ()=>{
        setLoading(true)
        const details={
            "name":surveyDetails?.name ? surveyDetails?.name : "test",
            "desc":surveyDetails?.description ? surveyDetails?.description : "test",
            "key":localStorage?.fileKey,
            "columns":handleColumns(column),
            "filterColumns":handleColumns(filterColumn),
            "industry":surveyDetails?.industry ? surveyDetails?.industry : "test",
            "type":surveyDetails?.type ? surveyDetails?.type : "test",
            "tags":(surveyDetails?.tags) ? handleTags(surveyDetails?.tags) : ["test"],
        }
        const _token=JSON.parse(localStorage.token).accessToken
        const requestOptions = {
            headers: {'Authorization': `Bearer ${_token}`}
        };
        await axios.post(`${config.apiUrl}/createProject`,(details), requestOptions)
        .then(async data=>{
            
            localStorage.setItem('projectId',data?.data?.projectId)
            await delay(2000);
            if(localStorage.projectId!==undefined && localStorage.projectId?.length>0){
                await userActions.projectDetails()
                history.push("/tool")
                setLoading(false)
                setProgressNumber(1)
                setExcelData(null)
           }
        })
        .catch(err=>{
            if(err.response.status==400){
                setLoading(false)
                alert(err.response.data.message)
            }
        })
    }
    return (
        <div className="footer">
            <div className="left">
                <Button  variant="contained"  color="primary">CANCEL</Button>
            </div>
            <div className="middle"></div>
            <div className="right">
                <Button color="primary" onClick={previous}>Prev</Button>
                {progressNumber<=4 && <Button variant="contained"  color="primary" onClick={next}>Next</Button>}
                {progressNumber===5 && <Button variant="contained"  color="primary" onClick={onSubmit}>Submit</Button>}
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
    setExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),
    setLoading: collectionsMap => dispatch(setLoading(collectionsMap)),
    setShowUploaderAlerts: collectionsMap => dispatch(setShowUploaderAlerts(collectionsMap)),
    setAlertMessage: collectionsMap => dispatch(setAlertMessage(collectionsMap)),
});
const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn,
    filterColumn:selectFilterColumn,
    excelData:selectExcelData,
    selectExcelDataColumns:selectExcelDataColumns,

})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)