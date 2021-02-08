import React,{useState,useEffect,Fragment} from "react"
import EditIcon from '@material-ui/icons/Edit';
import "./CodeIt_LeftMenu.css"
import Switch from '@material-ui/core/Switch';
import { Button, Radio } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";
import LeftMenuTop from "./LeftMenuTop";
import LeftMenu_EditOptions from "./LeftMenu_EditOptions";
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import './styles/react-contextmenu.css'
import './styles/custom.css'
import FilterListTwoToneIcon from '@material-ui/icons/FilterListTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import io from 'socket.io-client'
import { setShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.actions";
import { setContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.actions";
const socket = io.connect('http://localhost:4000', {
  transports: ['websocket'], 
  upgrade: false
})

const styles = {
  textAlign: 'center',
  backgroundColor: '#CCC',
  padding: 30
}
const handleClick=(event, data) => {
  console.log(`clicked`, { event, data })
}

const attributes = {
  className: 'custom-root',
  disabledClassName: 'custom-disabled',
  dividerClassName: 'custom-divider',
  selectedClassName: 'custom-selected'
}

const CodeIt_LeftMenu =({setContainsKeyword,setShowCodedAs})=>{
    var prev=0,next=0
    const [state,setState] = useState({ values: [] }) // Map 
    const [inputCodes,setinputCodes]=useState({}) // All inputs
    const [finalCodes,setFinalCodes]=useState({}) // Codes Finalised with Switch
    const [selectedRows,setSelectedRows]=useState(null)

    useEffect(()=>{
          socket.once('left-menu-codes',({i ,value}) => {
            if(inputCodes[i]!==value){
              // setFinalCodes({...finalCodes,[i] : value})
              setinputCodes({...inputCodes,[i] : {
                text : value,
                disabled : false}
              })
            }
        })
        socket.once('left-menu-state', () => {
          if(prev<next){
            setState(prevState => ({ values: [...prevState.values, 'default']}))
            prev=prev+1
          }
        })
    })

    const handleChange =(i)=>(event)=>{
      // setinputCodes({...inputCodes,[i]:event.target.value})
      // setFinalCodes({...inputCodes,[i]:event.target.value})
      let value=event.target.value 
      socket.emit('left-menu-codes',{i,value})
      // console.log(inputCodes)
    }
    const handleSwitchChange=i=>(event)=>{
      if(!event.target.checked){
        setFinalCodes({...inputCodes,[i]:null})
      }else{
        setFinalCodes({...inputCodes,[i]:inputCodes[i]})
      }
    }
    function Show_Coded_As(event, data) {
      console.log(`clicked`, { event, data })
      if(data.code !==`undefined`){
        setShowCodedAs({id: [data.id] ,code: [data.code]})
      }
    }
    function handleContainsKeyword(event, data){
      console.log(`clicked`, { event, data })
      if(data.code !==`undefined`){
        setContainsKeyword({id: [data.id] ,code: [data.code]})
      }
    }
    // var disabled = Array()
    const [disabled, setDisabled] =useState([])
    function createUI(){
       return state.values.map((el, i) => 
        <div >
          <ContextMenuTrigger id={i}>
            <Fragment >
          <div className="flex">
              <div style={{alignItems: "center"}} className="flex">
                  {/* <button key={i} type="button" onClick={removeClick(i)}>Remove</button> */}
                  &nbsp;&nbsp;
                  <Switch
                    size="small"
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={handleSwitchChange(i+1)}
                  />
                  <p >{`${i+1}`}</p>
                  &nbsp;&nbsp;
                  {/* {console.log(parseInt(Object.keys(inputCodes).slice(-1)) , i)} */}
                  { disabled[i] = parseInt(Object.keys(inputCodes).slice(-1))>i+1 ? !inputCodes[i]?.disabled : inputCodes[i]?.disabled  }
                  
                  {!disabled[i] ? <input value={inputCodes[i+1]?.text} placeholder="Code Here" onChange={handleChange(i+1)} className='width' /> : <p>{inputCodes[i+1]?.text}</p> }
                  
                  
              </div>
              <div className="flex" key={i}>
                  <EditIcon
                  fontSize="large"
                    onClick={()=>{setinputCodes({...inputCodes,[i] : {
                      ...inputCodes[i],
                      disabled : !inputCodes[i]?.disabled
                    }
                  })}} />
                  &nbsp;&nbsp;&nbsp;
                  86.72%(73)
              </div>
          </div>
          </Fragment>
          </ContextMenuTrigger>
            <ContextMenu id={i}>
              {inputCodes[i+1] &&
               <MenuItem
                className="input_value_in_dropdown"
                data={{ action: 'name_of_code' }}
                onClick={handleClick}
                attributes={attributes}
              >
                {`${i+1} . ${inputCodes[i+1]?.text}`}
              </MenuItem>}
              <MenuItem
                data={{ action: 'Show Suggestions' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <FilterListTwoToneIcon fontSize="small"/> Show Suggestions
              </MenuItem>

              <MenuItem
                data={{ code: inputCodes[i+1]?.text,id:i+1 }}
                onClick={Show_Coded_As}
                attributes={attributes}
              >
                <VisibilityIcon /> Show Coded As
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <VisibilityOffIcon /> Show Not Coded As
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <SettingsIcon /> Apply Text Match rules
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <ListIcon /> Edit Text Match rules
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <DescriptionIcon  /> Set Item Description
              </MenuItem>

              <MenuItem divider />

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <SettingsIcon /> Apply Text Match Rules (all)
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <VisibilityIcon /> Show Coded
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <VisibilityOffIcon /> Show UnCoded
              </MenuItem>

              <MenuItem divider />
              

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <AddIcon /> Add New Item
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <AddBoxRoundedIcon /> Add Multiple Items
              </MenuItem>
              
              <MenuItem
                data={{ code: inputCodes[i+1]?.text,id:i+1 }}
                onClick={handleContainsKeyword}
                attributes={attributes}
              >
                <AddBoxRoundedIcon /> Conatins keyword {inputCodes[i+1]?.text}
              </MenuItem>

            </ContextMenu>
         </div>
       )
    }
    const removeClick=(i)=>event=>{
      var _val = state.values.filter(function(value, index) {
        return index != i;
      })
      setState({ values: _val});
      setinputCodes({...inputCodes,[i+1]:""})
      setFinalCodes({...inputCodes,[i+1]:""})
      let value=""
      socket.emit('left-menu-codes',{i,value})
   }
    function addClick(e){
      e.preventDefault()
      socket.emit('left-menu-state')
      next=next+1
      console.log(inputCodes)
    }
    function disableInputBoxes(e){
      e.preventDefault()
      var temp1 =(inputCodes)
      Object.keys(temp1).map((item,index)=>{
        if(!temp1[item]?.disabled){
          temp1[item]={...temp1[item],disabled:true}
        }
      })
      var temp2 = disabled
      temp2.map((item,index)=>{
        temp2[index]=true
      })
      setDisabled(temp2)
      console.log(temp1)
      setinputCodes(temp1)
    }

      return (
        
        <div className="codeit_leftmenu">
          <LeftMenuTop />
          <LeftMenu_EditOptions />
          <form >
              {createUI()} 
              <input style={{display:"none"}} type='submit' onClick={disableInputBoxes}  />       
              <input type="button" value='Add a Code' onClick={addClick}/>
          </form>
        </div>
      );
}
const mapDispatchToProps = dispatch => ({
  setShowCodedAs: collectionsMap => dispatch(setShowCodedAs(collectionsMap)),
  setContainsKeyword: collectionsMap => dispatch(setContainsKeyword(collectionsMap)),
});
export default connect(null,mapDispatchToProps)(CodeIt_LeftMenu)