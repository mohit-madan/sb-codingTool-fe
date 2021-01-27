import React from 'react'
import Switch from '@material-ui/core/Switch';
import { Button, Radio } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function LeftMenu_EditOptions() {
    return (
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
    )
}

export default LeftMenu_EditOptions
