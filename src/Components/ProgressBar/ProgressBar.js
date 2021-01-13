import React from 'react'
import "./ProgressBar.css"

const ProgressBar=()=>{
    return (
        <div className="progressbar">
            <div className="left">
                <img src='https://app.canvs.ai/8ceeb9deb31c0d21383184a4cf985038.svg' />
                <h2>Survey Uploader</h2>
            </div>
            <div className="right">
                <div className="item">
                    <div className="number">1</div>
                    <h5>Header</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div className="number">1</div>
                    <h5>Open Ends</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div className="number">1</div>
                    <h5>Open Ends</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div className="number">1</div>
                    <h5>Details</h5>
                    <hr/>
                </div>
                <div className="item">
                    <div className="number">1</div>
                    <h5>Review & Submit</h5>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
