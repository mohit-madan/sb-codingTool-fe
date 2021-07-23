import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { socket } from "../../../../../config"
import { selectCodes, selectLeftMenuCodes } from "../../../../../Redux/CodeitData/codeit-data.selectors";

function Form(props) {

  const [name, setName] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    let temp=false
    props.leftMenuCodes?.map((item)=>{
      if(item?.name==name){
        temp=true
        return
      }
    })
    if(temp){
      alert("Codeword with the same name exists")
      return
    }
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

const mapStateToProps=createStructuredSelector({
  leftMenuCodes:selectLeftMenuCodes,
})

export default connect(mapStateToProps)(Form);
