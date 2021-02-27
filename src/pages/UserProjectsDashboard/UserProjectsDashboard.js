import React from 'react'
import UserProjectsDashboardLeftMenu from '../../components/UserProjectsDashboardComponents/UserProjectsDashboardLeftMenu/UserProjectsDashboardLeftMenu'
import UserProjectsDashboardRightMenu from '../../components/UserProjectsDashboardComponents/UserProjectsDashboardRightMenu/UserProjectsDashboardRightMenu'
import "./UserProjectsDashboard.css"

const UserProjectsDashboard=()=>{
    return(
        <div className="userProjectsDashboard">
            <UserProjectsDashboardLeftMenu />
            <UserProjectsDashboardRightMenu />
        </div>
    )
}
export default UserProjectsDashboard