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
const industries=[
  {
  "name": "Industry "
  },
  {
  "name": "Accounting "
  },
  {
  "name": "Airlines/Aviation"
  },
  {
  "name": "Alternative Dispute Resolution"
  },
  {
  "name": "Alternative Medicine"
  },
  {
  "name": "Animation"
  },
  {
  "name": "Apparel/Fashion"
  },
  {
  "name": "Architecture/Planning"
  },
  {
  "name": "Arts/Crafts"
  },
  {
  "name": "Automotive"
  },
  {
  "name": "Aviation/Aerospace"
  },
  {
  "name": "Banking/Mortgage"
  },
  {
  "name": "Biotechnology/Greentech"
  },
  {
  "name": "Broadcast Media"
  },
  {
  "name": "Building Materials"
  },
  {
  "name": "Business Supplies/Equipment"
  },
  {
  "name": "Capital Markets/Hedge Fund/Private Equity"
  },
  {
  "name": "Chemicals"
  },
  {
  "name": "Civic/Social Organization"
  },
  {
  "name": "Civil Engineering"
  },
  {
  "name": "Commercial Real Estate"
  },
  {
  "name": "Computer Games"
  },
  {
  "name": "Computer Hardware"
  },
  {
  "name": "Computer Networking"
  },
  {
  "name": "Computer Software/Engineering"
  },
  {
  "name": "Computer/Network Security"
  },
  {
  "name": "Construction"
  },
  {
  "name": "Consumer Electronics"
  },
  {
  "name": "Consumer Goods"
  },
  {
  "name": "Consumer Services"
  },
  {
  "name": "Cosmetics"
  },
  {
  "name": "Dairy"
  },
  {
  "name": "Defense/Space"
  },
  {
  "name": "Design"
  },
  {
  "name": "E-Learning"
  },
  {
  "name": "Education Management"
  },
  {
  "name": "Electrical/Electronic Manufacturing"
  },
  {
  "name": "Entertainment/Movie Production"
  },
  {
  "name": "Environmental Services"
  },
  {
  "name": "Events Services"
  },
  {
  "name": "Executive Office"
  },
  {
  "name": "Facilities Services"
  },
  {
  "name": "Farming"
  },
  {
  "name": "Financial Services"
  },
  {
  "name": "Fine Art"
  },
  {
  "name": "Fishery"
  },
  {
  "name": "Food Production"
  },
  {
  "name": "Food/Beverages"
  },
  {
  "name": "Fundraising"
  },
  {
  "name": "Furniture"
  },
  {
  "name": "Gambling/Casinos"
  },
  {
  "name": "Glass/Ceramics/Concrete"
  },
  {
  "name": "Government Administration"
  },
  {
  "name": "Government Relations"
  },
  {
  "name": "Graphic Design/Web Design"
  },
  {
  "name": "Health/Fitness"
  },
  {
  "name": "Higher Education/Acadamia"
  },
  {
  "name": "Hospital/Health Care"
  },
  {
  "name": "Hospitality"
  },
  {
  "name": "Human Resources/HR"
  },
  {
  "name": "Import/Export"
  },
  {
  "name": "Individual/Family Services"
  },
  {
  "name": "Industrial Automation"
  },
  {
  "name": "Information Services"
  },
  {
  "name": "Information Technology/IT"
  },
  {
  "name": "Insurance"
  },
  {
  "name": "International Affairs"
  },
  {
  "name": "International Trade/Development"
  },
  {
  "name": "Internet"
  },
  {
  "name": "Investment Banking/Venture"
  },
  {
  "name": "Investment Management/Hedge Fund/Private Equity"
  },
  {
  "name": "Judiciary"
  },
  {
  "name": "Law Enforcement"
  },
  {
  "name": "Law Practice/Law Firms"
  },
  {
  "name": "Legal Services"
  },
  {
  "name": "Legislative Office"
  },
  {
  "name": "Leisure/Travel"
  },
  {
  "name": "Library"
  },
  {
  "name": "Logistics/Procurement"
  },
  {
  "name": "Luxury Goods/Jewelry"
  },
  {
  "name": "Machinery"
  },
  {
  "name": "Management Consulting"
  },
  {
  "name": "Maritime"
  },
  {
  "name": "Market Research"
  },
  {
  "name": "Marketing/Advertising/Sales"
  },
  {
  "name": "Mechanical or Industrial Engineering"
  },
  {
  "name": "Media Production"
  },
  {
  "name": "Medical Equipment"
  },
  {
  "name": "Medical Practice"
  },
  {
  "name": "Mental Health Care"
  },
  {
  "name": "Military Industry"
  },
  {
  "name": "Mining/Metals"
  },
  {
  "name": "Motion Pictures/Film"
  },
  {
  "name": "Museums/Institutions"
  },
  {
  "name": "Music"
  },
  {
  "name": "Nanotechnology"
  },
  {
  "name": "Newspapers/Journalism"
  },
  {
  "name": "Non-Profit/Volunteering"
  },
  {
  "name": "Oil/Energy/Solar/Greentech"
  },
  {
  "name": "Online Publishing"
  },
  {
  "name": "Other Industry"
  },
  {
  "name": "Outsourcing/Offshoring"
  },
  {
  "name": "Package/Freight Delivery"
  },
  {
  "name": "Packaging/Containers"
  },
  {
  "name": "Paper/Forest Products"
  },
  {
  "name": "Performing Arts"
  },
  {
  "name": "Pharmaceuticals"
  },
  {
  "name": "Philanthropy"
  },
  {
  "name": "Photography"
  },
  {
  "name": "Plastics"
  },
  {
  "name": "Political Organization"
  },
  {
  "name": "Primary/Secondary Education"
  },
  {
  "name": "Printing"
  },
  {
  "name": "Professional Training"
  },
  {
  "name": "Program Development"
  },
  {
  "name": "Public Relations/PR"
  },
  {
  "name": "Public Safety"
  },
  {
  "name": "Publishing Industry"
  },
  {
  "name": "Railroad Manufacture"
  },
  {
  "name": "Ranching"
  },
  {
  "name": "Real Estate/Mortgage"
  },
  {
  "name": "Recreational Facilities/Services"
  },
  {
  "name": "Religious Institutions"
  },
  {
  "name": "Renewables/Environment"
  },
  {
  "name": "Research Industry"
  },
  {
  "name": "Restaurants"
  },
  {
  "name": "Retail Industry"
  },
  {
  "name": "Security/Investigations"
  },
  {
  "name": "Semiconductors"
  },
  {
  "name": "Shipbuilding"
  },
  {
  "name": "Sporting Goods"
  },
  {
  "name": "Sports"
  },
  {
  "name": "Staffing/Recruiting"
  },
  {
  "name": "Supermarkets"
  },
  {
  "name": "Telecommunications"
  },
  {
  "name": "Textiles"
  },
  {
  "name": "Think Tanks"
  },
  {
  "name": "Tobacco"
  },
  {
  "name": "Translation/Localization"
  },
  {
  "name": "Transportation"
  },
  {
  "name": "Utilities"
  },
  {
  "name": "Venture Capital/VC"
  },
  {
  "name": "Veterinary"
  },
  {
  "name": "Warehousing"
  },
  {
  "name": "Wholesale"
  },
  {
  "name": "Wine/Spirits"
  },
  {
  "name": "Wireless"
  },
  {
  "name": "Writing/Editing"
  }
  ]
const types=[
  {name:"Ad Test"},
  {name:"Audience Feedback"},
  {name:"Ad Test"},
  {name:"Brand Study"},
  {name:"Consumer Behaviour"},
  {name:"Customer Satisfaction"},
  {name:"Employee Satisfaction"},
  {name:"Event Feedback"},
  {name:"NPS"},
  {name:"Other"},
  {name:"Product Feedback"},
  {name:"Service Cancellation"},
  {name:"Service Feedback"},
  {name:"Unaided Awareness"},
]
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
                    {industries.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
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
                    {types.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
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