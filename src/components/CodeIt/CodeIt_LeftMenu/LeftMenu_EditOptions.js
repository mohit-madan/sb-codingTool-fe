import React from 'react'
import Switch from '@material-ui/core/Switch';
import { Button, Radio } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withStyles } from '@material-ui/core/styles';
const CustomSwitch = withStyles({
    switchBase: {
      color: "#d3e6f8",
      '&$checked': {
        color:"#1e90ff",
      },
      '&$checked + $track': {
        backgroundColor:"#94cbff",
      },
    },
    checked: {},
    track: {},
  })(Switch);
function LeftMenu_EditOptions() {
    return (
        <div className="background-color flex LeftMenu_EditOptions">
                    {/* <div className="">
                        Edit mode:
                        <CustomSwitch
                            defaultChecked
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                    </div> */}
                    {/* <div > */}
                        {/* <button> <ChevronRightIcon/></button>
                        <button> <ExpandMoreIcon/></button>
                        <button> +</button>
                        <button> <ChevronRightIcon/></button>
                        <button> <ExpandMoreIcon/></button>
                        <button> +</button> */}
                    {/* </div> */}

        </div>
    )
}

export default LeftMenu_EditOptions
