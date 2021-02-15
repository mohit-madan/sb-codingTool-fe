import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../../../../config"

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    socket.once('left-menu-submit-edited-code', ({id, newName}) => {
      console.log({id, newName})
      props.editTask(id, newName);
      setNewName("");
      setEditing(false);
    })
  })

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    let id =props.id
    socket.emit('left-menu-submit-edited-code',{id, newName})
  }

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
    <div className="flex width_100">
      <div className="flex align_start space_between left " >
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.id?.split(" ")[props.id?.split(" ").length -1]}.
            {/* str.split(" ")[str.split(" ").length -1] */}
          </label>
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group right flex">
        <label className="todo-label" style={{marginRight:"10px"}} htmlFor={props.id}>
          86.72%(73)
        </label>
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            Edit
            {/* Edit <span className="visually-hidden">{props.name}</span> */}
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            {/* Delete <span className="visually-hidden">{props.name}</span> */}
            Delete
          </button>
        </div>
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


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
