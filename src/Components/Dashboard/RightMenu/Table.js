import React from "react"
import { connect } from "react-redux";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { createStructuredSelector } from "reselect";
import { selectExcelData } from "../../../Redux/ExcelData/excel-data.selectors.js";

const Tab =({excelData})=>{
    console.log(JSON.parse(excelData));
        const tempData=JSON.parse(excelData)
        const k=Object.keys(tempData[0])
        let col=[]
        let i
        for(i in k){ col= [...col,{Header:k[i],accessor:k[i]}]}
        console.log(col)
        const columns=[
            {
                Header:"User ID",
                accessor:"ID",
            },{
              Header:"User",
              accessor:"USER",
          },{
              Header:"Number",
              accessor:"Number",
          },{
              Header:"Qwa",
              accessor:"Qwa",
          }
        ]
         return(
            <ReactTable
            columns={col}
            data={tempData}
            // defaultPageSize={10}
            className="-striped -highlight"
            ></ReactTable>
         )
     }

const mapStateToProps=createStructuredSelector({
    excelData:selectExcelData,
})
 export default connect(mapStateToProps)(Tab)