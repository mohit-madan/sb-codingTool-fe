import React,{useState,useEffect, useRef} from 'react'
import "./FiltersBar.css"
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Dialog, DialogTitle, DialogActions, Button, List, ListItem, 
  IconButton, ListItemSecondaryAction, NativeSelect, Popper, Grow, Paper, ClickAwayListener,
MenuList, TextField, DialogContent, ListItemIcon } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { setAppliedFilters, setFilters, setSubmitFilters } from '../../Redux/Filters/Filters.actions';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { setFilteredData, setQuestionNumber, setCodingSummary } from '../../Redux/CodeitData/codeit-data.actions';
import { socket } from '../../config';
import { createStructuredSelector } from 'reselect';
import { selectLeftMenuCodes, selectQuestionNumber, selectSortBy, selectCodingSummary } from '../../Redux/CodeitData/codeit-data.selectors';
import { MoreHoriz } from '@material-ui/icons';

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    maxWidth: "max-content",
    marginLeft:50,
  },
  formControlDialog: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  listDialog : {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  selectEmpty: {
    // marginTop: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
  grow: {
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

const condition = {
  CONTAINS: "Contains Value",
  NOT_CONTAINS: "Not Contains Value",
  MATCHES: "Matches value",
  NOT_MATCHES: "Not Matches Value",
  // CODED_WITH: "Coded With",
  NOT_CODED: "Not Coded"
}
const condition_codes = {
  CODED_ANY: "Coded Any",
  CODED_ALL: "Coded All",
}
var where = {
  // LENGTH: 'Length',
  RESPONSE: 'Response',
  CODES: 'Codes'
}
const order = {
  ASCENDING: 'Ascending',
  DESCENDING: 'Descending'
}
const transformation = {
  AND: 'And',
  OR: 'Or'
}
var filterIdMap = {};
function FiltersBar({questionNumber,selectSortBy,leftMenuCodes,setQuestionNumber,setAppliedFilters,setFilteredData, codingSummary, setCodingSummary,setSubmitFiltersInRedux,setFiltersInRedux}) {
    const classes = useStyles();
    const theme = useTheme();
    useEffect(()=>{
      if(localStorage.filterDetails){
        if(localStorage.getItem("listOfFilterQuestion")){
          JSON.parse(localStorage.listOfFilterQuestion).map((item)=>{
            where[item.desc]=item.desc;
            filterIdMap[item.desc]=item._id;
          })
        }
      }  
    },[])
    const [filterDetails,setFilterDetails] =useState({
        match:`Contains In`,
        keywords:[],
        searchValue:"",
        sort:`Sort by length Ascending`,
        question:0,
        searchArray:[],
        filtersArray:[]
    })
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterDetailsNew, setFilterDetailsNew] = useState([{
      condition:condition.CONTAINS,
      value:'',
      where:where.RESPONSE
    }])

    const [sort, setSort] = useState([{
      order:order.ASCENDING,
      where:where.RESPONSE
    }])
    const handleToggle = (event) => {
      setOpenButton((prevOpenButton) => !prevOpenButton);
      setAnchorEl(event.target)
    };
    const [open, setOpen] = useState(false);
    const [openButton, setOpenButton] = useState(false);
    // const [openSort, setOpenSort] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      handleSubmitSearchNew();
    }
    // const handleClickOpenSort = () => {
    //   setOpenSort(true);
    // };
    // const handleCloseSort = () => {
    //   setOpenSort(false);
    // }
    const handleClickOpenButton = () => {
      setOpenButton(true);
    };
    const handleCloseButton = () => {
      setOpenButton(false);
    }
    const handleAddFilter = () => {
      let currFilters = [...filterDetailsNew];
      currFilters.push({
        condition:condition.CONTAINS,
        value:'',
        where:where.RESPONSE
      })
      setFilterDetailsNew(currFilters);
      setOpenButton(false);
    }

    const handleRemove = (event) => {
      var index = event.target.getAttribute("index");
      let currFilters = [...filterDetailsNew];
      currFilters.splice(index,1)
      setFilterDetailsNew(currFilters);
      setOpenButton(false);
    }
    
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpenButton(false);
      }
    }


    const handleDialogChange = (event)=>{
      event.preventDefault();
      const name = event.target.name.split("_")[0];
      const index = event.target.name.split("_")[1];
      
      setFilterDetailsNew(
        [
        ...filterDetailsNew.slice(0,index),
        {
            ...filterDetailsNew[index],
            [name]: event.target.value,
        },
        ...filterDetailsNew.slice(index+1)
      ]
      )
    }

    const handleDownload = () => {
      var questions_list = JSON.parse(localStorage.listOfQuestion).map((item)=> item._id)
      userActions.downloadResponses({questions: questions_list})
    }
    useEffect(() => {
      const loadFilterDetails = localStorage.getItem('filterDetails')
      if(loadFilterDetails){
        setFilterDetailsNew(JSON.parse(loadFilterDetails));
        handleSubmitSearchNew(); 
      }
    },[])
    useEffect(()=>{
      localStorage.setItem('filterDetails', JSON.stringify(filterDetailsNew))
    }, [filterDetailsNew])
    
    useEffect(() => {
      handleSubmitSearch()
    }, [filterDetails?.sort])

    useEffect(() => {
      const label=selectSortBy?.label
      const sort=selectSortBy?.sort
      let temp=""

        if(label==`length` && !sort){
          temp=`Sort by length Ascending`
        }else if(label==`length` && sort){
          temp=`Sort by length Descending`
        }else if(label==`desc` && !sort){
          temp=`Sort alphabetically Ascending`
        }else if(label==`desc` && sort){
          temp=`Sort alphabetically Descending`
        }
  
        setFilterDetails({
          ...filterDetails,
          sort:temp
        })

    }, [selectSortBy])
  const getFiltersArray=()=>{
      let filters =JSON.parse(JSON.stringify(filterDetails?.filtersArray))

      if(filterDetails?.sort===`Sort by length Ascending`){
        filters.push({"operator":1})
      }else if(filterDetails?.sort===`Sort by length Descending`){
        filters.push({"operator":2})
      }else if(filterDetails?.sort===`Sort alphabetically Ascending`){
        filters.push({"operator":3})
      }else if(filterDetails?.sort===`Sort alphabetically Descending`){
        filters.push({"operator":4})
      }
      return filters
  }

  function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  const getBasicFiltersArray=()=>{
    let _string = filterDetails?.searchValue
    let filters
    if(filterDetails?.match===`Exact Match`){
        filters={"operator":6,"pattern":_string}
    }else if(filterDetails?.match===`Contains In`){
        filters={"operator":5,"pattern":_string}
    }
    return filters
  }

    let data = null
    let totalRes = null
    let codedRes = null
    const handleSubmitSearchNew = async(e)=>{
      var filters_list = []
      var operator;
      if(filterDetailsNew.length>0){
        filterDetailsNew.map((item, index)=>{
          switch(item.condition){
            case condition.CONTAINS:
              if(item.where === where.RESPONSE){
                operator=5;
              }
              else{
                operator=11;
              }
              break;
            case condition.MATCHES:
              if(item.where === where.RESPONSE){
                operator=6;
              }
              else{
                operator=11;
              }
              break;
            case condition.NOT_CODED:
              operator=9;
              break;
            case condition_codes.CODED_ANY:
              operator=10;
              break;
            case condition_codes.CODED_ALL:
              operator=7;
              break;
          }
          if(item.value!=='' | operator===9){
            (operator===11) ? filters_list.push({"operator":operator, "pattern":item.value, "filter":filterIdMap[item.where]}) : 
            (operator === 10) ? filters_list.push({"operator":operator, "codewordGroup":item.value}):
            (operator === 7) ? item.value.map((v) => filters_list.push({"operator":operator, "codeword":v})) :
            filters_list.push({"operator":operator, "pattern":item.value})
          }
        })
      }
      let questionId =JSON.parse(localStorage.listOfQuestion)[questionNumber]._id
      data = await userActions.filteredPagination({filters:filters_list,questionId:questionId})
        data=JSON.parse(data)
        if(isIterable(data?.result)){
          setFilteredData([...data?.result])
          setCodingSummary({"operatorRes":data?.operatorRes , "totalRes": data?.totalRes})
         }
         if(data==null){
          setFilteredData([])
         }
    }
    const handleSubmitSearch =async (e)=>{
        if(filterDetails?.searchValue !==""){
          let temp1=filterDetails?.searchArray
          temp1.push(filterDetails?.searchValue)
          setFilterDetails({...filterDetails,searchArray:temp1,})

          let temp2=filterDetails?.filtersArray
          temp2.push(getBasicFiltersArray())
          setFilterDetails({...filterDetails,searchValue:"",filtersArray:temp2})
        }

        e?.preventDefault()
        let temp3=getFiltersArray(filterDetails)
        setAppliedFilters(temp3)
        
      if(filterDetails?.keywords?.length>0){
        filterDetails?.keywords?.map((item,index)=>{
          temp3.push({"operator":7,"codeword":item})
        })
      }
        let questionId =JSON.parse(localStorage.listOfQuestion)[questionNumber]._id
        data = await userActions.filteredPagination({filters:temp3,questionId:questionId})
        data=JSON.parse(data)
        if(isIterable(data?.result)){
          setFilteredData([...data?.result])
          setCodingSummary({"operatorRes":data?.operatorRes , "totalRes": data?.totalRes})
         }
         if(data==null){
          setFilteredData([])
         }
    }
    const removeSearchItem=async (e,item)=>{
      e.preventDefault()
      let temp1=[]
      filterDetails?.searchArray?.map((x,index)=>{
        if(x!==item){
          temp1.push(x)
        }
      })
      
      let temp2=[]
      filterDetails?.filtersArray.map((x,index)=>{
        if(x.pattern!=item){
          temp2.push({operator:x.operator,pattern:x.pattern})
        }
      })
      setFilterDetails({...filterDetails,searchArray:temp1,filtersArray:temp2})
      
      if(filterDetails?.sort===`Sort by length Ascending`){
        temp2.push({"operator":1})
      }else if(filterDetails?.sort===`Sort by length Descending`){
        temp2.push({"operator":2})
      }else if(filterDetails?.sort===`Sort alphabetically Ascending`){
        temp2.push({"operator":3})
      }else if(filterDetails?.sort===`Sort alphabetically Descending`){
        temp2.push({"operator":4})
      }

      setAppliedFilters(temp2)

      if(filterDetails?.keywords?.length>0){
        filterDetails?.keywords?.map((item,index)=>{
          temp2.push({"operator":7,"codeword":item})
        })
      }
      let questionId =JSON.parse(localStorage.listOfQuestion)[questionNumber]._id
      data = await userActions.filteredPagination({filters:temp2,questionId:questionId})
      data=JSON.parse(data)
      if(isIterable(data?.result)){
        setFilteredData([...data?.result])
        setCodingSummary({"operatorRes":data?.operatorRes , "totalRes": data?.totalRes})
       }
         if(data==null){
          setFilteredData([])
         }
    }
    const handleFilterDetails =(e)=>{
        e.preventDefault()
        setFilterDetails({...filterDetails,[e.target.name]:e.target.value})
        setFiltersInRedux({...filterDetails,[e.target.name]:e.target.value})
    }
  
    const resetFilterDetails=()=>{
      setFilterDetails({
        match:`Contains In`,
        keywords:[],
        searchValue:"",
        sort:`Sort by length`,
        question:10
      })
    }
    const resetSearchValue=()=>{
      setFilterDetails({...filterDetails,searchValue:""})
    }
    const handleQuestionNumber =(e)=>{
      socket.disconnect()
      setQuestionNumber(e.target.value)
      setFilterDetails({...filterDetails,[e.target.name]:e.target.value})
      setFiltersInRedux({...filterDetails,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
      setFilterDetails({
        match:`Contains In`,
        keywords:[],
        searchValue:"",
        sort:`Sort by length Ascending`,
        question:0,
        searchArray:[],
        filtersArray:[]
      })
      setFiltersInRedux({
        match:`Contains In`,
        keywords:[],
        searchValue:"",
        sort:`Sort by length Ascending`,
        question:0,
        searchArray:[],
        filtersArray:[]
      })
    },[questionNumber])
    return (
        <div className="FiltersBar">
            <div className="question_dropdown">
                <FormControl className={classes.formControl}>
                   <InputLabel id="demo-simple-select-label">Question</InputLabel>
                   <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                     value={questionNumber}
                     displayEmpty
                     name={`question`}
                     onChange={handleQuestionNumber}
                     className={classes.selectEmpty}
                     inputProps={{ 'aria-label': 'Without label' }}
                     defaultValue={questionNumber}
                   >
                    <MenuItem value="" disabled>
                        Select Question
                    </MenuItem>
                    {
                      JSON.parse(localStorage.listOfQuestion)?.map((item,index)=>{
                        return(
                          item?.desc?.length >50 ?
                            <MenuItem value={index}>{item?.desc?.slice(0,50)}...</MenuItem>
                            : <MenuItem value={index}>{item?.desc}</MenuItem>
                        )
                      })
                    }
                     
                   </Select>
                </FormControl>
            </div>
             <div className="filters">
                <div className="filters_settings">
                    <form className="search_form" style={{display : "flex",margin: 'auto 0', minWidth: '300px'}} >
                      <input 
                        type="text" 
                        style={{margin: "auto"}} 
                        placeholder="Search.." 
                        name="searchValue" 
                        value={filterDetails?.searchValue} 
                        onChange={handleFilterDetails}/>
                      <FormControl variant="filled" className={classes.formControl}>
                       <InputLabel id="demo-simple-select-filled-label">Match</InputLabel>
                       <Select
                         value={filterDetails?.match}
                         onChange={handleFilterDetails}
                         name={`match`}
                         native
                         inputProps={{
                           name:`match`,
                           id: 'uncontrolled-native',
                         }}
                       >
                         <option  value={`Contains In`}>Contains In</option >
                         <option  value={`Exact Match`}>Exact Match</option >
                       </Select>
                     </FormControl>
                      <button type="submit" className="btn"  onClick={handleSubmitSearch}><i className="fa fa-filter"></i> Filter</button>
                    </form>
                    
                     
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
                          {leftMenuCodes.map((item) => {
                            if(item?.active){
                              return (
                                <MenuItem key={item?.id} value={item?.name}>
                                  <Checkbox checked={filterDetails?.keywords.indexOf(item?.name) > -1} />
                                  <ListItemText primary={item?.name} />
                                </MenuItem>
                              )
                            }
                          })}
                        </Select>
                      </FormControl>
                     
                      {/* <FormControl variant="filled" className={classes.formControl}>
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
                         <option value={`Sort by length Ascending`}>Sort by length Ascending </option>
                         <option value={`Sort by length Descending`}>Sort by length Descending </option>
                         <option value={`Sort alphabetically Ascending`}>Sort alphabetically Ascending </option>
                         <option value={`Sort alphabetically Descending`}>Sort alphabetically Descending </option>
                       </Select>
                     </FormControl> */}
                </div>
                <div className="filters_list">

                    {/* {filterDetails?.searchValue!=="" &&  <button class="filter_btn btn">{`Search : ${filterDetails?.match}`}<button className="remove_btn" onClick={resetSearchValue}><i class="fa fa-times"></i></button> </button>   }                 
                    {filterDetails?.searchValue!=="" && <button class="filter_btn btn">{filterDetails?.sort} <button className="remove_btn"><i class="fa fa-times"></i></button></button> }
                    {filterDetails?.searchValue!=="" && <button className="filter_btn btn" onClick={resetFilterDetails}>Remove All</button> } */}
                    {
                      filterDetails?.searchArray?.map((item,index)=>{
                        return (
                          <button key={index} class="filter_btn btn">{item}<button className="remove_btn" onClick={e=>{removeSearchItem(e,item)}}><i class="fa fa-times"></i></button></button> 
                        )
                      })
                    }
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Apply Filters
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Filters
              </DialogTitle>
              <List className={classes.listDialog}>
                {
                  filterDetailsNew.map((item, index)=>{
                    return(
                      <ListItem name={index}>
                          <FormControl>
                            <NativeSelect
                              onChange={handleDialogChange}
                              name={"where_" + index}
                              defaultValue={item.where}
                              value={item.where}
                              className={classes.selectEmpty}
                              inputProps={{ 'aria-label': 'where' }}
                            >
                              {
                                Object.values(where).map((wEntry, index)=>{
                                  return(<option value={wEntry}>{wEntry}</option>)
                                })
                              }
                            </NativeSelect>
                          </FormControl>
                          <FormControl>
                            <NativeSelect
                              onChange={handleDialogChange}
                              name={"condition_"+index}
                              defaultValue={item.condition}
                              value={item.condition}
                              className={classes.selectEmpty}
                              inputProps={{ 'aria-label': 'condition' }}
                            >
                              { (item.where === where.CODES) ? 
                                Object.values(condition_codes).map((cEntry, index)=>{
                                  return(<option value={cEntry}>{cEntry}</option>)
                                })
                                : Object.values(condition).map((cEntry, index)=>{
                                  return(<option value={cEntry}>{cEntry}</option>)
                                })
                              }
                            </NativeSelect>
                          </FormControl>
                          {
                            (item.where === where.CODES) ? 
                            <FormControl className={classes.formControl}>
                              <InputLabel id="codes-dialog">Keywords</InputLabel>
                              <Select
                                labelId="codes-dialog"
                                id="codes-dialog"
                                multiple
                                value={Array.isArray(item.value) ? item.value : []}
                                onChange={handleDialogChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                name={"value_"+index}
                              >
                                {leftMenuCodes.map((leftMenuCode) => {
                                  if(leftMenuCode?.active){
                                    return (
                                      <MenuItem key={leftMenuCode?.id} value={leftMenuCode?.name}>
                                        <Checkbox checked={Array.isArray(item.value) ? item.value.indexOf(leftMenuCode?.name) > -1 : false} />
                                        <ListItemText primary={leftMenuCode?.name} />
                                      </MenuItem>
                                    )
                                  }
                                })}
                              </Select>
                            </FormControl>
                            : <Input name={"value_"+index} 
                            fullWidth 
                            placeholder="Value" 
                            defaultValue={item.value} 
                            value={item.value} 
                            inputProps={{ 'aria-label': 'value' }}
                            onChange={handleDialogChange} 
                            disabled={item.condition===condition.NOT_CODED}
                            />
                          }
                          
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments"
                            aria-controls={openButton ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}>
                            <MoreHoriz />
                          </IconButton>
                          <Popper open={openButton} anchorEl={anchorEl} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'right' : 'right' }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handleCloseButton}>
                                    <MenuList autoFocusItem={openButton} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                      <MenuItem index={index} onClick={handleRemove}>Remove</MenuItem>
                                      <MenuItem onClick={handleAddFilter}>Add New</MenuItem>
                                      {/* <MenuItem onClick={handleDu}>Duplicate</MenuItem> */}
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })
                }
              </List>
              <DialogContent />
              <DialogActions>
                <Button name="add" edge="start" onClick={handleAddFilter} color="secondary">
                  Add New filter
                </Button>
                <Button name="apply" autoFocus onClick={handleClose} color="primary">
                  Apply & Save
                </Button>
                {/* <Button name="cancel" autoFocus onClick={handleClose} color="primary">
                  Cancel 
                </Button> */}
              </DialogActions>
            </Dialog>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Download Codebook
            </Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setFiltersInRedux: collectionsMap => dispatch(setFilters(collectionsMap)),
    setSubmitFiltersInRedux: collectionsMap => dispatch(setSubmitFilters(collectionsMap)),
    setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
    setAppliedFilters: collectionsMap => dispatch(setAppliedFilters(collectionsMap)),
    setQuestionNumber: collectionsMap => dispatch(setQuestionNumber(collectionsMap)),
    setCodingSummary: collectionsMap => dispatch(setCodingSummary(collectionsMap)),
});
const mapStateToProps=createStructuredSelector({
  leftMenuCodes:selectLeftMenuCodes,
  selectSortBy:selectSortBy,
  questionNumber:selectQuestionNumber,
  // selectSortBy
})
export default connect(mapStateToProps,mapDispatchToProps)(FiltersBar)