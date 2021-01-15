import React from 'react'
import "./Footer.css"
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {setProgressNumber} from "../../Redux/Progress-number/progress.actions.js"

const Footer=({setProgressNumber,progressNumber})=> {
    return (
        <div className="footer">
            <div className="left">
                <Button>CANCEL</Button>
            </div>
            <div className="middle"></div>
            <div className="right">
                <Button onClick={()=>{progressNumber>1 && setProgressNumber(progressNumber-1)}}>Prev</Button>
                <Button onClick={()=>{progressNumber<=4 && setProgressNumber(progressNumber+1)}}>Next</Button>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setProgressNumber: progressNumber =>
      dispatch(setProgressNumber(progressNumber))
});
export default connect(null,mapDispatchToProps)(Footer)