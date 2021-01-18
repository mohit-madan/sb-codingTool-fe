import React ,{useEffect} from "react"
import "./SidebarComponent.css"

const SidebarComponent = ({Icon,text,active}) => {
    // let current
    // useEffect(() => {
    //     current = window.location.href.split("/")
    //     current = current[current.length-1]
    // }, [current])
    return(
    <div className="sidebarcomponent" >
            <div className="menuitem1" styles={{"cursor":"pointer!important"}}>
                {Icon && <Icon className="_icon"/> }
                <p>{text}</p>
            </div>
        { active && <h1 className="vertical_line">|</h1>}
    </div>
)}

export default SidebarComponent;