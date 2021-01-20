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
import { setExcelDataColumns } from "../../../Redux/ExcelData/excel-data.actions.js";


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
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
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  





const CodeItTable =({excelData,setRow,setExcelDataColumns})=>{
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);


    const [selectedRow,setSelectedRow]=useState(null)

    const tempData=JSON.parse(excelData)
    let transformedData=tempData

    // Mapper
    let mapper={}
    let i=0
    for ( i=0 ; i<transformedData.length;i++){mapper[i]=[]}

    const [keywords,setkeywords]=useState(mapper)

    const handleChange= rowData => (event) => {
        let value =event.target.value;
        let num=rowData.tableData.id
      setPersonName(event.target.value);
      setkeywords({...keywords,[num] : []})
      setkeywords({...keywords,[num] : value},console.log(keywords))
    };
  







        const k=Object.keys(transformedData[0])
        let col=[]
        let columns_titles=[]
        i=0
        for(i in k){ 
            col=[...col,{title:k[i],field:k[i]}];
        }
        col=[...col,
            {title:"input",field:"input",
            render: rowData =>  <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                                    <Select
                                      labelId="demo-mutiple-checkbox-label"
                                      id="demo-mutiple-checkbox"
                                      multiple
                                    //   value={keywords[rowData.tableData.id]}
                                      value={keywords[rowData.tableData.id]}
                                      onChange={handleChange(rowData)}
                                      input={<Input />}
                                      renderValue={(selected) => selected.join(', ')}
                                      MenuProps={MenuProps}
                                    >
                                      {rowData['YAKE Prediction']?.split('/').map((name) => (
                                        <MenuItem key={rowData.tableData.id} value={name}>
                                          <Checkbox checked={personName.indexOf(name) > -1} />
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {/* {console.log(rowData.tableData.id)} */}
                                </FormControl>
            }
        ]
        for(i in k){ columns_titles= [...columns_titles,{title:k[i]}]}
        setExcelDataColumns(columns_titles)

        const sliced=(myObject)=>{
            Object.keys(myObject).slice(0, 30).reduce((result, key) => {
                result[key] = myObject[key];

                return result;
            }, {});
        }
         return(
            <MaterialTable
                icons={tableIcons}
                data={(transformedData)}
                columns={col}
                title="Demo"
                actions = {[
                    {
                      icon: () => <AddCircleIcon />,
                      tooltip: <p>Select this Row</p>,
                      onClick: (event, rowData) => {setSelectedRow((rowData),console.log(selectedRow));;setRow(rowData)},
                      position: "row"
                    }
                  ]}
                options={{
                    selection: false,
                    exportButton: true,
                    filtering: true,
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
})
const mapDispatchToProps = dispatch => ({
    setRow: collectionsMap => dispatch(setRow(collectionsMap)),
    setExcelDataColumns: collectionsMap => dispatch(setExcelDataColumns(collectionsMap)),
});
 export default connect(mapStateToProps,mapDispatchToProps)(CodeItTable)









//  const columns=[
//     {
//         Header:"User ID",
//         accessor:"ID",
//     },{
//       Header:"User",
//       accessor:"USER",
//   },{
//       Header:"Number",
//       accessor:"Number",
//   },{
//       Header:"Qwa",
//       accessor:"Qwa",
//   }
// ]




//  <FormControl className={classes.formControl}>
//  <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
//  <Select
//    labelId="demo-mutiple-checkbox-label"
//    id="demo-mutiple-checkbox"
//    multiple
//    value={personName}
//    onChange={handleChange}
//    input={<Input />}
//    renderValue={(selected) => selected.join(', ')}
//    MenuProps={MenuProps}
//  >
//    {names.map((name) => (
//      <MenuItem key={name} value={name}>
//        <Checkbox checked={personName.indexOf(name) > -1} />
//        <ListItemText primary={name} />
//      </MenuItem>
//    ))}
//  </Select>
// </FormControl>