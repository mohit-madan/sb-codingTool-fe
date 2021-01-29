import React from 'react'
import { connect } from 'react-redux'
import { selectRow } from '../../../Redux/SelectedRowandColumn/tableSelections.selectors'
import "./LeftMenu.css"
import { createStructuredSelector } from "reselect"
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { selectExcelDataColumns } from '../../../Redux/ExcelData/excel-data.selectors'
import { setColumn } from '../../../Redux/SelectedRowandColumn/tableSelections.actions'
import leftmenu_data from "../../../data/uploader-leftmenu-data.js"
import { FormControl, Input, InputLabel, ListItemText, Select } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
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
const LeftMenu=({progressNumber,rowNumber,selectExcelDataColumns,setColumn})=> {
    const classes = useStyles();
    const [selectedColumnsFromDropDown, setSelectedColumnsFromDropDown] = React.useState([]);
  
    const _handleChange = (event) => {
      setSelectedColumnsFromDropDown(event.target.value);
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
              {/* <TextField
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
              </TextField> */}
              
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Select a Column</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={selectedColumnsFromDropDown}
                  onChange={_handleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {selectExcelDataColumns?.map((option) => (
                    <MenuItem key={option?.title} value={option?.title}>
                      <Checkbox checked={selectedColumnsFromDropDown.indexOf(option?.title) > -1} />
                      <ListItemText primary={option?.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
