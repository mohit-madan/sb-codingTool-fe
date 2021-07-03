import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCodes, selectFilteredData, selectLeftMenuCodes, selectQuestionNumber } from '../../../Redux/CodeitData/codeit-data.selectors';
import { setFilteredData, setKeywords,setSortBy } from '../../../Redux/CodeitData/codeit-data.actions';
import { lighten } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { selectAppliedFilters, selectFilters, selectPageNumber } from '../../../Redux/Filters/Filters.selectors';
import { ContextMenu, MenuItem as ContextMenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { setPageNumber } from '../../../Redux/Filters/Filters.actions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import {MultipleSelectStyles, MultipleSelectMenuProps} from "./MultipleSelectStyles"
import { socket } from '../../../config';

const _useStyles = makeStyles((theme) => ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },  root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }
))

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
    '& .ReactVirtualized__Table__row': {
        // paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    }
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];
  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Nutrition
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  
function ReactVirtualizedTable({setKeywordsInRedux,setSortBy,initialKeywords,leftMenuCodes,questionNumber,pageNumber,selectAppliedFilters,setPageNumber,codes,filteredData,onRowClick,selectFiltersFromRedux,setFilteredData}) {

    const headerHeight=48
    const rowHeight =48
    const classes=_useStyles()
    const multipleSelectClasses=MultipleSelectStyles()

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [reachedEnd,setReachedEnd]=useState(false)

    const [sorting,setSorting]=useState({
      desc:{label:"desc",sort:true,active:true},
      length:{label:"length",sort:true,active:true}
    })

    const [keywords,setKeywords]=useState({})

    useEffect(()=>{
      let mapper={}
      let i=0
      for ( i=0 ; i<Object.keys(filteredData)?.length;i++){mapper[i]=[]}
      setKeywords(mapper)
    },[])

    useEffect(() => {
      if(initialKeywords!==null && initialKeywords !=={} && Object.keys(initialKeywords)?.length >0){
        setKeywords(initialKeywords)
        // console.log("initialKeywords==>",initialKeywords)
      }
    },[initialKeywords])

    useEffect(()=>{
      if(keywords!==null && keywords !=={} && Object.keys(keywords)?.length >0){
        // console.log("keywords changed",keywords)
        setKeywordsInRedux(keywords)
      }
    },[keywords])

    useEffect(() => {
      socket.on('edit-codeword-to-list', editCodeword=>{

      const {codeword,codewordId,oldName}=editCodeword
      var tempKeywords=keywords
      Object.keys(tempKeywords).map((_key)=>{
        if(tempKeywords[_key]?.length ==0){
          return
        }else if(typeof(tempKeywords[_key])!=="undefined"){
          // console.log("arr==>",tempKeywords[_key])
          tempKeywords[_key]?.map(keywordName=>{
              if(keywordName==oldName){

                tempKeywords[_key] = tempKeywords[_key].filter(item => item !== oldName)

                tempKeywords[_key].push(codeword)
              }
          })
        }
      })
      // console.log("tempKeywords==>",tempKeywords)
      setKeywords(tempKeywords)

      })

      socket.on('single-operation', operation=> {
        let tempKeywords=operation.keywords
        // console.log('single-operation',operation)
        let codewordIds=operation.codewordIds
        let resNum=operation.resNum
        let codewordsArray=[]
        let tempLeftMenuCodes=operation.leftMenuCodes

        // console.log("tempLeftMenuCodes--->",tempLeftMenuCodes,{codewordIds})
        tempLeftMenuCodes?.map((item,index)=>{
          codewordIds?.map((_item,_index)=>{
            console.log(item?.id ,_item)
            if(item?.id == _item){
              codewordsArray.push(item.name)
            }
          })
        })
        // console.log({codewordsArray})
        setKeywords({...tempKeywords,[resNum] : codewordsArray})

      });


      socket.on('multiple-operation', operation=> {

          // console.log('multiple-operation',operation)
          let codeword=operation.codewordIds
          let resNumArray=operation.responses
          let tempkeywords=operation.keywords
          let tempLeftMenuCodes=operation.leftMenuCodes

          resNumArray?.map((item,index)=>{
            let temp =tempkeywords[item]
            if(typeof(temp)==`undefined`){
              temp=Array()
            }
            if(!temp.includes(codeword)){
              temp.push(codeword)
              // console.log(temp)
              tempkeywords={...tempkeywords,[item]:temp}
            }
          })
          setKeywords(tempkeywords)
      });

      socket.on('toggle-codeword-to-list', (value)=>{

        // console.log('toggle-codeword-to-list',value)
        const id=value.codewordId
        const responses=value.response
        const {active,codewordName}=value
        let codeword_name=''
        let temp=value.keywords

        // console.log("active===>",active,codewordName)
  
        if(!active){
          value.leftMenuCodes.map(task => {
            if (id === task.id) {
              codeword_name=task.name
              // console.log("codeword_name",codeword_name)
            }
          });
        
          responses.map((num=>{
            // console.log("temp[num]==>",temp[num])
            if(typeof(temp[num])=="object" && temp[num].includes(codeword_name)){
              temp[num]=temp[num].splice(codeword_name)
            }
          }))
  
        }else{
          // console.log("else condition ==>",responses)
          responses.map((num=>{
            if(typeof(temp[num])=="object" && !temp[num].includes(codewordName)){
              // console.log("temp[num]==>",temp[num])
              temp[num].push(codewordName)
            }
          }))
  
        }

        if(temp!==null && Object.keys(temp)?.length >0 && temp !=={} ){
          setKeywords(temp)
        }

      })

    },[])

    const handleChange= rowData => (event) => {
      let value =event.target.value;
      let num=rowData?.rowData?.resNum

      // console.log(value?.length < keywords[num]?.length,"handlchange==>",keywords)

      if(value?.length < keywords[num]?.length){
        let codewordIdsArray=[]
        leftMenuCodes?.map((item,index)=>{
          value?.map((_item,_index)=>{
            if(item?.name == _item){
              codewordIdsArray.push(item.id)
            }
          })
        })

        let operation = {resNum:num, codewordIds:codewordIdsArray,keywords:keywords,leftMenuCodes:leftMenuCodes};
        // console.log(`operation--->`,operation,codewordIdsArray)
        socket.emit('single-response-operation', operation);
        return
      }

      if((selected?.length ==0 || selected?.length ==1 || !selected.includes(num))){

        let codewordIdsArray=[]

        leftMenuCodes?.map((item,index)=>{
          // console.log(item)
          value?.map((_item,_index)=>{
            if(item?.name == _item){
              codewordIdsArray.push(item.id)
            }
          })
        })

        let operation = {resNum:num, codewordIds:codewordIdsArray,keywords:keywords,leftMenuCodes:leftMenuCodes};
        // console.log(`operation--->`,operation)
        socket.emit('single-response-operation', operation);

      }else if(selected.includes(num)){
        let temp =value[value?.length-1]
        let code=null
        leftMenuCodes?.map((item,index)=>{
          // console.log(item)
          if(item?.name== temp){
            code=item?.id
          }
        })

        let operation = {responses:selected, codewordId:code,codewordIds:value[value?.length-1],keywords:keywords,leftMenuCodes:leftMenuCodes};
        // console.log(operation)
        socket.emit('multiple-response-operation', operation);
      
      }

    };
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) =>n.resNum);
      // console.log(newSelecteds)
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    // console.log(newSelected)
    setSelected(newSelected);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

    const getRowClassName = ({ index }) => {
    
        return clsx(classes.tableRow, classes.flexContainer, {
          [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
      };
    
      const   cellRenderer = ({ cellData, columnIndex }) => {
        return (
          <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, {
              [classes.noClick]: onRowClick == null,
            })}
            variant="body"
            style={{ height: rowHeight }}
          >
            {cellData}
          </TableCell>
        );
      };
    
      // useEffect(() => {
        // console.log(sorting)
      // }, [sorting])
      
      const handleSorting=value=>{
        // console.log(value)
        if(value?.label=="desc"){
          setSorting({
            length:{label:"length",sort:sorting?.length?.sort,active:false},
            desc:{label:value.label,sort:!value.sort,active:true}
          })

          setSortBy({label:value.label,sort:!value.sort})
          
        }else if(value?.label=="length"){
          setSorting({
            desc:{label:"desc",sort:sorting?.desc?.sort,active:false},
            length:{label:value.label,sort:!value.sort,active:true}
          })

          setSortBy({label:value.label,sort:!value.sort})

        }

      }

      const   headerRenderer = ({value, label, columnIndex,headerHeight ,sort}) => {
    
        return (
          <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
            variant="head"
            style={{ height: headerHeight }}
          >
              {sort && <TableSortLabel
                active={value?.active}
                direction={ value?.sort ? 'asc' : 'desc'}
                onClick={()=>handleSorting(value)}
              >
                <span>{label}</span>
              </TableSortLabel>}

              {!sort && <span>{label}</span>}
          </TableCell>
        );
      };

      const _handleClick=(event, data) => {
        console.log(`clicked`, { event, data })
    }

    // useEffect(()=>{
    //   console.log('leftMenuCodes==>',leftMenuCodes)
    // },[leftMenuCodes])

  return (
    <Paper style={{ height: '100%', width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
            <div>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <Table
            virtualized
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes?.table}
            rowCount={filteredData?.length}
            rowGetter={({ index }) => filteredData[index]}
            rowClassName={getRowClassName}
          > 
                
                    <Column
                      key={"checkbox"}
                      headerRenderer={(headerProps) =>
                        <TableCell 
                        style={{ height: headerHeight }}
                        padding="checkbox">
                          <Checkbox
                            indeterminate={selected.length > 0 && selected.length < filteredData.length}
                            checked={filteredData.length > 0 && selected.length === filteredData.length}
                            onChange={handleSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell>
                      }
                      className={classes.flexContainer}
                      cellRenderer={rowData=>
                      <Checkbox
                        onChange={(event) => handleClick(event, rowData.rowData.resNum)}
                        checked={isSelected(rowData.rowData.resNum)}
                        inputProps={{ 'aria-labelledby': 123123 }}

                      />}
                      dataKey={"resNum"}
                      width = "70"
                      label= 'resNum'
                    />
                      <Column
                      key={"resNum"}
                      headerRenderer={(headerProps) =>
                        headerRenderer({
                          ...headerProps,
                          columnIndex: 0,
                        })
                      }
                      className={classes.flexContainer}
                      cellRenderer={cellRenderer}
                      dataKey={"resNum"}
                      width = "70"
                      label= 'resNum'
                    />
                    <Column
                      key={"desc"}
                      headerRenderer={(headerProps) =>
                        headerRenderer({
                          ...headerProps,
                          columnIndex: 1,
                          sort:true,
                          value:sorting.desc
                        })
                      }
                      className={classes.flexContainer}
                      cellRenderer={rowData => {return <Highlight indices={rowData?.rowData?.indices} select={rowData?.rowData?.desc} data={rowData.rowData} handleClick={_handleClick}  />}}
                      dataKey={"desc"}
                      width = "500"
                      label= 'desc'
                    />
                    <Column
                      key={"length"}
                      headerRenderer={(headerProps) =>
                        headerRenderer({
                          ...headerProps,
                          columnIndex: 2,
                          sort:true,
                          value:sorting.length
                        })
                      }
                      className={classes.flexContainer}
                    //   cellRenderer={rowData => <ContextMenuSkin select={rowData?.rowData?.length} data={rowData.rowData} handleClick={_handleClick} />}
                      dataKey={"length"}
                      width = "50"
                      label= 'length'
                    />
                    <Column
                      key={JSON.stringify(leftMenuCodes)}
                      headerRenderer={(headerProps) =>
                        headerRenderer({
                          ...headerProps,
                          columnIndex: 3,
                        })
                      }
                      className={classes.flexContainer}
                      // cellRenderer={rowData => <input  type="text"/>}
                      cellRenderer={rowData=>
                        <FormControl className={multipleSelectClasses.formControl}>
                        <InputLabel id={`demo-mutiple-checkbox-label`}>Tag</InputLabel>
                        <Select
                          // key={JSON.stringify(codesCopy)}
                          labelId="demo-mutiple-checkbox-label"
                          id={`${JSON.stringify(leftMenuCodes)} demo-mutiple-checkbox`}
                          // multiple
                          value={keywords!==undefined ? keywords[rowData?.rowData?.resNum] : []}
                          onChange={handleChange(rowData)}
                          input={<Input />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MultipleSelectMenuProps}
                        >
                          {leftMenuCodes?.map((item) => {
                              return (
                                item?.active ?
                                <MenuItem id={`${JSON.stringify(leftMenuCodes)} ${item?.id}`} key={`${item?.id}${item?.active}`} value={item?.name}>
                                  {
                                    (keywords)!==undefined && 
                                      <Checkbox id={`${JSON.stringify(leftMenuCodes)} ${item?.id}`} checked={keywords[rowData?.rowData?.resNum]?.indexOf(item?.name) > -1} />

                                  }
                                  <ListItemText id={`${JSON.stringify(leftMenuCodes)} ${item?.id}`}  primary={item?.name} />
                                </MenuItem>
                                :
                                <ListItemText key={`${item?.id}${item?.active}`} id={`${JSON.stringify(leftMenuCodes)} ${item?.id}`} style={{display:"none"}} primary={item?.name} />
                              )
                            }
                          )}
                        </Select>
                        {/* {console.log(leftMenuCodes)} */}
                      </FormControl>
                      }
                      dataKey={"resNum"}
                      width = "500"
                      label= 'Codes'
                    />
          </Table>
          </div>
        )}
      </AutoSizer>
    </Paper>
  );
}
// value={codes[rowData?.rowData?.resNum]}
// onChange={handleCodes(rowData)}
const attributes = {
    className: 'custom-root',
    // disabledClassName: 'custom-disabled',
    // dividerClassName: 'custom-divider',
    // selectedClassName: 'custom-selected'
  }

const Highlight=({select,indices})=>{
  // console.log(indices)
  let start=0
  return(
    <div className="webkitHeight" data-subtitle={`${select}`}>
      {indices ? 
      <div data-subtitle={`${select}`}>
        {
          indices?.map((item,index)=>{
            return(
              <span>
              <span>{select?.slice(start,item.fIndex)}</span>
              <span style={{color:"red"}}>{select?.slice(item.fIndex,item.lIndex+1)}</span>
              <span style={{display:"none"}}>{start=item?.lIndex+1}</span>
              </span>
            )
          })
        }
        <span>{select?.slice(start,select?.length+1)}</span>
      </div>
       : <span>{select}</span> }
    </div>
  )
}
const ContextMenuSkin=({slice,select,data,handleClick})=>{
    var __num= Math.floor(Math.random() * 101)  
    // slice && console.log()
    let temp1=data
    let start=0
    // console.log(select)

    return (
        // style={{height:"100px"}}
        <div >
         <ContextMenuTrigger key={__num} id={`ids`}>
            {slice && temp1?.indices?.length >0  && temp1?.indices.map((item,index) =>
                    {
                    return(
                        <p>
                            {temp1.desc.slice(start,item.fIndex)}
                        
                            <span style={{color:"red"}}>{temp1.desc.slice(item.fIndex,item.lIndex+1)}</span>

                            <p style={{display:"none"}}>{start=item.lIndex+2}</p>
                        </p>
                )
            })
            }
            {slice && data?.indices==null && <p style={{textAlign: "center"}} >{select}</p> }
            {!slice && <p style={{textAlign: "center"}} >{select}</p>}
            </ContextMenuTrigger>
            <ContextMenu key={__num} id={`ids`}>
                <ContextMenuItem
                  className="input_value_in_dropdown"
                  data={{ action: [data] }}
                  onClick={handleClick}
                  attributes={attributes}
                >
                 Sample Context Item
                </ContextMenuItem>
            </ContextMenu>
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    codes:selectCodes,
    filteredData:selectFilteredData,
    selectFiltersFromRedux:selectFilters,
    pageNumber:selectPageNumber,
    selectAppliedFilters:selectAppliedFilters,
    questionNumber:selectQuestionNumber,
    leftMenuCodes:selectLeftMenuCodes,
})
const mapDispatchToProps = dispatch => ({
  setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
  setPageNumber: collectionsMap => dispatch(setPageNumber(collectionsMap)),
  setSortBy: collectionsMap => dispatch(setSortBy(collectionsMap)),
  setKeywordsInRedux: collectionsMap => dispatch(setKeywords(collectionsMap)),
  // setKeywords
});
export default connect(mapStateToProps,mapDispatchToProps)(ReactVirtualizedTable)