import React ,{useEffect} from "react"
import "./SidebarComponent.css"

const SidebarComponent = ({_style,Icon,text,active}) => {
    const activeComponentStyle={backgroundColor:"#0e71eb!important",color:"white!important"}

    return(
    // <div className="sidebarcomponent" >
    //         <div className="menuitem1" styles={{"cursor":"pointer!important"}}>
    //             {/* {Icon && <Icon className="_icon"/> } */}
    //             <p>{text}</p>
    //         </div>
    //     { active && <h1 className="vertical_line">|</h1>}
    // </div>
    <div className="sidebarcomponent">
    {active && <a style={{backgroundColor:"#0e71eb",color:"white"}} className="sidebarcomponentoption">
        {text}
    </a>}
    {!active && <a className="sidebarcomponentoption">
        {text}
    </a>}
    </div>
)}

export default SidebarComponent;