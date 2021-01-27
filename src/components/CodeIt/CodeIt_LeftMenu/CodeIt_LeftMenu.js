import React,{useState} from "react"
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

const styles = {
  textAlign: 'center',
  backgroundColor: '#CCC',
  padding: 30
}

const ID = 'ID'

const handleClick = (event, data) => {
  console.log(`clicked`, { event, data })
}

const attributes = {
  className: 'custom-root',
  disabledClassName: 'custom-disabled',
  dividerClassName: 'custom-divider',
  selectedClassName: 'custom-selected'
}

const CodeIt_LeftMenu =()=>{
    const [state,setState] = useState({ values: [] })
    let count=0
    const [inputCodes,setinputCodes]=useState({})
    const [finalCodes,setFinalCodes]=useState({})

    const handleChange =(i)=>(event)=>{
      setinputCodes({...inputCodes,[i]:event.target.value})
      setFinalCodes({...inputCodes,[i]:event.target.value})
    }
    const handleSwitchChange=i=>(event)=>{
      if(!event.target.checked){
        setFinalCodes({...inputCodes,[i]:null})
      }else{
        setFinalCodes({...inputCodes,[i]:inputCodes[i]})
      }
      console.log(finalCodes)
    }

    function createUI(){
       return state.values.map((el, i) => 
        <div >
          <ContextMenuTrigger id={ID}>
          <div className="flex">
              <div style={{alignItems: "center"}} className="flex">
                  &nbsp;&nbsp;
                  <Switch
                    size="small"
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={handleSwitchChange(i+1)}
                  />
                  {console.log(i)}
                  <p >{`${i+1}`}</p>
                  &nbsp;&nbsp;
                  <input value={inputCodes[i+1]} onChange={handleChange(i+1)} className='width' />
              </div>
              <div className="flex" >
                  <ListIcon />&nbsp;&nbsp;&nbsp;
                  86.72%(73)
              </div>
          </div>
          </ContextMenuTrigger>
            <ContextMenu id={ID}>
              {inputCodes[i+1] && <MenuItem
                className="input_value_in_dropdown"
                data={{ action: 'name_of_code' }}
                onClick={handleClick}
                attributes={attributes}
              >
                {`${i+1} . ${inputCodes[i+1]}`}
              </MenuItem>}
              <MenuItem
                data={{ action: 'Show Suggestions' }}
                onClick={handleClick}
                attributes={attributes}
              >
                <FilterListTwoToneIcon fontSize="small"/> Show Suggestions
              </MenuItem>

              <MenuItem
                data={{ action: 'paste' }}
                onClick={handleClick}
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
              
            </ContextMenu>
         </div>
       )
    }
  
    function addClick(){
      setState(prevState => ({ values: [...prevState.values, '']}))

    }
  

      return (
        
        <div className="codeit_leftmenu">
          <LeftMenuTop />
          <LeftMenu_EditOptions />
          <form >
              {createUI()}        
              <input type='button' value='Add a Code' onClick={addClick}/>
          </form>
        </div>
      );
}

export default connect()(CodeIt_LeftMenu)