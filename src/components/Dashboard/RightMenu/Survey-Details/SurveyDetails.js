import { TextField } from "@material-ui/core"
import React,{useState,useEffect} from "react"
import "./SurveyDetails.css"
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import {setSurveyDetails} from "../../../../Redux/SurveyDetails/survey-details.actions.js"
import surveyDetailsReducer from "../../../../Redux/SurveyDetails/survey-details.reducer";
import { selectSurveyDetails } from "../../../../Redux/SurveyDetails/survey-details.selectors";
import { createStructuredSelector } from "reselect"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {Select as DropDownSelect} from 'react-dropdown-select';
import { userActions } from "../../../../_actions";

const options=[
  {
    "id":"asdasd",
    "label": "Gladysasdas17@gmail.com",
    "value":"adsd",
  },{
    "id":"asdasdadas",
    "value":"ads234d",
    "label": "Gladyfds123s17@gmail.com",
  },{
    "value":"adsasdad",
    "id":"asdas234d",
    "label": "Gla5435dys17@gmail.com",
  },{
    "value":"ads0987d",
    "id":"asdassdfsdfd",
    "label": "Gladys15767@gmail.com",
  },{
    "value":"ads564ad",
    "id":"asdas6546sdfd",
    "label": "Glad680ys17@gmail.com",
  },{
    "value":"adssdf352sdfd",
    "id":"asdaas65d46q4wsd",
    "label": "Gladys17@gmail.com",
  },
]

// import TagsInput from 'react-tagsinput'

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SurveyDetails=({updateSurveyDetails,surveyDetailsFromStore})=>{
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [options,setOptions]=useState([])
  const [searchValue,setSearchValue]=useState("")
  const [loading,setLoading]=useState(false)
    const [surveyDetails,setSurveyDetails] = useState({
        name:surveyDetailsFromStore ? surveyDetailsFromStore?.name : "",
        description:surveyDetailsFromStore ? surveyDetailsFromStore?.description : "",
        industry:surveyDetailsFromStore ? surveyDetailsFromStore?.industry : "",
        type:surveyDetailsFromStore ? surveyDetailsFromStore?.type : "",
        tags:surveyDetailsFromStore ? surveyDetailsFromStore?.tags : []
    })

    useEffect(async () => {
          setLoading(true)
          let data = await userActions.userSearch("xoc")
          setOptions(data)
          setLoading(false)
    }, [])

  const handleChange = async (event) => {
    const {value,name}=event.target;
    setSurveyDetails({...surveyDetails,[name]:value})
    updateSurveyDetails({...surveyDetails,[name]:value})
    
  };
  const handleChangeTags=val=>{
    setSurveyDetails({...surveyDetails,tags:val });
    updateSurveyDetails({...surveyDetails,tags:val })
    
  }

  useEffect(async () => {
    let value=searchValue
    if(value?.length >=1){
      setLoading(true)
      let data = await userActions.userSearch(value)
      setOptions(data)
      setLoading(false)
    }
  }, [searchValue])

    return(
        <div className="survey_details">
            <div className='survey_details_top'>
                <p>SURVEY 1 of 1</p>
                <p>1</p>
            </div>
            <div className='survey_details_title'>
                <label style={{width:"60%"}} className="container">
                    <span className="checkmark" />
                    SURVEY
                </label>
            </div>
            <div className='survey_details_main'>
                <div className="survey_details_main_left">
                    <p>Name</p>
                    <h6>Please enter a title <span style={{color:"#D60409"}} >*required</span> </h6>
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
                <p>ASSIGN PROJECT</p>
                      <DropDownSelect
                        multi
                        searchable
                        loading={loading}
                        options={options}
                        valueField="_id"
                        labelField="email"
                        placeholder="Tag People"
                        searchFn={e=>setSearchValue(e.state.search)}
                        onChange={(values) => handleChangeTags(values)}
                        clearable
                        direction='rtl'
                        dropdownPosition='auto'
                        backspaceDelete
                      />
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