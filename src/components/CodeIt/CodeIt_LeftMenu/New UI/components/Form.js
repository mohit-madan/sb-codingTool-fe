import React, { useState,useEffect } from "react";
import { socket } from "../../../../../config"

function Form(props) {

  const [name, setName] = useState('');

  useEffect(() => {
    // socket.once('left-menu-form-box', ({values}) => {
    //   console.log(values)
    //   setName(values);
    // })
    // socket.once('left-menu-add-code', ({values}) => {
    //   // console.log(values)
    //   // props.addTask(values);
    //   // setName("");
    // })
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    console.log(name)
      props.addTask(name);
      setName("");
    socket.emit('left-menu-add-code',name)
  }

  function handleChange(e) {
    let value=e.target.value 
    setName(value)
    // socket.emit('left-menu-form-box',value)
  }


  return (
    <form onSubmit={handleSubmit} className="form">
      {/* <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What to add a code?
        </label>
      </h2> */}

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder="Add a code  . . . . . "
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add Code
      </button>
    </form>
  );
}

export default Form;
