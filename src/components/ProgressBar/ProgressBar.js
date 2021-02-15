import React from 'react'
import "./ProgressBar.css"
import ProgressBarItem from "./ProgressBarItem/ProgressBarItem.js"
import HeaderData from "../../data/HeaderData.js"

const ProgressBar=({progressNumber})=>{
    return (
        <div className="progressbar">
            <div className="left">
                <img src='https://app.canvs.ai/8ceeb9deb31c0d21383184a4cf985038.svg' />
                <h2>Survey Uploader</h2>
            </div>
            <div className="right">
                {HeaderData.map((item,index)=>{
                    return(
                        <ProgressBarItem key={index} progressNumber={progressNumber} index={index+1} text={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default ProgressBar
