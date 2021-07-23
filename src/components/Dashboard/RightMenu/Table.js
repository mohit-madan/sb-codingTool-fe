import React,{useState} from "react"
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectExcelData, selectExcelDataHeaders } from "../../../Redux/ExcelData/excel-data.selectors.js";
import {tableIcons } from "./TableIcons.js"
import MaterialTable from "material-table"
import { setExcelDataColumns } from "../../../Redux/ExcelData/excel-data.actions.js";

const Tab =({excelData, header_list,setExcelDataColumns})=>{
        const tempData=JSON.parse(excelData)
        let col=[]
        let columns_titles=[]
        let i
        for(i in header_list){ col= [...col,{title:header_list[i],field:header_list[i]}]}
        for(i in header_list){ columns_titles= [...columns_titles,{title:header_list[i]}]}
        setExcelDataColumns(columns_titles)
         return(
            <MaterialTable
                icons={tableIcons}
                data={Object.entries(tempData).slice(0,30).map(entry => entry[1])}

                columns={col}
                title="Demo"
                options={{
                    selection: false,
                    exportButton: true,
                    filtering: false,
                    grouping: false,
                    search: false,
                    sorting: true,
                    paging:false
                }}
            />
         )
     }

const mapStateToProps=createStructuredSelector({
    excelData:selectExcelData,
    header_list:selectExcelDataHeaders,
})
const mapDispatchToProps = dispatch => ({
    setExcelDataColumns: collectionsMap => dispatch(setExcelDataColumns(collectionsMap)),
});
 export default connect(mapStateToProps,mapDispatchToProps)(Tab)