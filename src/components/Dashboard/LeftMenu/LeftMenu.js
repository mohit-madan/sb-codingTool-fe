import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { selectColumn, selectRow, selectFilterColumn } from '../../../Redux/SelectedRowandColumn/tableSelections.selectors'
import "./LeftMenu.css"
import { createStructuredSelector } from "reselect"
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { selectExcelDataColumns } from '../../../Redux/ExcelData/excel-data.selectors'
import { setColumn, setFilterColumn } from '../../../Redux/SelectedRowandColumn/tableSelections.actions'
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
const LeftMenu=({progressNumber,rowNumber,column, filterColumn,selectExcelDataColumns,setColumn, setFilterColumn})=> {
    const classes = useStyles();

    const [state, setState] = React.useState((()=> {
      var mapper={}
      selectExcelDataColumns?.map((item,index)=>{
          let temp=item.title
          mapper={...mapper,[temp]: false}
      })
      return mapper
    })());
    const [filterState, setFilterState] = React.useState((()=> {
      var mapper={}
      selectExcelDataColumns?.map((item,index)=>{
          let temp=item.title
          mapper={...mapper,[temp]: false}
      })
      return mapper
    })());
    
    useEffect(()=>{
      var mapper={}
        setState((()=>{
          selectExcelDataColumns?.map((item,index)=>{
            let temp=item.title
            mapper={...mapper,[temp]: false}
        })
        return mapper
      })())
      setFilterState((()=>{
        selectExcelDataColumns?.map((item,index)=>{
          let temp=item.title
          mapper={...mapper,[temp]: false}
      })
      return mapper
    })())
    
    }, [selectExcelDataColumns])
    const [allChecked, setAllChecked] = React.useState(false);
    const [allCheckedFilter, setAllCheckedFilter] = React.useState(false);
    useEffect(() => {
      if(!column){
        column={}
        setColumn((()=>{
          var mapper={}
          selectExcelDataColumns?.map((item,index)=>{
              let temp=item.title
              mapper={...mapper,[temp]: false}
          })
          return mapper
        })())
      }
      if(!filterColumn){
        filterColumn={}
        setFilterColumn((()=>{
          var mapper={}
          selectExcelDataColumns?.map((item,index)=>{
              let temp=item.title
              mapper={...mapper,[temp]: false}
          })
          return mapper
        })())
      }
    }, [])

    const handleChange = (event) => {
      const checked=event.target.checked
      const name=event.target.name
      var temp= (progressNumber===2)? state : (progressNumber===3) ? filterState : null;
      if(name==="selectAll$Unique"){
        if(progressNumber===2){
          setAllChecked(checked)
          Object.keys(temp)?.map((item,index)=>{
            temp[item]=checked
          })
          setState(temp)
          setColumn((()=>{
            var mapper={}
              selectExcelDataColumns?.map((item,index)=>{
                  let temp=item.title
                  mapper={...mapper,[temp]: checked}
              })
              return mapper
          })())
        }
        else if(progressNumber===3){
          setAllCheckedFilter(checked)
          Object.keys(temp)?.map((item,index)=>{
            if(column[item]===false || column[item]===undefined){
              temp[item]=checked;
            }
          })
          setFilterState(temp)
          setFilterColumn((()=>{
            var mapper={}
              selectExcelDataColumns?.map((item,index)=>{
                if(column[item]===false || column[item]==undefined){
                  let temp=item.title
                  mapper={...mapper,[temp]: checked}
                }
              })
              return mapper
          })())
        }
      }
      else{
        Object.keys(temp)?.map((item,index)=>{
          if(item==name){
            temp[item]=checked
          }
        })
        if(progressNumber===2){
          setState(temp)
          setAllChecked((()=>{
            var countTrue =  Object.values(temp)?.filter(function(c) {
              return c;
              });
              return countTrue.length ===  Object.keys(temp).length;
            })()
            )
          setColumn({ ...column, [name]: checked })
        }
        else if(progressNumber===3){
          setFilterState(temp)
          setAllCheckedFilter((()=>{
            var countTrue =  Object.values(temp)?.filter(function(c) {
              return c;
              });
              return countTrue.length ===  Object.keys(temp).length;
            })()
            )
            setFilterColumn({ ...filterColumn, [name]: checked })
        }
      }
    };
    

    return (
        <div className="leftmenu">
            <div className="title">{leftmenu_data[`_${progressNumber}`].title_1}</div>
            <div className="title">{leftmenu_data[`_${progressNumber}`].title_2}</div>
            <p>{leftmenu_data[`_${progressNumber}`].p}</p>
            {progressNumber==2 && 
            <div className="selections">
              <h5>Selections :</h5>
              {rowNumber && <h6>Row Number : {rowNumber.tableData.id} Selected</h6>}
              <div className={classes.root}>
              <FormControl component="div" className={classes.formControl}> 
              <FormGroup>
                <FormControlLabel
                    key="selectAll$Unique"
                    control = {<Checkbox key="selectAll" checked={allChecked} onChange={handleChange} name="selectAll$Unique" indeterminate />}
                    label="Select All"
                  />
                {selectExcelDataColumns?.map((item,index)=>{
                  return(
                  <FormControlLabel
                    key={index}
                    control= {<Checkbox key={index} checked={Object.values(state)[index] || false} onChange={handleChange} name={item?.title} />}
                    label={item?.title}
                  />
                  )
                })}
                  </FormGroup>
                </FormControl>
              </div>
            </div>}
            {progressNumber==3 && 
            <div className="selections">
              <h5>Selections :</h5>
              {rowNumber && <h6>Row Number : {rowNumber.tableData.id} Selected</h6>}
              <div className={classes.root}>
              <FormControl component="div" className={classes.formControl}> 
              <FormGroup>
                <FormControlLabel
                    key="selectAll$Unique"
                    control = {<Checkbox key="selectAll" checked={allCheckedFilter} onChange={handleChange} name="selectAll$Unique" indeterminate />}
                    label="Select All"
                  />
                {selectExcelDataColumns?.map((item,index)=>{
                  return(
                  <FormControlLabel
                    key={index}
                    control= {<Checkbox key={index} checked={Object.values(filterState)[index] || false} onChange={handleChange} name={item?.title} />}
                    label={item?.title}
                    disabled={(column[item?.title] || false) === true}
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
    column:selectColumn,
    filterColumn:selectFilterColumn
})
const mapDispatchToProps = dispatch => ({
  setColumn: collectionsMap => dispatch(setColumn(collectionsMap)),
  setFilterColumn: collectionsMap => dispatch(setFilterColumn(collectionsMap))
});
export default connect(mapStateToProps,mapDispatchToProps)(LeftMenu)