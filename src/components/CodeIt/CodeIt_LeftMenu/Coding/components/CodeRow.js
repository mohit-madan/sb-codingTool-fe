import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../../../../config"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
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
import AddCategoryDialog from "./AddCategoryDialog";
import ChooseCategory from "./ChooseCategory";
import "./styles.css"

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function CodeRow(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  // useEffect(() => {
  //   socket.once('left-menu-submit-edited-code', ({id, newName}) => {
  //     props.editTask(id, newName);
  //     setNewName("");
  //     setEditing(false);
  //   })
  // })

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    let id =props.id
    let oldName=props.name
    socket.emit('editCodeword',{codewordId:id, codeword:newName,oldName:oldName})
    setEditing(false)
  }
  
  const [open, setOpen] = React.useState(false);
  const [openChooseCategory,setOpenChooseCategory]=useState(false)
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleClickOpenChooseCategory = () => {
    setOpenChooseCategory(true);
  };

  const handleCloseChooseCategory = (value) => {
    setOpenChooseCategory(false);
    setSelectedValue(value);
    props.addToCategory(props.id,value)
  };

  const editingTemplate = (
    <form className="flex space_between width_auto" onSubmit={handleSubmit}>
      <div className="form-group left">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="flex right">

        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          {/* <span className="visually-hidden">renaming {props.name}</span> */}
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          {/* <span className="visually-hidden">new name for {props.name}</span> */}
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div >
    <ContextMenuTrigger id={props.id}>

    <div className={"flex width_100 "} >
      <div className="flex align_start space_between left " >
          {/* <input
            id={props.id}
            type="checkbox"
            checked={props.completed}
          /> */}
          <label className="todo-label" htmlFor={props.id}>
            {/* {props.id?.split(" ")[props.id?.split(" ").length -1]}. */}
            {props.index +1}.
            {/* str.split(" ")[str.split(" ").length -1] */}
          </label>
          <label  className={"todo-label " +  (props.completed ? `` : `disabledCodeStyle`)} htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group right flex">
        <label className="todo-label" style={{marginRight:"10px"}} htmlFor={props.id}>
          {props.percentage}
        </label>
        {/* <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            Edit */}
            {/* Edit <span className="visually-hidden">{props.name}</span> */}
          {/* </button>
          <button */}
            {/* type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          > */}
            {/* Delete <span className="visually-hidden">{props.name}</span> */}
            {/* Delete
          </button> */}
        </div>
    </div>
    </ContextMenuTrigger>
    <ContextMenu id={props.id}>
      {/* props.completed */}
        <MenuItem data={{category: props.category}} onClick={() => setEditing(true)}>
          <p ref={editButtonRef} onClick={() => setEditing(true)}>Edit</p>
        </MenuItem>

        <MenuItem data={{category: props.category}} onClick={() => props.deleteTask(props.id)}>
          <p onClick={() => props.deleteTask(props.id)}>Delete</p>
        </MenuItem>

        <MenuItem data={{category: props.category}} onClick={() => props.toggleTaskCompleted(props.id,props.completed)}>
          <p  onClick={() => props.toggleTaskCompleted(props.id,props.completed)}>{ props.completed ? "Disable" : "Enable"}</p>
        </MenuItem>

        <MenuItem data={{category: props.category}}>
          Details
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{name: props.name}}>
          <p onClick={handleClickOpenChooseCategory}>Add to Existing Category</p>
          <ChooseCategory nodes={props.nodes} addToCategory={props.addToCategory} selectedValue={selectedValue} open={openChooseCategory} onClose={handleCloseChooseCategory} />
        </MenuItem>
        <MenuItem data={{name: props.name}}>
          <p onClick={handleClickOpen}>Add to New Category</p>
          <div>
            <AddCategoryDialog createNewCategory={props.createNewCategory} id={props.id} selectedValue={selectedValue} open={open} onClose={handleClose} />
          </div>
        </MenuItem>

      </ContextMenu>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className={"todo " +  (props.ctrlClickActive ? `ctrlClickSelected` : ``)}  onClick={e=>props.ctrlClick(e,props.id)}>{isEditing ? editingTemplate : viewTemplate}</li>;
}
