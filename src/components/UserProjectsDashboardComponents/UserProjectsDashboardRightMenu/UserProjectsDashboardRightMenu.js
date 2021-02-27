import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import config from '../../../config'
import { userActions } from '../../../_actions'
import UserProjectsDashboardHeader from '../UserProjectsDashboardHeader/UserProjectsDashboardHeader'
import "./UserProjectsDashboardRightMenu.css"

const UserProjectsDashboardRightMenu=()=> {
    const user = useSelector(state=>state.authentication)
    const projects=user?.user?.user?.projects
    const [projectsFetchData,setProjectsFetchData]=useState([])

    useEffect(() => {
        console.log(projectsFetchData)
    }, [projectsFetchData])

    useEffect(() => {
        let temp2=[]
        let poster=[]

        const _token=JSON.parse(localStorage.token).accessToken
        const requestOptions = {
            headers: {'Authorization': `Bearer ${_token}`}
        }
        
        projects?.map((item,index)=>{
            let details={
                "id":item,
            }
            poster.push(axios.post(`${config.apiUrl}/projectDetails`,details, requestOptions))
        })
        axios.all([...poster])
        .then(data=>console.log(data))
        .then(
            // data=>console.log(data)
            axios.spread((...allData)=>{
                console.log(`start`)
                console.log(poster)
                console.log(allData)
            })
        )
        // await projects?.map( async (item,index)=>{
        //     return temp2.push( await userActions.projectDetailsForUserProjectsDashboard(item))
        // })

        //  setProjectsFetchData(temp2)
    },[])
    return (
        <div className="UserProjectsDashboardRightMenu">
            <UserProjectsDashboardHeader  />
            <div className="body" >
                <h1>asdasd</h1>
                <h1>asdasd</h1>
                <h1>asdasd</h1>
                <h1>asdasd</h1>
            </div>
        </div>
    )
}

export default UserProjectsDashboardRightMenu
