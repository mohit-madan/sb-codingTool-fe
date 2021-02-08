import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import Navigation from "../../components/Navigation/Navigation.js"
import "./CodeIt.css"
import {selectProgressNumber} from "../../Redux/Progress-number/progress.selectors.js"
import CodeIt_RightMenu from "../../components/CodeIt/CodeIt_RightMenu/CodeIt_RightMenu.js"
import CodeIt_LeftMenu from "../../components/CodeIt/CodeIt_LeftMenu/CodeIt_LeftMenu.js"
import FiltersBar from "../../components/FiltersBar/FiltersBar.js"


const CodeIt=({progressNumber})=>{
    return(
        <div className="uploader_page codeIt_page">
            <Navigation />
            <FiltersBar />

                <div className="dash codeit_dash">
                    <CodeIt_LeftMenu progressNumber={progressNumber}/>
                    <CodeIt_RightMenu progressNumber={progressNumber}/>
                </div>
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    progressNumber:selectProgressNumber,
})
export default connect(mapStateToProps,null)(CodeIt)