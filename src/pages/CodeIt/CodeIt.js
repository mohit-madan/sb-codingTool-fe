import React,{useEffect} from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import Navigation from "../../components/Navigation/Navigation.js"
import "./CodeIt.css"
import {selectProgressNumber} from "../../Redux/Progress-number/progress.selectors.js"
import CodeIt_RightMenu from "../../components/CodeIt/CodeIt_RightMenu/CodeIt_RightMenu.js"
import CodeIt_LeftMenu from "../../components/CodeIt/CodeIt_LeftMenu/CodeIt_LeftMenu.js"
import FiltersBar from "../../components/FiltersBar/FiltersBar.js"
import { initialState } from "../../Reducers/authentication.reducer.js"
import { userActions } from "../../_actions/index.js"
import { selectQuestionNumber } from "../../Redux/CodeitData/codeit-data.selectors.js"
import { socket } from "../../config.js"


const CodeIt=({progressNumber,questionNumber})=>{
    // useEffect(() => {
    //     const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
    //         if(initialState?.loggedIn ==true){
    //             userActions.jwtTokenCheck()
    //         }
    //       }, 1000*60)
    //       return () => clearInterval(intervalId); //This is important
    // })
    // useEffect(() => {
    //     let room =JSON.parse(localStorage.listOfQuestion)[questionNumber]._id
    //     console.log("room---->",room)
    //     socket.emit('joinRoom',{room: room, username: JSON.parse(localStorage.user).user.email,projectId:localStorage.projectId,questionCodebookId:localStorage.questionCodebookId }); //here {room: questionId, username: loginUser }

    // }, [questionNumber])
    return(
        <div className="uploader_page codeIt_page">
            <Navigation />
            <FiltersBar />

                <div className="dash codeit_dash">
                    <CodeIt_LeftMenu />
                    <CodeIt_RightMenu />
                </div>
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
  questionNumber:selectQuestionNumber,
    progressNumber:selectProgressNumber,
})
export default connect(mapStateToProps,null)(CodeIt)