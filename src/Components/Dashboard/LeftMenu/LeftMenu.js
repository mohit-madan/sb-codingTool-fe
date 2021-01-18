import React from 'react'
import { connect } from 'react-redux'
import { selectRow } from '../../../Redux/SelectedRowandColumn/tableSelections.selectors'
import "./LeftMenu.css"
import { createStructuredSelector } from "reselect"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { selectExcelDataColumns } from '../../../Redux/ExcelData/excel-data.selectors'
import { setColumn } from '../../../Redux/SelectedRowandColumn/tableSelections.actions'
import leftmenu_data from "../../../data/uploader-leftmenu-data.js"


  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const LeftMenu=({progressNumber,rowNumber,selectExcelDataColumns,setColumn})=> {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
      setCurrency(event.target.value);
      setColumn(event.target.value)
    };
    console.log(selectExcelDataColumns)
    return (
        <div className="leftmenu">
            <div className="title">{leftmenu_data[`_${progressNumber}`].title_1}</div>
            <div className="title">{leftmenu_data[`_${progressNumber}`].title_2}</div>
            <p>{leftmenu_data[`_${progressNumber}`].p}</p>
            <span>{leftmenu_data[`_${progressNumber}`].span_1}</span>
            <span>{leftmenu_data[`_${progressNumber}`].span_2}</span>

            {/* <h5>Selections :</h5>
            {rowNumber && <h6>Row Nuber : {rowNumber.tableData.id} Selected</h6>} */}
            {progressNumber==2 && 
            <div className="selections">
              <h5>Selections :</h5>
              {rowNumber && <h6>Row Nuber : {rowNumber.tableData.id} Selected</h6>}
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={currency}
                onChange={handleChange}
                variant="outlined"
              >
              {selectExcelDataColumns?.map((option) => (
                <MenuItem key={option?.title} value={option?.title}>
                  {option?.title}
                </MenuItem>
              ))}
              </TextField>
            </div>}
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    rowNumber:selectRow,
    selectExcelDataColumns:selectExcelDataColumns,
})
const mapDispatchToProps = dispatch => ({
  setColumn: collectionsMap => dispatch(setColumn(collectionsMap))
});
export default connect(mapStateToProps,mapDispatchToProps)(LeftMenu)
