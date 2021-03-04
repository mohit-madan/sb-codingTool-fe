import { IconButton } from '@material-ui/core'
import React from 'react'
import "./UserProjectsDashboardLeftMenu.scss"
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
function UserProjectsDashboardLeftMenu() {
    return (
        <div className="UserProjectsDashboardLeftMenu">
            <div className="innerLeftMenuDiv" style={{height: "maxContent"}} >
                <h1 style={{color:"white"}}>SB</h1>
                <div >
                    <Link to="/uploader">
                        <IconButton aria-label="delete">
                           <AddIcon />
                        </IconButton>
                    </Link>
                </div>
                <span className="newTaskFont">NEW TASK</span>
            </div>
        </div>
    )
}

export default UserProjectsDashboardLeftMenu
