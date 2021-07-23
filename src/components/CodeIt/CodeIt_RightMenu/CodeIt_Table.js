  
import React,{useState,useEffect} from "react"
import { connect } from "react-redux";
// import ReactTable from 'react-table-6';
// import 'react-table-6/react-table.css';
import { createStructuredSelector } from "reselect";
import { selectExcelData } from "../../../Redux/ExcelData/excel-data.selectors.js";
import {tableIcons } from "./TableIcons.js"
import MaterialTable from "material-table"
import { RemoveCircleOutlineOutlined as RemoveCircleIcon } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { setRow } from "../../../Redux/SelectedRowandColumn/tableSelections.actions.js";
import { setExcelData, setExcelDataColumns } from "../../../Redux/ExcelData/excel-data.actions.js";
import $ from "jquery"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { decreaseNumberOfInputsGreaterThan2, decreaseProgressLength, increaseNumberOfInputsGreaterThan2, increaseProgressLength, setCodes, setFilteredData, setSelectedRows } from "../../../Redux/CodeitData/codeit-data.actions.js";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { socket } from "../../../config"
import axios from "axios"
import { selectShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.selectors.js";
import { selectContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.selectors.js";
import { ContextMenu, MenuItem as ContextMenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { userActions } from "../../../_actions/index.js";
import { selectFilters ,selectSubmitFilters} from "../../../Redux/Filters/Filters.selectors.js";
import { setSubmitFilters } from "../../../Redux/Filters/Filters.actions.js";
import { selectFilteredData } from "../../../Redux/CodeitData/codeit-data.selectors.js";
import hotkeys from 'hotkeys-js';


const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      paddingRight:'20px',
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const attributes = {
    className: 'custom-root',
    // disabledClassName: 'custom-disabled',
    // dividerClassName: 'custom-divider',
    // selectedClassName: 'custom-selected'
  }
const ContextMenuSkin=({slice,select,data,handleClick})=>{
    var __num= Math.floor(Math.random() * 101)  
    // slice && console.log(data)
    let temp1=data
    let start=0
    return (
        <div >
         <ContextMenuTrigger id={__num.toString()}>
            {slice && temp1?.indices && temp1?.indices.map(item =>{
                return(
                        <p>
                            {temp1.desc.slice(start,item.fIndex)}
                        
                            <span style={{color:"red"}}>{temp1.desc.slice(item.fIndex,item.lIndex+1)}</span>

                            <p style={{display:"none"}}>{start=item.lIndex+2}</p>
                        </p>
                )
            })
            }
            {slice && !data?.indices && <p style={{textAlign: "center"}} >{select}</p> }
            {!slice && <p style={{textAlign: "center"}} >{select}</p>}
            </ContextMenuTrigger>
            <ContextMenu id={__num.toString()}>
                <ContextMenuItem
                  className="input_value_in_dropdown"
                  data={{ action: [data] }}
                  onClick={handleClick}
                  attributes={attributes}
                >
                 Sample Context Item
                </ContextMenuItem>
            </ContextMenu>
        </div>
    )
}
const CodeItTable =({filteredData,setFilteredData,setSubmitFiltersInRedux,selectSubmitFiltersFromRedux,selectFiltersFromRedux,setExcelData,selectContainsKeyword,selectShowCodedAs,excelData,setRow,setExcelDataColumns,decreaseNumberOfInputsGreaterThan2,increaseNumberOfInputsGreaterThan2,setCodesinRedux,decreaseProgressLength,increaseProgressLength})=>{

        let customCol=[
        {
            title:`ID`,
            field:`resNum`,
            cellStyle: {
                width:"2%",
            },
            render: rowData => <ContextMenuSkin select={rowData?.resNum} data={rowData} />
        },
        {
            title:`desc`,
            field:`desc`,cellStyle: {
                width:"60%",
            },
            render: rowData => <ContextMenuSkin slice={true} select={rowData?.desc} data={rowData} />
        },{
            title:`length`,
            field:`length`,
            cellStyle: {
                width:"2%",
            },
            render: rowData => <ContextMenuSkin select={rowData?.length} data={rowData} />
        },{
            title:"Codes",
            field:"Codes",cellStyle: {
                textAlign: "-webkit-center",
                width:"23%",
            },
            render: rowData => <input onChange={handleCodes(rowData)} value={codes[rowData?.resNum]} type="text"/>
        },
    ]

    let tempData=(JSON.parse(localStorage.excelData))

    
    let transformedData=tempData
    transformedData.map((item,index)=>{
        let keys = Object.keys(transformedData[index])
        if(item[keys[0]]?.length > 30){
            item[keys[0]]=`${item[keys[0]].slice(0,30)} ....`
        }
    })

    let mapper={}
    let i=0
    for ( i=0 ; i<transformedData?.length;i++){mapper[i]=[]}

    const [keywords,setkeywords]=useState(mapper)
    const [codes,setCodes]=useState(mapper)
    var prev=0,next=0
    useEffect(()=>{
        socket.once('input-box',({num ,value}) => {
            if(prev<next){
                setCodes({...codes,[num] : value})
                prev=prev+1
            }
        })
        socket.once('keywords', ({num ,value}) => {
            if(keywords[num]!==value){
                setkeywords({...keywords,[num] : value})
            }
        })
    })

  const handleCodes=rowData=>(event)=>{
    let value =event.target.value;
    let num=rowData?.resNum
    next=next+2
    socket.emit('input-box',{num,value})
  }
  

        const ChooseData =()=>{
            if(filteredData?.length==0){
                if(selectContainsKeyword || selectShowCodedAs){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
        }
        useEffect(() => {
            ChooseData()
        }, [selectContainsKeyword,filteredData])

        var _index=[]
        const handleRowSelections =(rows)=>{
            _index.map((item,index)=>{
                if($(`tr:nth-child(${(item+1)})`).hasClass(`selectedRow`)){
                    $(`tr:nth-child(${(item+1)})`).removeClass(`selectedRow`,function() {
                        console.log(`inside`)
                      });
                }
            })
            _index.length =0
            rows.map((item,index)=>{
                _index.push(item.tableData.id)
                $(`tr:nth-child(${(item.tableData.id+1)})`).removeClass("selectedRow");
            })
            _index.map((item,index)=>{
                $(`tr:nth-child(${(item+1)})`).addClass("selectedRow");
                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.MuiToolbar-root.MuiToolbar-regular.MTableToolbar-root-20.MTableToolbar-highlight-21.MuiToolbar-gutters > div.MTableToolbar-title-24 > h6")
                .css("color","white")
            })
            if(_index?.length ===0){
                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.MuiToolbar-root.MuiToolbar-regular.MTableToolbar-root-20.MuiToolbar-gutters > div.MTableToolbar-title-24 > h6")
                .css("color","")
            }
        }

        let data=null
        const [pageCount,setPageCount]=useState(2)
        const [filteredPageCount,setFilteredPageCount]=useState(2)
      

        const getFiltersArray=(_string)=>{
            let filters =[]
            if(selectFiltersFromRedux?.match===`Exact Match`){
                filters.push({"filter":6,"pattern":_string})
            }else if(selectFiltersFromRedux?.match===`Contains In`){
                filters.push({"filter":5,"pattern":_string})
            }
            console.log(filters)
            return filters
        }

        useEffect(() => {
            const intervalId = setInterval(() => {  //assign interval to a variable to clear it.

                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.Component-horizontalScrollContainer-27 > div > div > div").css("height", "50vh");
                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.Component-horizontalScrollContainer-27 > div > div").css("margin-top", "-10px");

            },1)    // , 1000*1
              return () => clearInterval(intervalId); //This is important
        })

        // useEffect(() => {
            // $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.Component-horizontalScrollContainer-27 > div > div").scroll(handleScroll)
            
        // })
        hotkeys('ctrl+f, command+f', function(e) {
            e.preventDefault()
            $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.MuiToolbar-root.MuiToolbar-regular.MTableToolbar-root-20.MuiToolbar-gutters > div.MuiFormControl-root.MuiTextField-root.MTableToolbar-searchField-25 > div > input")
            .focus();
        });

        const [selectedRow, setSelectedRow] = useState(null);
        const constPathColors = {
            1: '#FFFF00',
            2: '#FFFF33',
            3: '#FFFF66',
            4: '#FFFF99',
            5: '#FFFFCC'
          };
         return(
            <div className="table-container">
                    {filteredData!==null && <MaterialTable
                        // style={{"maxHeight":"480px","overflowY":"auto"}}
                        icons={tableIcons}
                        data={filteredData}
                        columns={customCol}
                        title="Coding Tool"
                        // options={{
                        //     rowStyle: rowData => ({
                        //       backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                        //     }),
                        // }}
                        // options={{ headerStyle: { position: 'sticky', top: "-20px"} }}
                        onSelectionChange={(handleRowSelections)}
                        options={{
                            rowStyle: rowData => {
                                console.log(rowData)
                            }
                        }}
                        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                        options={{
                          selection: true,
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
                        
                    />}
            </div>
         )
     }

const mapStateToProps=createStructuredSelector({
    excelData:selectExcelData,
    selectShowCodedAs:selectShowCodedAs,
    selectContainsKeyword:selectContainsKeyword,
    selectFiltersFromRedux:selectFilters,
    selectSubmitFiltersFromRedux:selectSubmitFilters,
    filteredData:selectFilteredData,
})
const mapDispatchToProps = dispatch => ({
    setRow: collectionsMap => dispatch(setRow(collectionsMap)),
    setExcelDataColumns: collectionsMap => dispatch(setExcelDataColumns(collectionsMap)),
    setExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),
    setSubmitFiltersInRedux: collectionsMap => dispatch(setSubmitFilters(collectionsMap)),
    setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
    
});
export default connect(mapStateToProps,mapDispatchToProps)(CodeItTable)
