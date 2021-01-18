import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import LeftMenu from "../../components/Dashboard/LeftMenu/LeftMenu.js"
import RightMenu from "../../components/Dashboard/RightMenu/RightMenu.js"
import Footer from "../../components/Footer/Footer.js"
import Navigation from "../../components/Navigation/Navigation.js"
import ProgressBar from "../../components/ProgressBar/ProgressBar.js"
import "./UploaderPage.css"
import {selectProgressNumber} from "../../Redux/Progress-number/progress.selectors.js"

const UploaderPage=({progressNumber})=>{
    return(
        <div className="uploader_page">
            <Navigation />
            <ProgressBar progressNumber={progressNumber}/>
            <div className="dash">
                <LeftMenu progressNumber={progressNumber}/>
                <RightMenu progressNumber={progressNumber} />
            </div>
            <Footer progressNumber={progressNumber} />
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    progressNumber:selectProgressNumber,
})
export default connect(mapStateToProps,null)(UploaderPage)