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
import CodeIt_RightMenu from "../../components/CodeIt/CodeIt_RightMenu/CodeIt_RightMenu.js"
import CodeIt_LeftMenu from "../../components/CodeIt/CodeIt_LeftMenu/CodeIt_LeftMenu.js"
import WithSpinner from "../../components/with-spinner/with-spinner.component.jsx"
import { selectLoading } from "../../Redux/Loading/Loading.selectors.js"

const UploaderRightMenuWithSpinner=WithSpinner(RightMenu)

const UploaderPage=({progressNumber,loading})=>{
    return(
        <div className="uploader_page">
            <Navigation />
            <ProgressBar progressNumber={progressNumber}/>
            { <div className="dash">
                <LeftMenu progressNumber={progressNumber}/>
                <UploaderRightMenuWithSpinner
                isLoading={loading}
                progressNumber={progressNumber} />
            </div>}
            {/* {
                <div className="dash codeit_dash">
                    <CodeIt_LeftMenu />
                    <CodeIt_RightMenu />
                </div>} */}
            <Footer progressNumber={progressNumber} />
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    progressNumber:selectProgressNumber,
    loading:selectLoading,
})
export default connect(mapStateToProps,null)(UploaderPage)