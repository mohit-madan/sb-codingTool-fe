import React,{useEffect,useState} from 'react'
import { connect, useSelector } from 'react-redux'
import { userActions } from '../../../_actions'
import UserProjectsDashboardHeader from '../UserProjectsDashboardHeader/UserProjectsDashboardHeader'
import "./UserProjectsDashboardRightMenu.css"
import { tableIcons } from './TableIcons'
import MaterialTable from 'material-table'
import DataUsageOutlinedIcon from '@material-ui/icons/DataUsageOutlined';
import { green } from '@material-ui/core/colors';
import { history } from '../../../_helpers'
import { setQuestionNumber } from '../../../Redux/CodeitData/codeit-data.actions'

const UserProjectsDashboardRightMenu=({setQuestionNumber})=> {

    const user = useSelector(state=>state.authentication)
    const projects=user?.user?.user?.projects
    const [tableData,setTableData]=useState([])
    useEffect(async () => {
        let temp = await userActions.projectList()
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
            <div className="flex members_template">
                {
                    tags?.map((item,index)=>{
                        return(<p >{item?.email}</p>)
                    })
                }
            </div>
        )
    }
    const DateTemplate=({date})=>{
        return(
            <div className="flex members_template">
                {
                    date.split("T")[0]
                }
            </div>
        )
    }

    let customCol=[
        {
            title:`Date Created`,
            field:`CreationDate`,
            cellStyle: {
                width:"9%",
                textAlign: "-webkit-center",
            },
            render:rowData=>{
                return (<DateTemplate date={rowData.CreationDate}/>)
            }
        },
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
                return (<MembersTemplate tags={rowData?.assignedTo}/>)
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
        setQuestionNumber(0)
        localStorage.setItem('projectId',selectedRow?._id)
        if(localStorage.projectId!==undefined && localStorage.projectId?.length>0){
            await userActions.projectDetails()
            if(localStorage.listOfQuestion!==undefined){
                history.push(`/tool`)
            }
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
                        onRowClick={((evt, selectedRow) => goToCodingTool(evt,selectedRow))}
                        options={{
                          selection: false,
                          exportButton: true,
                          filtering: false,
                          grouping: false,
                          search: true,
                          sorting: true,
                          paging:false,
                          rowStyle: (row, index) => ({
                            backgroundColor: (index % 2 == 0) ? '#EEE' : '#FFF'
                          })
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
const mapDispatchToProps = dispatch => ({
    setQuestionNumber: collectionsMap => dispatch(setQuestionNumber(collectionsMap)),
});
export default connect(null,mapDispatchToProps)(UserProjectsDashboardRightMenu)
