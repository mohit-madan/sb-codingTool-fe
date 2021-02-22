import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCodes, selectFilteredData, selectQuestionNumber } from '../../../Redux/CodeitData/codeit-data.selectors';
import { setShowCodedAs } from '../../../Redux/Show_Coded_As/Show_Coded_As.actions';
import { setFilteredData } from '../../../Redux/CodeitData/codeit-data.actions';
import { lighten } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { selectAppliedFilters, selectFilters, selectPageNumber } from '../../../Redux/Filters/Filters.selectors';
import { userActions } from '../../../_actions';
import { ContactSupportOutlined } from '@material-ui/icons';
import { ContextMenu, MenuItem as ContextMenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { setPageNumber } from '../../../Redux/Filters/Filters.actions';

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
  







const rows = [
    {
      "resNum": 1,
      "desc": "I really like the show because it is thought provoking and i like shows that make me think",
      "length": 90,
      "codewords": []
    },
    {
      "resNum": 2,
      "desc": "The cast.",
      "length": 9,
      "codewords": []
    },
    {
      "resNum": 3,
      "desc": "Nothing",
      "length": 7,
      "codewords": []
    },
    {
      "resNum": 4,
      "desc": "\"It is the most complex and original idea I have ever seen or heard of. Also",
      "length": 76,
      "codewords": []
    },
    {
      "resNum": 5,
      "desc": "it has many twists and I like that",
      "length": 34,
      "codewords": []
    },
    {
      "resNum": 6,
      "desc": "It's unpredictable so you are left wanting more",
      "length": 47,
      "codewords": []
    },
    {
      "resNum": 7,
      "desc": "thrilling and a very exciting show with action",
      "length": 46,
      "codewords": []
    },
    {
      "resNum": 8,
      "desc": "It is a very unique show and I never know what to expect next",
      "length": 61,
      "codewords": []
    },
    {
      "resNum": 9,
      "desc": "It�s visually interesting",
      "length": 25,
      "codewords": []
    },
    {
      "resNum": 10,
      "desc": "love anything ed harris or thandie newton are in",
      "length": 48,
      "codewords": []
    },
    {
      "resNum": 11,
      "desc": "The acting and writing are amazing and it has a great story",
      "length": 59,
      "codewords": []
    },
    {
      "resNum": 12,
      "desc": "\"Westworld is a complete show",
      "length": 29,
      "codewords": []
    },
    {
      "resNum": 13,
      "desc": "Its different than the other show I watch",
      "length": 41,
      "codewords": []
    },
    {
      "resNum": 14,
      "desc": "how they try and make a new way to be different then others",
      "length": 59,
      "codewords": []
    },
    {
      "resNum": 15,
      "desc": "I like the subject.",
      "length": 19,
      "codewords": []
    },
    {
      "resNum": 16,
      "desc": "The overall futuristic concept of living in that (simulated) time period. The characters are all engaging and support their individual and collective agandas with determination and steadfastness.",
      "length": 195,
      "codewords": []
    },
    {
      "resNum": 17,
      "desc": "Than you.",
      "length": 9,
      "codewords": []
    },
    {
      "resNum": 18,
      "desc": "I like the action and parts in which they get killed by the bad guy",
      "length": 67,
      "codewords": []
    },
    {
      "resNum": 19,
      "desc": "love the complexity of characters and how it makes you think critically",
      "length": 71,
      "codewords": []
    },
    {
      "resNum": 20,
      "desc": "The aspect of the show that revolves around what makes people humans. The acting is also great.",
      "length": 95,
      "codewords": []
    }
  ]



function ReactVirtualizedTable({questionNumber,pageNumber,selectAppliedFilters,setPageNumber,codes,filteredData,onRowClick,selectFiltersFromRedux,setFilteredData}) {

    const headerHeight=48
    const rowHeight =48
    const classes=_useStyles()

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [reachedEnd,setReachedEnd]=useState(false)
    let data=null
    // const [pageCount,setPageCount]=useState(2)
    // const [filteredPageCount,setFilteredPageCount]=useState(2)
    const [ascending,setAscending]=useState(true)
    // const rows = filteredData;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) =>n.resNum);
      console.log(newSelecteds)
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
    console.log(newSelected)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
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
    
      const   headerRenderer = ({ label, columnIndex }) => {
    
        return (
          <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
            variant="head"
            style={{ height: headerHeight }}
          >
              {label===`desc` && <TableSortLabel
                active={true}
                direction={ascending ? 'asc' : 'desc'}
                onClick={()=>{setAscending(!ascending)}}
              >
                <span>{label}</span>
              </TableSortLabel>}

              {label!==`desc` && <span>{label}</span>}
          </TableCell>
        );
      };
      const handleScroll =  (e) => {
        var temp1=(Math.round((e.scrollHeight - e.scrollTop)/100)*100)
        const bottom = temp1 ===  (Math.round(((e.clientHeight)+100)/100)*100 )
        bottom && console.log(`bottom from handleScroll`,bottom)
        //       console.log(temp1)
        //       console.log(Math.round((e.clientHeight * 2)/100)*100)
        // console.log(Math.round(e.scrollHeight - e.scrollTop)+10 === e.clientHeight)
        
        if (bottom) {
          setReachedEnd(true)
          
          return
        }
        else{
          setReachedEnd(false)
          return
        }
      }

      useEffect(async () => {
        if(reachedEnd && selectAppliedFilters==null ){
            data = await userActions.responsePagination({pageNumber:pageNumber,limit:20,push:false,questionId:localStorage.listOfQuestion?.split(',')[questionNumber]})
            data=JSON.parse(data)
            if(filteredData.length > 0 && data!==`undefined`){
                setFilteredData([...filteredData,...data])
            }
            setPageNumber(pageNumber+1)

        }else if(reachedEnd && selectAppliedFilters!=null ){
            data =await userActions.filteredPagination({pageNumber:pageNumber,limit:20,filters:selectAppliedFilters,questionId:localStorage.listOfQuestion?.split(',')[questionNumber]})
            data=JSON.parse(data)
            console.log(`data from reached end filtered useEffect`,selectAppliedFilters)
            if(filteredData.length > 0 && data!==`undefined`  && data!==null){
                setFilteredData([...filteredData,...data])
            }
            setPageNumber(pageNumber+1)
        }
    }, [reachedEnd])

    const _handleClick=(event, data) => {
        console.log(`clicked`, { event, data })
    }

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
            <div>

            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}


          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            onScroll={handleScroll}
            headerHeight={headerHeight}
            className={classes?.table}
            rowCount={filteredData?.length}
            rowGetter={({ index }) => filteredData[index]}
            rowClassName={getRowClassName}
          > 
                
                    <Column
                      key={"resNum"}
                      headerRenderer={(headerProps) =>
                        <TableCell padding="checkbox">
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
                        })
                      }
                      className={classes.flexContainer}
                    //   cellRenderer={rowData => <ContextMenuSkin slice={true} select={rowData?.rowData?.desc} data={rowData.rowData} handleClick={_handleClick} />}
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
                        })
                      }
                      className={classes.flexContainer}
                    //   cellRenderer={rowData => <ContextMenuSkin select={rowData?.rowData?.length} data={rowData.rowData} handleClick={_handleClick} />}
                      dataKey={"length"}
                      width = "200"
                      label= 'length'
                    />
                    <Column
                      key={"Codes"}
                      headerRenderer={(headerProps) =>
                        headerRenderer({
                          ...headerProps,
                          columnIndex: 3,
                        })
                      }
                      className={classes.flexContainer}
                      cellRenderer={rowData => <input  type="text"/>}
                      dataKey={"resNum"}
                      width = "200"
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
const ContextMenuSkin=({slice,select,data,handleClick})=>{
    var __num= Math.floor(Math.random() * 101)  
    slice && console.log()
    let temp1=data
    let start=0
    console.log(select)

    return (
        // style={{height:"100px"}}
        <div >
         <ContextMenuTrigger key={__num} id={`ids`}>
            {slice && temp1?.indices?.length >0  && temp1?.indices.map((item,index) =>
                    {
                    // if(index !== temp1?.indices?.length-1){
                    //     console.log(temp1.desc.slice(item.fIndex,item.lIndex+1))
                    //  return(
                    //     <p>
                    //         {temp1.desc.slice(start,item.fIndex)}
                        
                    //         <span style={{color:"red"}}>{temp1.desc.slice(item.fIndex,item.lIndex+1)}</span>

                    //          {start=item.lIndex+2}
                    //     </p>
                    // )
                    // }else{
                    //     return(
                    //         <span>
                    //             {temp1.desc.slice(start,temp1.desc?.length -1 )}
                    //         </span>
                    //     )
                    // }
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
    // selectAppliedFilters
})
const mapDispatchToProps = dispatch => ({
  setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
  setPageNumber: collectionsMap => dispatch(setPageNumber(collectionsMap)),
});
export default connect(mapStateToProps,mapDispatchToProps)(ReactVirtualizedTable)