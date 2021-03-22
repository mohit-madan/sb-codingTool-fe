import React,{useEffect} from 'react'
import "./UserProjectsDashboardHeader.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Link } from 'react-router-dom';
import { history } from '../../../_helpers';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function UserProjectsDashboardHeader() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const logout=()=>{
      localStorage.clear()
      history.push('/login')
    }

    return (
        <div className="UserProjectsDashboardHeader flex">
            <div className="left">
                <h4 className="flex">Group Tasks</h4>
            </div>
            <div className="right flex">

                <div className="dropdown" style={{float:"right"}}>
                  <button className="dropbtn">
                    <img className="dropbtn" src="https://w7.pngwing.com/pngs/518/320/png-transparent-computer-icons-mobile-app-development-android-my-account-icon-blue-text-logo.png" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="/user/profile">Profile</Link>
                    <Link onClick={logout} >Log Out</Link>
                    {/* <a href="#">Link 2</a> */}
                    {/* <a href="#">Link 3</a> */}
                  </div>
                </div>

            </div>
        </div>
    )
}

export default UserProjectsDashboardHeader
