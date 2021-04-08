import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { socket } from "../../../../../config"
import { selectCodes, selectLeftMenuCodes } from "../../../../../Redux/CodeitData/codeit-data.selectors";

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
    let temp=false
    console.log(props.leftMenuCodes)
    props.leftMenuCodes?.map((item)=>{
      console.log("comparision",item?.name==name,name,item)
      if(item?.name==name){
        temp=true
        return
      }
    })
    if(temp){
      alert("Codeword with the same name exists")
      return
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

const mapStateToProps=createStructuredSelector({
  leftMenuCodes:selectLeftMenuCodes,
})

export default connect(mapStateToProps)(Form);
