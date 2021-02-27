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

    return (
        <div className="UserProjectsDashboardHeader flex">
            <div className="left">
                <h4 className="flex">Group Tasks</h4>
            </div>
            <div className="right flex">
                <div className='sort flex'>
                    <span className='marginAuto' style={{ width: "-webkit-fill-available"}}>Sort By</span>
                     <FormControl className={classes.formControl}>
                       <NativeSelect
                         value={age}
                         onChange={handleChange}
                         name="age"
                         className={classes.selectEmpty}
                         inputProps={{ 'aria-label': 'age' }}
                       >
                            <option value={10}>Date Created</option>
                            <option value={20}>Date Created</option>
                            <option value={30}>Date Created</option>
                       </NativeSelect>
                     </FormControl>
                </div>
            
                <div className="search flex marginAuto">
                    <SearchIcon className="marginAuto"/>
                    <input type="text" />

                </div>

                <ul>
                <li>
                    <a href="#">User &#9662;</a>
                    <ul className="dropdown">
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">Invite</a></li>
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Log out</a></li>
                    </ul>
                </li>
                </ul>

            </div>
        </div>
    )
}

export default UserProjectsDashboardHeader
