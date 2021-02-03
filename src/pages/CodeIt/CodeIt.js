import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import LeftMenu from "../../components/Dashboard/LeftMenu/LeftMenu.js"
import RightMenu from "../../components/Dashboard/RightMenu/RightMenu.js"
import Footer from "../../components/Footer/Footer.js"
import Navigation from "../../components/Navigation/Navigation.js"
import ProgressBar from "../../components/ProgressBar/ProgressBar.js"
import "./CodeIt.css"
import {selectProgressNumber} from "../../Redux/Progress-number/progress.selectors.js"
import CodeIt_RightMenu from "../../components/CodeIt/CodeIt_RightMenu/CodeIt_RightMenu.js"
import CodeIt_LeftMenu from "../../components/CodeIt/CodeIt_LeftMenu/CodeIt_LeftMenu.js"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    maxWidth: "max-content",
    marginLeft:50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CodeIt=({progressNumber})=>{
      const classes = useStyles();
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return(
        <div className="uploader_page">
            <Navigation />
            <ProgressBar progressNumber={progressNumber}/>

            <FormControl className={classes.formControl}>
               <InputLabel id="demo-simple-select-label">Question</InputLabel>
               <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                 value={age}
                 displayEmpty
                 onChange={handleChange}
                 className={classes.selectEmpty}
                 inputProps={{ 'aria-label': 'Without label' }}
               >
                <MenuItem value="" disabled>
                    Select Question
                </MenuItem>
                 <MenuItem value={10}>Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)
                </MenuItem>
               </Select>
            </FormControl>

                <div className="dash codeit_dash">
                    <CodeIt_LeftMenu progressNumber={progressNumber}/>
                    <CodeIt_RightMenu progressNumber={progressNumber}/>
                </div>
            <Footer progressNumber={progressNumber} />
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    progressNumber:selectProgressNumber,
})
export default connect(mapStateToProps,null)(CodeIt)