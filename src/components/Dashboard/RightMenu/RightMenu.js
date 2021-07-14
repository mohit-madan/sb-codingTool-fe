import React from 'react'
import Summary from './Review & Submit/Summary'
import "./RightMenu.css"
import SurveyDetails from './Survey-Details/SurveyDetails'
import ExcelReader from './ExcelReader';
import Tab from "./Table.js"

function RightMenu({progressNumber}) {
    return (
        <div style={progressNumber===1 ?  {border:"1px solid grey"} : null} className="rightmenu">
            
            {progressNumber==1 && <ExcelReader />}
            {progressNumber==2 && <Tab />}
            {progressNumber==3 && <Tab />}
            {progressNumber==4 && <SurveyDetails />}
            {progressNumber==5 && <Summary />}
        </div>
    )
}

export default (RightMenu);
     