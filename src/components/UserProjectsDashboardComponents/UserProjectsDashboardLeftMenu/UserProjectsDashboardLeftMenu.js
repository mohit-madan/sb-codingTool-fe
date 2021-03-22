import { Button, IconButton } from '@material-ui/core'
import React from 'react'
import "./UserProjectsDashboardLeftMenu.scss"
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { history } from '../../../_helpers';
function UserProjectsDashboardLeftMenu() {
    const goToUploader =()=>{
        localStorage.removeItem("questionCodebookId")
        localStorage.removeItem("listOfQuestion")
        localStorage.removeItem("codebook")
        localStorage.removeItem("projectId")
        history.push("/uploader")
    }
    return (
        <div className="UserProjectsDashboardLeftMenu">
            <div className="innerLeftMenuDiv" style={{height: "maxContent"}} >
                <h1 style={{color:"white"}}>SB</h1>
                <div >
                    {/* <Button > */}
                    <Link >
                        <IconButton onClick={goToUploader} aria-label="delete">
                           <AddIcon />
                        </IconButton>
                    </Link>
                    {/* </Button> */}
                </div>
                <span className="newTaskFont">NEW TASK</span>
            </div>
        </div>
    )
}

export default UserProjectsDashboardLeftMenu
