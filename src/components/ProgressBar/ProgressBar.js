import React from 'react'
import "./ProgressBar.css"

const ProgressBar=({progressNumber})=>{ 
    const highlightStyle={"backgroundColor":"#00bda7","color":"white","border":"none"}
    const textStyle={"color":"#15c5b1"}

    return (
        <div className="progressbar">
            <div className="left">
                <img src='https://app.canvs.ai/8ceeb9deb31c0d21383184a4cf985038.svg' />
                <h2>Survey Uploader</h2>
            </div>
            <div className="right">
                <div className="item">
                    <div key={1} style={progressNumber>=1 ? highlightStyle : null} className="number">{progressNumber>1 ? `✔`: 1}</div>
                    <h5  style={progressNumber>1 ? textStyle : null}>Header</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div  key={2} style={progressNumber>=2 ? highlightStyle : null} className="number">{progressNumber>2 ? `✔`: 2}</div>
                    <h5 style={progressNumber>2 ? textStyle : null}>Open Ends</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div  key={3} style={progressNumber>=3 ? highlightStyle : null} className="number">{progressNumber>3 ? `✔`: 3}</div>
                    <h5  style={progressNumber>3 ? textStyle : null}>Details</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div  key={4} style={progressNumber>=4 ? highlightStyle : null} className="number">{progressNumber>4 ? `✔`: 4}</div>
                    <h5  style={progressNumber>4 ? textStyle : null}>Review & Submit</h5>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
