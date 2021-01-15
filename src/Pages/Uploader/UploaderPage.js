import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import LeftMenu from "../../Components/Dashboard/LeftMenu/LeftMenu.js"
import RightMenu from "../../Components/Dashboard/RightMenu/RightMenu.js"
import Footer from "../../Components/Footer/Footer.js"
import Navigation from "../../Components/Navigation/Navigation.js"
import ProgressBar from "../../Components/ProgressBar/ProgressBar.js"
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