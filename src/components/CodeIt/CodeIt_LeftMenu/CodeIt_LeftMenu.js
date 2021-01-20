import React from "react"
import "./CodeIt_LeftMenu.css"
import Switch from '@material-ui/core/Switch';
import { Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
const CodeIt_LeftMenu =()=>{
    return(
        <div className="codeit_leftmenu">
            <div className="flex">
                <div className="flex">
                    <input placeholder={`Filter by Keyword`} />
                </div>
                <div className="flex">
                Order : 
                    <div class="dropdown">
                        <button class="dropbtn">Dropdown</button>
                        <div class="dropdown-content">
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background-color flex">
                <div className="">
                    Edit mode:
                    <Switch
                        defaultChecked
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                </div>
                <div >
                    <button> <ChevronRightIcon/></button>
                    <button> <ExpandMoreIcon/></button>
                    <button> +</button>
                    <button> <ChevronRightIcon/></button>
                    <button> <ExpandMoreIcon/></button>
                    <button> +</button>
                </div>
            </div>
            <div className="flex">
                <div style={{alignItems: "end"}} className="flex">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" id="other" name="gender" value="other" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p for="other">Coca-Cola</p>
                </div>
                <div >
                    <ListIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    86.72 % ( 73 )
                </div>
            </div>
            <hr/>
        </div>
    )
}
export default CodeIt_LeftMenu