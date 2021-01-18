import { TextField } from "@material-ui/core"
import React,{useState} from "react"
import "./SurveyDetails.css"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import {setSurveyDetails} from "../../../../Redux/SurveyDetails/survey-details.actions.js"
import surveyDetailsReducer from "../../../../Redux/SurveyDetails/survey-details.reducer";
import { selectSurveyDetails } from "../../../../Redux/SurveyDetails/survey-details.selectors";
import { createStructuredSelector } from "reselect"

// import TagsInput from 'react-tagsinput'

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
const SurveyDetails=({updateSurveyDetails,surveyDetailsFromStore})=>{
    const [surveyDetails,setSurveyDetails] = useState({
        name:"",
        description:'',
        industry:'',
        type:'',
        tags:[]
    })
    console.log(surveyDetailsFromStore)
  const handleChange = (event) => {
    const {value,name}=event.target;
    setSurveyDetails({...surveyDetails,[name]:value})
    console.log(surveyDetails)
    updateSurveyDetails(surveyDetails)
  };
  const handleChangeTags=event=>{
    setSurveyDetails({...surveyDetails,tags:[...surveyDetails.tags,event.target.value]})
    console.log(surveyDetails)
    updateSurveyDetails(surveyDetails)
  }
    return(
        <div className="survey_details">
            <div className='survey_details_top'>
                <p>SURVEY 1 of 1</p>
                <p>0</p>
            </div>
            <div className='survey_details_title'>
                <label style={{width:"60%"}} className="container">
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                    SURVEY
                </label>
                <a>See Example Row</a>
            </div>
            <div className='survey_details_main'>
                <div className="survey_details_main_left">
                    {/* <TextField
                    onChange={handleChange}
                    name="name"
                    value={surveyDetails.name}
                    size='small'
                    id="outlined-basic" label="NAME" variant="outlined" /> */}
                    <p>Name</p>
                    <h6>Please enter a title</h6>
                    <input
                    onChange={handleChange}
                    name="name"
                    value={surveyDetails.name}
                    size='small'
                    id="outlined-basic"
                    variant="outlined"
                    />

                    <p>DESCRIPTION</p>
                    <TextField
                        value={surveyDetails.description}
                        onChange={handleChange}
                        name="description"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                        size='small'
                    />
                </div>
                <div className="survey_details_main_right">

                <p>INDUSTRY</p>
                <TextField
                    onChange={handleChange}
                    name="industry"
                    id="outlined-select-currency"
                    select
                    // label="INDUSTRY"
                    value={surveyDetails.industry}
                    // helperText="Please select your currency"
                    variant="outlined"
                    size='small'
                >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>

                <p>TYPE</p>
                <TextField
                    id="outlined-select-currency"
                    select
                    // label="TYPE"
                    value={surveyDetails.type}
                    name="type"
                    onChange={handleChange}
                    // helperText="Please select your currency"
                    variant="outlined"
                    size='small'
                >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                {/* <TagsInput 
                    // id="standard-secondary"
                    label="TAGS"
                    // color="secondary"
                    value={surveyDetails.tags}
                    onChange={handleChangeTags}
                    name="tags"
                    // size='small'
                /> */}
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    updateSurveyDetails: collectionsMap => dispatch(setSurveyDetails(collectionsMap))
});
const mapStateToProps=createStructuredSelector({
  surveyDetailsFromStore:selectSurveyDetails,
})
export default connect(mapStateToProps,mapDispatchToProps)(SurveyDetails)