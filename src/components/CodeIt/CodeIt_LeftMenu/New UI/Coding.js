import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import "./components/styles.css"
import { socket } from "../../../../config"
import { userActions } from "../../../../_actions";
import { connect } from "react-redux";
import { selectQuestionNumber } from "../../../../Redux/CodeitData/codeit-data.selectors";
import { createStructuredSelector } from "reselect";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function NEWUI(props) {
  let prev=0,next=0
  // const [prev,setPrev]=useState(0)
  // const [next,setPrev]=useState(0)
  const  [ count,setCount]=useState(1)
  const _tasks = [
    // { id: "1", name: "Code-1", completed: true },
    // { id: "2", name: "Code-2", completed: true },
    // { id: "3", name: "Code-3", completed: true },
  ];
  useEffect(async () => {
    //  call api call 
    socket.emit('joinRoom',{room: localStorage.listOfQuestion, username: JSON.parse(localStorage.user).user.email }); //here {room: questionId, username: loginUser }

    let codewords = await userActions.questionCodebookId(localStorage.listOfQuestion?.split(',')[props.questionNumber])
    setTasks(codewords)
  }, [])
  
  const [tasks, setTasks] = useState(_tasks);
  const [filter, setFilter] = useState('All');

  useEffect(()=>{
    socket.once('left-menu-codes-object', (value) => {
      console.log(value)
      setTasks(value)
    })
    socket.once('edit-codeword-to-list', editCodeword=>{
      if(next<prev){
        const {codeword,codewordId}=editCodeword
        console.log(editCodeword)
        const editedTaskList = tasks.map(task => {
          // if this task has the same ID as the edited task
            if (codewordId === task.id) {
              //
              return {...task, name: codeword}
            }
            return task;
          });
          setTasks(editedTaskList);
          next=next+0.5
      }
    });
    socket.once('delete-codeword-to-list', deleteCodeword=>{
      if(next<prev){
        const {codewordId} = deleteCodeword
        console.log(deleteCodeword)
        const remainingTasks = tasks.filter(task => codewordId !== task.id);
        setTasks(remainingTasks);
        next=next+1
      }
    });
    socket.once('add-new-codeword-to-list', (value)=>{
      if(next<prev){
        console.log(value)
        const {codeword,codewordId} = value
        // const newTask = { id: "todo-" + nanoid()+` ${count-1}`, name: codeword, completed: true };
        const newTask = { id: `${codewordId}`, name: codeword, completed: true };
        setTasks([...tasks, newTask]);
        next=next+1
      }
    });
  })

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    // setTasks(updatedTasks);
    socket.emit('left-menu-codes-object',updatedTasks)
  }


  function deleteTask(id) {
    prev=prev+1
    const remainingTasks = tasks.filter(task => id !== task.id);
    let deleteCodeword = {"codewordId":id}
    socket.emit('deleteCodeword', deleteCodeword);
    // setTasks(remainingTasks);
    // socket.emit('left-menu-codes-object',remainingTasks)
  }


  function editTask(id, newName) {
    prev=prev+1
    // const editedTaskList = tasks.map(task => {
    // // if this task has the same ID as the edited task
    //   if (id === task.id) {
    //     //
    //     return {...task, name: newName}
    //   }
    //   return task;
    // });
    const editCodeword={
      "codeword":newName,
      "codewordId":id
    }
    socket.emit('editCodeword', editCodeword);
    // setTasks(editedTaskList);
    // socket.emit('left-menu-codes-object',editedTaskList)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task,index) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      index={index}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  // const filterList = FILTER_NAMES.map(name => (
  //   <FilterButton
  //     key={name}
  //     name={name}
  //     isPressed={name === filter}
  //     setFilter={setFilter}
  //   />
  // ));

  function addTask(name) {
    prev=prev+1
    setCount(count+1)
    // const newTask = { id: "todo-" + nanoid(), name: name, completed: true };
    const newTask = { id: "todo-" + nanoid()+` ${count}`, name: name, completed: true };
    // setTasks([...tasks, newTask]);
    let data =[...tasks, newTask]
    // socket.emit('left-menu-codes-object',data)
    // console.log(data)
    var questionCodebookId=localStorage.questionCodebookId
    let newCodeword={
      "projectCodebookId":localStorage.codebook, 
      "questionCodebookId":questionCodebookId, 
      "codeword":name, 
      "codeKey":`${count}`
    }
    socket.emit('addCodeword', newCodeword);
  }


  // const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  // const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);
  return (
    <div className="newUI">
      {/* <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2> */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
      <Form addTask={addTask} />
    </div>
  );
}
const mapStateToProps=createStructuredSelector({
  questionNumber:selectQuestionNumber,
})
export default connect(mapStateToProps)(NEWUI);
