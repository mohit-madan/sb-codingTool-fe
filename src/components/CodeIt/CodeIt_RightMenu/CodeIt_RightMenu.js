import  Tab from "../../Dashboard/RightMenu/Table.js"
import React,{useEffect} from "react"
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
    
    // const [progressLength,setProgressLength]=React.useState(0)

    // Object.size = function(obj) {
    //     var size = 0,
    //       key;
    //     for (key in obj) {
    //       if (obj.hasOwnProperty(key)) size++;
    //     }
    //     return size;
    //   }

    //   var count=0;

    // useEffect(()=>{
    //     console.log(progressLength)
    //     for(let i=0;i<Object.size(codes);i++){
    //         if(codes[i].length>2){
    //             count++
    //         }
    //     }
    //     setProgressLength(count/Object.size(codes))
    // },[codes])
    // useEffect(() => {
    //   console.log(progressLength*10000)
    // }, [progressLength])
    useEffect(() => {
      console.log((selectnumberOfInputsGreaterThan2/3000)*10000000)
    }, [selectnumberOfInputsGreaterThan2])

    const handleClickRemoveContainsKeyword=(e)=>{
      e.preventDefault()
      setContainsKeyword(null)
    }
    const handleClickRemoveShowCodedAs =(e)=>{
      e.preventDefault()
      setShowCodedAs(null)
      console.log(`eve`)
    }

    return(
        <div className="codeit_rightmenu_">
            <div className='flex'>
              <div className='flex'> Progress : <BorderLinearProgress variant="determinate" value={(selectnumberOfInputsGreaterThan2/3000)*10000000} />
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

            <div className="codeit_rightmenu">
                <CodeItTable />
            </div>
        </div>
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