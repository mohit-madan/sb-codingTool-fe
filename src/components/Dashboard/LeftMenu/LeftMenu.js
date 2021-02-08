import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { selectColumn, selectRow } from '../../../Redux/SelectedRowandColumn/tableSelections.selectors'
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
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
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
const LeftMenu=({progressNumber,rowNumber,column,selectExcelDataColumns,setColumn})=> {
    const classes = useStyles();
    let data={}
    console.log(column)
    const [state, setState] = React.useState({});
    useEffect(() => {
      if(!column){
        column={}
        setColumn({})
      }
    }, [])
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      setColumn({ ...state, [event.target.name]: event.target.checked })
      console.log(state)
    };

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
              <div className={classes.root}>
              <FormControl component="fieldset" className={classes.formControl}>
                
              <FormGroup>
                {selectExcelDataColumns?.map((item,index)=>{

                  // console.log(state[Object.keys(column)[index]])
                  return(
                  <FormControlLabel
                    control={<Checkbox checked={column ? column[Object.keys(column)[index]] : state[Object.keys(state)[index]]} onChange={handleChange} name={item?.title} />}
                    label={item?.title}
                  />
                  )
                })}
                  </FormGroup>
                </FormControl>
              </div>
            </div>}
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    rowNumber:selectRow,
    selectExcelDataColumns:selectExcelDataColumns,
    column:selectColumn
})
const mapDispatchToProps = dispatch => ({
  setColumn: collectionsMap => dispatch(setColumn(collectionsMap))
});
export default connect(mapStateToProps,mapDispatchToProps)(LeftMenu)