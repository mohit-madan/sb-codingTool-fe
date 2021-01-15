import { TextField } from "@material-ui/core"
import React,{useState} from "react"
import "./SurveyDetails.css"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import {setSurveyDetails} from "../../../../Redux/SurveyDetails/survey-details.actions.js"
import surveyDetailsReducer from "../../../../Redux/SurveyDetails/survey-details.reducer";

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
const SurveyDetails=({updateSurveyDetails})=>{
  const [industry, setIndustry] = React.useState('Arts & Performing Arts');
    const [surveyDetails,setSurveyDetails] = useState({
        name:"",
        description:'',
        industry:'',
        type:'',
        tags:''
    })
  const handleChange = (event) => {
    const {value,name}=event.target;
    setSurveyDetails({...surveyDetails,[name]:value})
    console.log(surveyDetails)
    updateSurveyDetails(surveyDetails)
  };
    return(
        <div className="survey_details">
            <div className='survey_details_top'>
                <p>SURVEY 1 of 1</p>
                <p>0</p>
            </div>
            <div className='survey_details_title'>
                <label className="container">
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                    SURVEY
                </label>
                <a>See Example Row</a>
            </div>
            <div className='survey_details_main'>
                <div className="survey_details_main_left">
                    <TextField
                    onChange={handleChange}
                    name="name"
                    value={surveyDetails.name}
                    id="outlined-basic" label="NAME" variant="outlined" />
                    <TextField
                        value={surveyDetails.description}
                        onChange={handleChange}
                        name="description"
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                    />
                </div>
                <div className="survey_details_main_right">
                <TextField
                    onChange={handleChange}
                    name="industry"
                    id="outlined-select-currency"
                    select
                    label="INDUSTRY"
                    value={surveyDetails.industry}
                    helperText="Please select your currency"
                    variant="outlined"
                >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="TYPE"
                    value={surveyDetails.type}
                    name="type"
                    onChange={handleChange}
                    helperText="Please select your currency"
                    variant="outlined"
                >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="standard-secondary"
                    label="TAGS"
                    color="secondary"
                    value={surveyDetails.tags}
                    onChange={handleChange}
                    name="tags"
                />
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    updateSurveyDetails: collectionsMap => dispatch(setSurveyDetails(collectionsMap))
});
export default connect(null,mapDispatchToProps)(SurveyDetails)