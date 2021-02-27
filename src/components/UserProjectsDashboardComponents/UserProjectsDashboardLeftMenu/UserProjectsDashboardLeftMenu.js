import { IconButton } from '@material-ui/core'
import React from 'react'
import "./UserProjectsDashboardLeftMenu.scss"
import AddIcon from '@material-ui/icons/Add';
function UserProjectsDashboardLeftMenu() {
    return (
        <div className="UserProjectsDashboardLeftMenu">
            <div className="innerLeftMenuDiv" style={{height: "maxContent"}} >
                <img src='https://app.taskpigeon.co/assets/images/pigeon-logo.svg' />
                <div >
                    <IconButton aria-label="delete">
                       <AddIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default UserProjectsDashboardLeftMenu
