import React,{useEffect} from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import Navigation from "../../components/Navigation/Navigation.js"
import "./CodeIt.css"
import CodeIt_RightMenu from "../../components/CodeIt/CodeIt_RightMenu/CodeIt_RightMenu.js"
import CodeIt_LeftMenu from "../../components/CodeIt/CodeIt_LeftMenu/CodeIt_LeftMenu.js"
import FiltersBar from "../../components/FiltersBar/FiltersBar.js"


const CodeIt=()=>{
    return(
        <div className="uploader_page codeIt_page">
            <Navigation />
            <FiltersBar />
                <div className="dash codeit_dash">
                    <CodeIt_LeftMenu />
                    <CodeIt_RightMenu />
                </div>
        </div>
    )
}
export default CodeIt