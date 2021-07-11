import React,{useState,useEffect} from "react"
import { connect } from "react-redux";
// import ReactTable from 'react-table-6';
// import 'react-table-6/react-table.css';
import { createStructuredSelector } from "reselect";
import { selectExcelData, selectExcelDataHeaders } from "../../../Redux/ExcelData/excel-data.selectors.js";
import {tableIcons } from "./TableIcons.js"
import MaterialTable from "material-table"
import { RemoveCircleOutlineOutlined as RemoveCircleIcon } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { setRow } from "../../../Redux/SelectedRowandColumn/tableSelections.actions.js";
import { setExcelDataColumns } from "../../../Redux/ExcelData/excel-data.actions.js";

const Tab =({excelData,setRow, header_list,setExcelDataColumns})=>{
    const [selectedRow,setSelectedRow]=useState(null)
    // console.log(JSON.parse(excelData));
        const tempData=JSON.parse(excelData)
        let col=[]
        let columns_titles=[]
        let i
        // for(i in k){ col= [...col,{Header:k[i],accessor:k[i]}]}
        for(i in header_list){ col= [...col,{title:header_list[i],field:header_list[i]}]}
        for(i in header_list){ columns_titles= [...columns_titles,{title:header_list[i]}]}
        setExcelDataColumns(columns_titles)
        // console.log(col)
        // useEffect(() => {
        //     for(i in k){ col= [...col,{title:k[i],field:k[i]}]}
        //     console.log(col)
        // }, [])
         return(
            <MaterialTable
                icons={tableIcons}
                // data={(Array.prototype.slice.call(tempData,tempData.length-30))}
                // data={tempData}
                data={Object.entries(tempData).slice(0,30).map(entry => entry[1])}

                columns={col}
                title="Demo"
                // actions = {[
                //     {
                //       icon: () => <AddCircleIcon />,
                //       tooltip: <p>Select this Row</p>,
                //       onClick: (event, rowData) => {setSelectedRow((rowData),console.log(selectedRow));;setRow(rowData)},
                //       position: "row"
                //     }
                //   ]}
                options={{
                    selection: false,
                    exportButton: true,
                    filtering: false,
                    grouping: false,
                    search: false,
                    sorting: true,
                    paging:false
                }}
                onSelectionChange={(rows) => {console.log(rows)}}
            />
         )
     }

const mapStateToProps=createStructuredSelector({
    excelData:selectExcelData,
    header_list:selectExcelDataHeaders,
})
const mapDispatchToProps = dispatch => ({
    // setRow: collectionsMap => dispatch(setRow(collectionsMap)),
    setExcelDataColumns: collectionsMap => dispatch(setExcelDataColumns(collectionsMap)),
});
 export default connect(mapStateToProps,mapDispatchToProps)(Tab)