import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '&.MuiTextField-root': {
        margin: theme.spacing(1),
        width: '400px',
      },
      "&.MuiFormControl-root":{
        width:"400px",
        maxWidth:"400px !important"
      }
    },
    button:{width:"300px !important",alignSelf:"center!important",marginTop:"10px!important"},
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
  }));


function AddCategoryDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open,id,createNewCategory } = props;
    const [name, setName] = React.useState();

    const handleChange = (event) => {
      setName(event.target.value);
    };
    const handleClose = () => {
      onClose();
    };
  
    const submitNewCategory=()=>{
        createNewCategory(name,id,undefined)
        onClose()
    }
    
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add a Category</DialogTitle>
        <TextField
          className={classes.root}
          style={{width:"400px !important"}}
          id="outlined-uncontrolled"
          label="Category Name"
          defaultValue=""
          variant="outlined"
          value={name}
          onChange={handleChange}
        />
        <Button onClick={submitNewCategory} className={classes.button} variant="contained" color="primary">
            Create Category
        </Button>
      </Dialog>
    );
  }
  
  AddCategoryDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
export default AddCategoryDialog