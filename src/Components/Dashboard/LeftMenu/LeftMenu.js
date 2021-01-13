import React from 'react'
import "./LeftMenu.css"

const LeftMenu=()=> {
    return (
        <div className="leftmenu">
            <div className="title">Import a</div>
            <div className="title">spreedsheet</div>
            <p>Supported file types: .xlsx, .xls, .csv</p>
            <span>To learn more about the types of files you</span>
            <span>can upload into Canvs, click here</span>
        </div>
    )
}

export default LeftMenu
