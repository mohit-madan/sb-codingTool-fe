import  Tab from "../../Dashboard/RightMenu/Table.js"
import React,{useEffect} from "react"
import "./CodeIt_RightMenu.css"
import CodeItTable from "./CodeIt_Table.js"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from "react-redux";
import { selectCodes, selectnumberOfInputsGreaterThan2, selectProgressLength } from "../../../Redux/CodeitData/codeit-data.selectors.js";
import { createStructuredSelector } from "reselect";

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

const CodeIt_RightMenu =({progressNumber,codes,selectnumberOfInputsGreaterThan2})=>{
    
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
    return(
        <div>
            <div className='flex'>
        Progress : <BorderLinearProgress variant="determinate" value={(selectnumberOfInputsGreaterThan2/3000)*10000000} />
        </div>
        <div className="codeit_rightmenu">
            <CodeItTable />
        </div></div>
    )
}
const mapStateToProps=createStructuredSelector({
    codes:selectCodes,
    selectnumberOfInputsGreaterThan2:selectnumberOfInputsGreaterThan2,
})
export default connect(mapStateToProps)(CodeIt_RightMenu)