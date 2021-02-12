import React,{useState} from 'react'
import "./FiltersBar.css"
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputBase } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { setFilters, setSubmitFilters } from '../../Redux/Filters/Filters.actions';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { setFilteredData } from '../../Redux/CodeitData/codeit-data.actions';

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
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    maxWidth: "max-content",
    marginLeft:50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function FiltersBar({setSubmitFiltersInRedux,setFiltersInRedux}) {
    const classes = useStyles();
    const theme = useTheme();
    const [filterDetails,setFilterDetails] =useState({
        match:null,
        keywords:[],
        searchValue:"",
        sort:`Sort by length`,
        question:10
    })
    

    const getFiltersArray=(_string)=>{
      let filters =[]
      if(filterDetails?.match===`Exact Match`){
          filters.push({"filter":6,"pattern":_string})
      }else if(filterDetails?.match===`Contains In`){
          filters.push({"filter":5,"pattern":_string})
      }
      console.log(filters)
      return filters
  }

    let data = null
    const handleSubmitSearch =async (e)=>{
        // e.preventDefault()
        console.log(`click`)
        setSubmitFiltersInRedux(true)
        const time = setInterval(() => {
            setSubmitFiltersInRedux(false)
            clearInterval(time)
        }, 1000*2);

        data = await userActions.filteredPagination({pageNumber:1,limit:20,filters:getFiltersArray(filterDetails?.searchValue)})
               data=JSON.parse(data)
               console.log(`caalling fetch`,data)
               if(data==null){
                   data =userActions.filteredPagination({pageNumber:1,limit:20,filters:getFiltersArray(filterDetails?.searchValue)})
                   data=JSON.parse(data)
                }
               console.log(`caalling fetch`,data)
               setSubmitFiltersInRedux(false);
               
               setFilteredData(data)

        return
    }
    console.log(filterDetails)
    const handleFilterDetails =(e)=>{
        e.preventDefault()
        setFilterDetails({...filterDetails,[e.target.name]:e.target.value})
        setFiltersInRedux({...filterDetails,[e.target.name]:e.target.value})
        console.log(filterDetails)
        // setFiltersInRedux
        // console.log(e.target.name,e.target.value)
    }
    const filtersDetailsToArray=()=>{
      
    }
    return (
        <div className="FiltersBar">
            <div className="question_dropdown">
                <FormControl className={classes.formControl}>
                   <InputLabel id="demo-simple-select-label">Question</InputLabel>
                   <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                     value={filterDetails?.question}
                     displayEmpty
                     name={`question`}
                     onChange={handleFilterDetails}
                     className={classes.selectEmpty}
                     inputProps={{ 'aria-label': 'Without label' }}
                     defaultValue={10}
                   >
                    <MenuItem value="" disabled>
                        Select Question
                    </MenuItem>
                     <MenuItem value={10}>Q148 What, if anything, about Westworld draws ... </MenuItem>
                   </Select>
                </FormControl>
            </div>
             <div className="filters">
                <div className="filters_settings">
                    <form className="example" style={{margin: 'auto 0', maxWidth: '300px'}} >
                      <input type="text" placeholder="Search.." name="searchValue" onChange={handleFilterDetails}/>
                      <button type="submit"><i className="fa fa-search" /></button>
                    </form>
                    <FormControl variant="filled" className={classes.formControl}>
                       <InputLabel id="demo-simple-select-filled-label">Match</InputLabel>
                       <Select
                         value={filterDetails?.match}
                         onChange={handleFilterDetails}
                         name={`match`}
                         native
                         inputProps={{
                           name:`match`,
                           id: 'filled-age-native-simple',
                         }}
                       >
                         <option aria-label="None" value="" />
                         <option  value={`Exact Match`}>Exact Match</option >
                         <option  value={`Contains In`}>Contains In</option >
                       </Select>
                     </FormControl>
                     <button class="btn"  onClick={handleSubmitSearch}><i class="fa fa-filter"></i> Filter</button>
                     <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Keywords</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          multiple
                          value={filterDetails?.keywords}
                          onChange={handleFilterDetails}
                          input={<Input />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          name={`keywords`}
                        >
                          {names.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={filterDetails?.keywords.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                     
                      <FormControl variant="filled" className={classes.formControl}>
                       <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
                       <Select
                         value={filterDetails?.sort}
                         onChange={handleFilterDetails}
                         name={`sort`}
                         native
                         inputProps={{
                           name:`sort`,
                           id: 'uncontrolled-native',
                         }}
                       >
                         <option value={`Sort by length`}>Sort by length</option>
                         <option value={`Sort alphabetically`}>Sort alphabetically</option>
                       </Select>
                     </FormControl>
                </div>
                <div className="filters_list">
                    {/* <button class="filter_btn btn">Home <button className="remove_btn"><i class="fa fa-times"></i></button> </button>
                    <button class="filter_btn btn">Menu<button className="remove_btn"><i class="fa fa-times"></i></button></button>
                    <button class="filter_btn btn">Trash<button className="remove_btn"><i class="fa fa-times"></i></button></button>
                    <button class="filter_btn btn">Close<button className="remove_btn"><i class="fa fa-times"></i></button></button>
                    <button class="filter_btn btn">Folder<button className="remove_btn"><i class="fa fa-times"></i></button></button>
                    <button class="filter_btn btn">Remove All<button className="remove_btn"><i class="fa fa-trash-alt"></i></button></button> */}
                    <button class="filter_btn btn">Remove All<button className="remove_btn"><i class="fa fa-trash-alt"></i></button></button> 
                    
                </div>
            </div>
        </div>
    )
}
// setFilters
const mapDispatchToProps = dispatch => ({
    setFiltersInRedux: collectionsMap => dispatch(setFilters(collectionsMap)),
    setSubmitFiltersInRedux: collectionsMap => dispatch(setSubmitFilters(collectionsMap)),
    // setSumitFilters
    setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),

});

export default connect(null,mapDispatchToProps)(FiltersBar)
