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

    const OngoingDueTemplate=()=>{
        return (
            <div className="ongoing-due flex">
                <span >Ongoing</span>
                <DataUsageOutlinedIcon style={{ color: green[500] , fontSize: 23 }} size="large" />
            </div>
        )
    }

    const ActivityTemplate=()=>{
        return(
            <div className="ongoing-due flex" >
                {true ? <AvTimerOutlinedIcon style={{color: red[500] , fontSize: 23 }}/> : <AvTimerOutlinedIcon style={{color: grey[500] , fontSize: 23 }}/>}
                {true ? <WhatshotIcon style={{color: red[500] , fontSize: 23 }}/> : <WhatshotIcon style={{color: grey[500] , fontSize: 23 }}/>}
                {true ? <ErrorIcon style={{color: red[500] , fontSize: 23 }}/> : <ErrorIcon style={{color: grey[500] , fontSize: 23 }}/>}
            </div>
        )
    }

    let customCol=[
        {
            title:`Title`,
            field:`title`,
            cellStyle: {
                width:"20%",
            },
        },
        {
            title:`Description`,
            field:`desc`,cellStyle: {
                width:"40%",
            },
        },{
            title:`Members`,
            field:`members`,
            cellStyle: {
                width:"7%",
            },
        },{
            title:"Activity",
            field:"activity",cellStyle: {
                textAlign: "-webkit-center",
                width:"14%",
            },
            render:rowData=>{
                return (<ActivityTemplate/>)
            }
        },{
            title:"Due",
            field:"due",
            // cellStyle: {
            //     textAlign: "-webkit-center",
            //     width:"23%",
            // },
            render:rowData=>{
                return (<OngoingDueTemplate/>)
            }
        },
    ]

    return (
        <div className="UserProjectsDashboardRightMenu">
            <UserProjectsDashboardHeader  />
            <div className="body" >
             <MaterialTable
                        icons={tableIcons}
                        data={data}
                        columns={customCol}
                        title="Coding Tool"
                        options={{ headerStyle: { position: 'sticky', top: "-20px"} }}
                        options={{
                            rowStyle: rowData => {
                                console.log(rowData)
                            }
                        }}
                        onRowClick={((evt, selectedRow) => console.log(evt,selectedRow))}
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
