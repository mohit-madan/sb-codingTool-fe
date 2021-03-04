import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import config from '../../../config'
import { userActions } from '../../../_actions'
import UserProjectsDashboardHeader from '../UserProjectsDashboardHeader/UserProjectsDashboardHeader'
import "./UserProjectsDashboardRightMenu.css"
import {data} from "./data"
import { tableIcons } from './TableIcons'
import MaterialTable from 'material-table'
import DataUsageOutlinedIcon from '@material-ui/icons/DataUsageOutlined';
import { green ,red,blue,grey} from '@material-ui/core/colors';
import AvTimerOutlinedIcon from '@material-ui/icons/AvTimerOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ErrorIcon from '@material-ui/icons/Error';

const UserProjectsDashboardRightMenu=()=> {

    const user = useSelector(state=>state.authentication)
    const projects=user?.user?.user?.projects
    const [tableData,setTableData]=useState([])
    useEffect(async () => {
        let temp = await userActions.projectList()
        console.log(temp)
        setTableData(temp)
    },[])

    const OngoingDueTemplate=({currentDate,endDate})=>{
        let text=""
        if(endDate == undefined){
            text="Ongoing"
        }else if(endDate < currentDate){
            text="Completed"
        }else{
            text="Ongoing"
        }
        return (
            <div className="ongoing-due flex">
                <span >{text}</span>
                <DataUsageOutlinedIcon style={{ color: green[500] , fontSize: 23 }} size="large" />
            </div>
        )
    }

    const MembersTemplate=({tags})=>{
        return(
            <div className="flex">
                {
                    tags?.map((item,index)=>{
                        return(<span >{item}</span>)
                    })
                }
            </div>
        )
    }

    let customCol=[
        {
            title:`Title`,
            field:`name`,
            cellStyle: {
                width:"20%",
                textAlign: "-webkit-center",
            },
        },
        {
            title:`Description`,
            field:`desc`,cellStyle: {
                width:"30%",
                textAlign: "-webkit-center",
            },
        },{
            title:`Members`,
            field:`members`,
            cellStyle: {
                width:"30%",
                textAlign: "-webkit-center",
            },
            render:rowData=>{
                return (<MembersTemplate tags={rowData?.tags}/>)
            }
        },{
            title:"Due",
            field:"due",
            cellStyle: {
                textAlign: "-webkit-center",
                width:"53%",
            },
            render:rowData=>{
                return (<OngoingDueTemplate currentData={rowData?.currentData} endData={rowData?.endData}/>)
            }
        },
    ]

    const goToCodingTool=async(evt,selectedRow)=>{
        console.log(selectedRow)
        localStorage.setItem('projectId',selectedRow?._id)
            if(localStorage.projectId!==`undefined` && localStorage.projectId?.length>0){
                await userActions.projectDetails()
           }
    }

    return (
        <div className="UserProjectsDashboardRightMenu">
            <UserProjectsDashboardHeader  />
            <div className="body" >
             <MaterialTable
                        icons={tableIcons}
                        data={tableData}
                        columns={customCol}
                        title="Projects Dashboard"
                        options={{ headerStyle: { position: 'sticky', top: "-20px"} }}
                        options={{
                            rowStyle: rowData => {
                                console.log(rowData)
                            }
                        }}
                        onRowClick={((evt, selectedRow) => goToCodingTool(evt,selectedRow))}
                        options={{
                          selection: false,
                          exportButton: true,
                          filtering: false,
                          grouping: false,
                          search: true,
                          sorting: true,
                          paging:false
                        }}
                        localization={{
                          pagination: {
                            labelDisplayedRows: '{from}-{to} of {count}',
                            labelRowsSelect: 'Rows Per Page',
                            labelRowsPerPage: 'Rows Per Page',
                            firstAriaLabel: 'First Page',
                            firstTooltip: 'First Page',
                            previousAriaLabel: 'Previous Page',
                            previousTooltip: 'Previous Page',
                            nextAriaLabel: 'Next Page',
                            nextTooltip: 'Next Page',
                            lastAriaLabel: 'Last Page',
                            lastTooltip: 'Last Page'
                          }
                        }}
                        
                    />
            </div>
        </div>
    )
}

export default UserProjectsDashboardRightMenu
