import React from "react"
import LeftMenu from "../../Components/Dashboard/LeftMenu/LeftMenu.js"
import RightMenu from "../../Components/Dashboard/RightMenu/RightMenu.js"
import Footer from "../../Components/Footer/Footer.js"
import Navigation from "../../Components/Navigation/Navigation.js"
import ProgressBar from "../../Components/ProgressBar/ProgressBar.js"
import "./UploaderPage.css"

const UploaderPage=()=>{
    return(
        <div className="uploader_page">
            <Navigation />
            <ProgressBar />
            <div className="dash">
                <LeftMenu />
                <RightMenu />
            </div>
            <Footer />
        </div>
    )
}
export default UploaderPage