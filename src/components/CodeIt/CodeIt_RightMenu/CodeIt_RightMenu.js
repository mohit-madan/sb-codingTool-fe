import  Tab from "../../Dashboard/RightMenu/Table.js"
import React,{useEffect,useState,Component} from "react"
import "./CodeIt_RightMenu.css"
import CodeItTable from "./CodeIt_Table.js"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from "react-redux";
import { selectCodes, selectnumberOfInputsGreaterThan2, selectProgressLength } from "../../../Redux/CodeitData/codeit-data.selectors.js";
import { createStructuredSelector } from "reselect";
import { selectShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.selectors.js";
import { selectContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.selectors.js";
import { setShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.actions.js";
import { setContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.actions.js";

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

const CodeIt_RightMenu =({setShowCodedAs,setContainsKeyword,selectContainsKeyword,progressNumber,codes,selectnumberOfInputsGreaterThan2,selectShowCodedAs})=>{

    const handleClickRemoveContainsKeyword=(e)=>{
      e.preventDefault()
      setContainsKeyword(null)
    }
    const handleClickRemoveShowCodedAs =(e)=>{
      e.preventDefault()
      setShowCodedAs(null)
      console.log(`eve`)
    }
    const handleScroll = (e) => {
      e.preventDefault()
      var temp1=Math.round(e.target.scrollHeight - e.target.scrollTop)
      const bottom = temp1 === e.target.clientHeight;
      // console.log(`REahed End `)
      //       console.log(Math.round(e.target.scrollHeight - e.target.scrollTop))
      //       console.log(e.target.clientHeight)
      // console.log(Math.round(e.target.scrollHeight - e.target.scrollTop)+10 === e.target.clientHeight)
      if (bottom) {
        setReachedEnd(true)
        return
      }else{
        setReachedEnd(false)
        return
      }
    }
    const [reachedEnd,setReachedEnd]=useState(false)

    return(
        <div className="codeit_rightmenu_"  onScroll={handleScroll}>
            <div className='flex'>
              <div className='flex'> Progress : <BorderLinearProgress variant="determinate" value={50} />
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

            <div className="codeit_rightmenu" >
                <CodeItTable reachedEnd={reachedEnd}/>
            </div>
        </div>
        //
    )
}
const mapStateToProps=createStructuredSelector({
    codes:selectCodes,
    selectnumberOfInputsGreaterThan2:selectnumberOfInputsGreaterThan2,
    selectShowCodedAs:selectShowCodedAs,
    selectContainsKeyword:selectContainsKeyword,
})
const mapDispatchToProps = dispatch => ({
  setShowCodedAs: collectionsMap => dispatch(setShowCodedAs(collectionsMap)),
  setContainsKeyword: collectionsMap => dispatch(setContainsKeyword(collectionsMap)),
});
export default connect(mapStateToProps,mapDispatchToProps)(CodeIt_RightMenu)