import React,{useEffect,useState} from 'react'
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
import { setLoading } from '../../Redux/Loading/Loading.actions';

const Footer=({setLoading,setExcelData,setProgressNumber,progressNumber,row,column,surveyDetails,excelData})=> {

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
            console.log(excel)
        }
        console.log(excel)
    }, [excel])

    const [creatingProject,setCreatingProject]=useState(true)
    const [gettingProjectDetails,setGettingProjectDetails]=useState(true)
    const [gettingPaginationData,setPaginationData]=useState(false)

    useEffect( async () => {
        if(gettingProjectDetails===false && localStorage.listOfQuestion!==`undefined` &&localStorage.listOfQuestion?.length !==0){
            console.log(`getting pagination Data`)
            setPaginationData(true)
            await userActions.responsePagination({pageNumber:1,limit:20,push:true})
        }
    }, [gettingProjectDetails])
    useEffect(  () => {
        if(gettingProjectDetails===false && localStorage.listOfQuestion!==`undefined` &&localStorage.listOfQuestion?.length !==0){
            console.log(`getting pagination Data`)
            setPaginationData(true)
             userActions.responsePagination({pageNumber:1,limit:20,push:true})
        }
    }, [gettingProjectDetails])


    useEffect(async() => {
        if(creatingProject===false && localStorage.projectId!==`undefined` && localStorage.projectId?.length>0){
             console.log(`getting project Details`)
              await userActions.projectDetails()
             setGettingProjectDetails(false)
        }
    }, [creatingProject])


    const handleColumns=(temp1)=>{
        let col =[]
        Object.keys(temp1).map((item,index)=>{
            if(temp1[item]==true){
                col= [...col,{"coloumn":index,"question":item}]
            }})
            return col
    }


    const onSubmit= async ()=>{
        setLoading(true)
        const details={
            "name":surveyDetails?.name ? surveyDetails?.name : "test",
            "desc":surveyDetails?.description ? surveyDetails?.description : "test",
            "key":localStorage?.fileKey,
            "coloumns":handleColumns(column),
            "industry":surveyDetails?.industry ? surveyDetails?.industry : "test",
            "type":surveyDetails?.type ? surveyDetails?.type : "test",
            "tags":(surveyDetails?.tags ? surveyDetails?.tags : ["test"]),
        }
        const _token=JSON.parse(localStorage.token).accessToken
        const requestOptions = {
            headers: {'Authorization': `Bearer ${_token}`}
        };
        await axios.post(`${config.apiUrl}/createProject`,(details), requestOptions)
        .then(data=>{
            console.log(data?.data?.message);
            localStorage.setItem('projectId',data?.data?.projectId)
            console.log(data)
            setCreatingProject(false)
        },err=>console.log(err))
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
    setLoading: collectionsMap => dispatch(setLoading(collectionsMap)),
});
const mapStateToProps=createStructuredSelector({
    surveyDetails:selectSurveyDetails,
    row:selectRow,
    column:selectColumn,
    excelData:selectExcelData,
})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)