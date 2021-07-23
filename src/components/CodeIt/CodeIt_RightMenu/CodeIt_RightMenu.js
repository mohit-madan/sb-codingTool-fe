import  Tab from "../../Dashboard/RightMenu/Table.js"
import React,{useEffect,useState,Component} from "react"
import "./CodeIt_RightMenu.scss"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from "react-redux";
import { selectCodes, selectCodingSummary, selectFilteredData, selectnumberOfInputsGreaterThan2, selectQuestionNumber } from "../../../Redux/CodeitData/codeit-data.selectors.js";
import { createStructuredSelector } from "reselect";
import { selectShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.selectors.js";
import { selectContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.selectors.js";
import { setShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.actions.js";
import { setContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.actions.js";
import { userActions } from "../../../_actions/index.js";
import { setFilteredData } from "../../../Redux/CodeitData/codeit-data.actions.js";
import ReactVirtualizedTable from "./material-ui-table.js";
import { socket } from "../../../config.js";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

const CodeIt_RightMenu =({questionNumber,setFilteredData,filteredData,setShowCodedAs,setContainsKeyword, codingSummary, selectContainsKeyword,selectShowCodedAs})=>{

  const [loadigData,setLoadingData]=useState(true)
  const [percentageBar,setPercentageBar]=useState(0)

  const [initialKeywords,setInitialKeywords]=useState({})
  const getData =async()=>{
    let keywords={}
    let data 
    let questionId =JSON.parse(localStorage.listOfQuestion)[questionNumber]._id
    data = await userActions.filteredPagination({filters:[], questionId:questionId})
    // data = await userActions.responsePagination({limit:3000,push:false,questionId:questionId})
    data = JSON.parse(data)?.result
    if(data !==null && data !=={}){
      data?.map((item)=>{
        let temp=[]
        let resNum=item?.resNum 

        if(item?.codewords?.length >0){
          
          item?.codewords?.map((_item)=>{
            if(_item?.active==true ){
              temp.push(_item?.tag)
            }
          })
        }
        keywords={...keywords,[resNum]:  temp }
      })

      setFilteredData(data)
      setInitialKeywords(keywords)
      setLoadingData(false)
    }
}
useEffect(() => {
  getData()
},[questionNumber])

useEffect(() => {
  socket.once('question-response-coded', operation=> {
    const temp=operation?.resOfCoded
    setPercentageBar(temp*1.0/codingSummary.totalRes)
  });
})

    const handleClickRemoveContainsKeyword=(e)=>{
      e.preventDefault()
      setContainsKeyword(null)
    }
    const handleClickRemoveShowCodedAs =(e)=>{
      e.preventDefault()
      setShowCodedAs(null)
    }
    return(
        <div className="codeit_rightmenu_" >
            <div className='flex width_100'>
              <div className='flex width_100'> 
                  <div className="flex">
                    Progress : <BorderLinearProgress variant="determinate" value={percentageBar}></BorderLinearProgress>
                  </div>
                  <div style={{marginLeft:"8px"}}>
                    Showing: {codingSummary.operatorRes} / {codingSummary.totalRes}
                  </div>
              </div>
              {selectShowCodedAs && 
                <div className='filteredOn flex'>
                  <p>Filtered On :</p>
                  <div className="selectShowCodedAs">
                    Coded As : [1] {selectShowCodedAs.code} <button onClick={handleClickRemoveShowCodedAs} >x</button>
                  </div>
                </div>
              }
              {selectContainsKeyword && 
                <div className='filteredOn flex'>
                  <p>Filtered On :</p>
                  <div className="selectShowCodedAs">
                    Contains Keyword : [1] {selectContainsKeyword.code} <button onClick={handleClickRemoveContainsKeyword} > x </button>
                  </div>
                </div>
              }
             </div>
            {filteredData && <ReactVirtualizedTable initialKeywords={initialKeywords} />}
        </div>
        //
    )
}
const mapStateToProps=createStructuredSelector({
    codes:selectCodes,
    selectnumberOfInputsGreaterThan2:selectnumberOfInputsGreaterThan2,
    selectShowCodedAs:selectShowCodedAs,
    selectContainsKeyword:selectContainsKeyword,
    filteredData:selectFilteredData,
    questionNumber:selectQuestionNumber,
    codingSummary:selectCodingSummary,
})
const mapDispatchToProps = dispatch => ({
  setShowCodedAs: collectionsMap => dispatch(setShowCodedAs(collectionsMap)),
  setContainsKeyword: collectionsMap => dispatch(setContainsKeyword(collectionsMap)),
  setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
});
export default connect(mapStateToProps,mapDispatchToProps)(CodeIt_RightMenu)