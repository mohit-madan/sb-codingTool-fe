import React,{useState,useEffect} from 'react'
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
import { setAppliedFilters, setFilters, setPageNumber, setSubmitFilters } from '../../Redux/Filters/Filters.actions';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { setFilteredData, setQuestionNumber } from '../../Redux/CodeitData/codeit-data.actions';
import { socket } from '../../config';
import { createStructuredSelector } from 'reselect';
import { selectPageNumber } from '../../Redux/Filters/Filters.selectors';
import { selectLeftMenuCodes, selectQuestionNumber, selectSortBy } from '../../Redux/CodeitData/codeit-data.selectors';

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

function FiltersBar({questionNumber,selectSortBy,leftMenuCodes,setQuestionNumber,setAppliedFilters,setPageNumber,pageNumber,setFilteredData,setSubmitFiltersInRedux,setFiltersInRedux}) {
    const classes = useStyles();
    const theme = useTheme();
    const [codes,setCodes]=useState([])
    const [filterDetails,setFilterDetails] =useState({
        match:`Contains In`,
        keywords:[],
        searchValue:"",
        sort:`Sort by length Ascending`,
        question:0,
        searchArray:[],
        filtersArray:[]
    })
    
    
    // useEffect(()=>{
    //   socket.once('left-menu-codes-object', (value) => {
    //     console.log(value)
    //     setCodes(value)
    //   })
    // })

    useEffect(() => {
      handleSubmitSearch()
    }, [filterDetails?.sort])

    useEffect(() => {
      console.log(selectSortBy)
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

    useEffect(() => {
      setCodes(leftMenuCodes)
    }, [leftMenuCodes])
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
        console.log(temp3)
        let questionId =JSON.parse(localStorage.listOfQuestion)[questionNumber]._id
        data = await userActions.filteredPagination({pageNumber:1,limit:20,filters:temp3,questionId:questionId})
        data=JSON.parse(data)
        // console.log(data)
        if(isIterable(data)){
          setFilteredData([...data])
         }
         if(data==null){
          setFilteredData([])
         }
         setPageNumber(2)
          console.log(filterDetails?.filtersArray)
    }
    const removeSearchItem=async (e,item)=>{
      e.preventDefault()
      // console.log(item)
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
      data = await userActions.filteredPagination({pageNumber:1,limit:20,filters:temp2,questionId:questionId})
        data=JSON.parse(data)
        // console.log(data)
        if(isIterable(data)){
          setFilteredData([...data])
         }
         if(data==null){
          setFilteredData([])
         }
         setPageNumber(2)
    }
    console.log(filterDetails?.keywords)
    const handleFilterDetails =(e)=>{
        e.preventDefault()
        setFilterDetails({...filterDetails,[e.target.name]:e.target.value})
        setFiltersInRedux({...filterDetails,[e.target.name]:e.target.value})
        console.log(filterDetails)
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
      console.log(e.target.value)
      setQuestionNumber(e.target.value)
      setFilterDetails({...filterDetails,[e.target.name]:e.target.value})
      setFiltersInRedux({...filterDetails,[e.target.name]:e.target.value})
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
                     onChange={handleQuestionNumber}
                     className={classes.selectEmpty}
                     inputProps={{ 'aria-label': 'Without label' }}
                     defaultValue={0}
                   >
                    <MenuItem value="" disabled>
                        Select Question
                    </MenuItem>
                    {
                      JSON.parse(localStorage.listOfQuestion)?.map((item,index)=>{
                        return(
                          item?.desc?.length >10 ?
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
                      <input type="text" style={{margin: "auto"}} placeholder="Search.." name="searchValue" value={filterDetails?.searchValue} onChange={handleFilterDetails}/>
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
                     
                      {/* <button style={{margin: "auto"}} type="submit"><i className="fa fa-search" /></button> */}
                    </form>
                    
                     <button className="btn"  onClick={handleSubmitSearch}><i className="fa fa-filter"></i> Filter</button>
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
                          {codes.map((item) => {
                            console.log("codes===>",codes)
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
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setFiltersInRedux: collectionsMap => dispatch(setFilters(collectionsMap)),
    setSubmitFiltersInRedux: collectionsMap => dispatch(setSubmitFilters(collectionsMap)),
    setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
    setPageNumber: collectionsMap => dispatch(setPageNumber(collectionsMap)),
    setAppliedFilters: collectionsMap => dispatch(setAppliedFilters(collectionsMap)),
    setQuestionNumber: collectionsMap => dispatch(setQuestionNumber(collectionsMap)),
});
const mapStateToProps=createStructuredSelector({
  pageNumber:selectPageNumber,
  leftMenuCodes:selectLeftMenuCodes,
  selectSortBy:selectSortBy,
  questionNumber:selectQuestionNumber,
  // selectSortBy
})
export default connect(mapStateToProps,mapDispatchToProps)(FiltersBar)