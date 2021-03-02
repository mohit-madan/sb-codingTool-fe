import  Tab from "../../Dashboard/RightMenu/Table.js"
import React,{useEffect,useState,Component} from "react"
import "./CodeIt_RightMenu.scss"
import CodeItTable from "./CodeIt_Table.js"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from "react-redux";
import { selectCodes, selectFilteredData, selectnumberOfInputsGreaterThan2, selectProgressLength, selectQuestionNumber } from "../../../Redux/CodeitData/codeit-data.selectors.js";
import { createStructuredSelector } from "reselect";
import { selectShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.selectors.js";
import { selectContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.selectors.js";
import { setShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.actions.js";
import { setContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.actions.js";
import { userActions } from "../../../_actions/index.js";
import { setFilteredData } from "../../../Redux/CodeitData/codeit-data.actions.js";
import ReactVirtualizedTable from "./material-ui-table.js";

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

const CodeIt_RightMenu =({questionNumber,setFilteredData,filteredData,setShowCodedAs,setContainsKeyword,selectContainsKeyword,progressNumber,codes,selectnumberOfInputsGreaterThan2,selectShowCodedAs})=>{

  const [loadigData,setLoadingData]=useState(true)
  
  const [initialKeywords,setInitialKeywords]=useState({})

  const getData =async()=>{
    let keywords={}
    let data 
    data = await userActions.responsePagination({pageNumber:1,limit:3000,push:false,questionId:localStorage.listOfQuestion?.split(',')[questionNumber]})
    data = JSON.parse(data)
    console.log(`filtered data from right menu .js after parsing`)
    if(data !==null && data !=={}){
      console.log(`hello from rightmenu .js`,data)

      data?.map((item)=>{
        let temp=[]
        if(item?.codewords?.length >0){
          
          item?.codewords?.map((_item)=>{
            if(_item?.active==true){
              return temp.push(_item?.tag)
            }
          })
        }
        let resNum=item?.resNum 
        return keywords={...keywords,[resNum]:  temp }
      })

      setFilteredData(data)
      setInitialKeywords(keywords)
      console.log(filteredData)
      setLoadingData(false)
    }
}
useEffect(() => {
  getData()
},[questionNumber])

    const handleClickRemoveContainsKeyword=(e)=>{
      e.preventDefault()
      setContainsKeyword(null)
    }
    const handleClickRemoveShowCodedAs =(e)=>{
      e.preventDefault()
      setShowCodedAs(null)
      console.log(`eve`)
    }
    const [reachedEnd,setReachedEnd]=useState(false)


    return(
        <div className="codeit_rightmenu_" >
            <div className='flex width_100'>
              <div className='flex width_100 spaceBetween'> 
                  <div className="flex">
                    Progress : <BorderLinearProgress variant="determinate" value={50} />
                  </div>
                  {/* <h5>{filteredData?.length} Responses Loaded Out Of {`3000`} </h5> */}
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

            {/* <div className="codeit_rightmenu" >
               <CodeItTable reachedEnd={reachedEnd}/>
            </div> */}
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
})
const mapDispatchToProps = dispatch => ({
  setShowCodedAs: collectionsMap => dispatch(setShowCodedAs(collectionsMap)),
  setContainsKeyword: collectionsMap => dispatch(setContainsKeyword(collectionsMap)),
  setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
});
export default connect(mapStateToProps,mapDispatchToProps)(CodeIt_RightMenu)