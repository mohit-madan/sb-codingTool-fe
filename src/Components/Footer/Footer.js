import React from 'react'
import "./Footer.css"
import { Button } from '@material-ui/core';

const Footer=()=> {
    return (
        <div className="footer">
            <div className="left">
                <Button>CANCEL</Button>
            </div>
            <div className="middle"></div>
            <div className="right">
                <Button>Prev</Button>
                <Button>Next</Button>
            </div>
        </div>
    )
}

export default Footer