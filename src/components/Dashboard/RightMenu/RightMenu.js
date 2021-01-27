import React,{useState} from 'react'
import Summary from './Review & Submit/Summary'
import "./RightMenu.css"
import SurveyDetails from './Survey-Details/SurveyDetails'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import XLSX from "xlsx";
import ExcelReader from './ExcelReader';
import {tempData} from "./Data"
// import ReactTable from "react-table";
import Tab from "./Table.js"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function RightMenu({progressNumber}) {
    // const _data=tempData
    // const classes = useStyles();
    // const [file,setFile]=useState(null)


    // function filePathset(e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     var file = e.target.files[0];
    //     console.log(file);
    //     setFile({ file });
    
    //     console.log(file);
    //   }
    
    //   function readFile() {
    //     var f = file;
    //     var name = f.name;
    //     const reader = new FileReader();
    //     reader.onload = (evt) => {
    //       // evt = on_file_select event
    //       /* Parse data */
    //       const bstr = evt.target.result;
    //       const wb = XLSX.read(bstr, { type: "binary" });
    //       /* Get first worksheet */
    //       const wsname = wb.SheetNames[0];
    //       const ws = wb.Sheets[wsname];
    //       /* Convert array of arrays */
    //       const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    //       /* Update state */
    //       console.log("Data>>>" + data);// shows that excel data is read
    //       console.log(convertToJson(data)); // shows data in json format
    //     };
    //     console.log(f)
    //     reader.readAsBinaryString(file);
    //   }
    
    //   function convertToJson(csv) {
    //     var lines = csv.split("\n");
    
    //     var result = [];
    
    //     var headers = lines[0].split(",");
    
    //     for (var i = 1; i < lines.length; i++) {
    //       var obj = {};
    //       var currentline = lines[i].split(",");
    
    //       for (var j = 0; j < headers.length; j++) {
    //         obj[headers[j]] = currentline[j];
    //       }
    
    //       result.push(obj);
    //     }
    
    //     //return result; //JavaScript object
    //     return JSON.stringify(result); //JSON
    //   }

    //   function pack(){
    //     const result = excelToJson({
    //         sourceFile:"./qwe.xlsx"
    //     });
    //     console.log(result)
    //   }
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
    return (
        <div style={progressNumber===1 ?  {border:"1px solid grey"} : null} className="rightmenu">
            
            {progressNumber==1 && <ExcelReader />}
            {progressNumber==2 && <Tab />}
            {progressNumber==3 && <SurveyDetails />}
            {progressNumber==4 && <Summary />}
        </div>
    )
}

export default RightMenu
            
            {/* <ReactTable
            columns={columns}
            data={tempData}
            ></ReactTable> */}

                        {/* <div className={classes.root}>
              <input
                accept="*"
                onChange={filePathset}
                className={classes.input}
                id="contained-button-file"
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button size="large" variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
        </div>*/}