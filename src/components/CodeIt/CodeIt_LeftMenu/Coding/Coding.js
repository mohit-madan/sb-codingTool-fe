import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import "./components/styles.css"
import { socket } from "../../../../config"
import { userActions } from "../../../../_actions";
import { connect } from "react-redux";
import { selectLeftMenuCodes, selectQuestionNumber } from "../../../../Redux/CodeitData/codeit-data.selectors";
import { createStructuredSelector } from "reselect";
import { setLeftMenuCodes } from "../../../../Redux/CodeitData/codeit-data.actions";
import { userUtilities } from "../../../../_utilities/utilities";

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

function Coding(props) {
  let prev=0,next=0
  const  [ count,setCount]=useState(1)
  const _tasks = [];
  useEffect(async () => {
    //  call api call 
    socket.emit('joinRoom',{room: localStorage.listOfQuestion?.split(',')[props.questionNumber], username: JSON.parse(localStorage.user).user.email }); //here {room: questionId, username: loginUser }

    let codewords = await userActions.questionCodebookId(localStorage.listOfQuestion?.split(',')[props.questionNumber])

    let data=[]
    if(userUtilities.isIterable(codewords)){
      codewords?.map((item,index)=>{
        data.push({id: `${item?._id}`, name: item?.tag, completed: true })
      })
      props.setLeftMenuCodes(data)
    }
  }, [props.questionNumber])
  
  // const [leftMenuCodes, setLeftMenuCodes] = useState(_tasks);
  const [filter, setFilter] = useState('All');

  useEffect(()=>{
    socket.once('left-menu-codes-object', (value) => {
      console.log(value)
      props.setLeftMenuCodes(value)
    })
    socket.once('edit-codeword-to-list', editCodeword=>{
      console.log(`editCodeword --->`,editCodeword)
      // if(next<prev){
        const {codeword,codewordId}=editCodeword
        console.log(`editCodeword --->`,editCodeword)
        console.log(`editCodeword --->`)
        const editedTaskList = props.leftMenuCodes.map(task => {
          // if this task has the same ID as the edited task
            if (codewordId === task.id) {
              //
              return {...task, name: codeword}
            }
            return task;
          });
          props.setLeftMenuCodes(editedTaskList);
          next=next+0.5
      // }
    });
    socket.once('delete-codeword-to-list', deleteCodeword=>{
      // if(next<prev){
        const {codewordId} = deleteCodeword
        console.log(deleteCodeword)
        const remainingTasks = props.leftMenuCodes.filter(task => codewordId !== task.id);
        props.setLeftMenuCodes(remainingTasks);
        next=next+1
      // }
    });
    socket.once('add-new-codeword-to-list', (value)=>{
      
      // if(next<prev){
        console.log(value)
        const {codeword,codewordId} = value
        // const newTask = { id: "todo-" + nanoid()+` ${count-1}`, name: codeword, completed: true };
        const newTask = { id: `${codewordId}`, name: codeword, completed: true };
        props.setLeftMenuCodes([...props.leftMenuCodes, newTask]);
        next=next+1
      // }
    });
  })

  function toggleTaskCompleted(id) {
    const updatedTasks = props.leftMenuCodes.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    socket.emit('left-menu-codes-object',updatedTasks)
  }


  function deleteTask(id) {
    prev=prev+1
    let deleteCodeword = {"codewordId":id}
    socket.emit('deleteCodeword', deleteCodeword);
  }


  function editTask(id, newName) {
    prev=prev+1
    const editCodeword={
      "codeword":newName,
      "codewordId":id
    }
    socket.emit('editCodeword', editCodeword);
  }

  const taskList = props.leftMenuCodes
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

  function addTask(name) {
    prev=prev+1
    setCount(count+1)
    // const newTask = { id: "todo-" + nanoid(), name: name, completed: true };
    // const newTask = { id: "todo-" + nanoid()+` ${count}`, name: name, completed: true };
    // setLeftMenuCodes([...tasks, newTask]);
    // let data =[...leftMenuCodes, newTask]
    // socket.emit('left-menu-codes-object',data)
    // console.log(data)
    var questionCodebookId=localStorage.questionCodebookId
    let newCodeword={
      "projectCodebookId":localStorage.codebook, 
      "questionCodebookId":questionCodebookId, 
      "codeword":name, 
      "codekey":count.toString()
    }
    socket.emit('addCodeword', newCodeword);
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(props.leftMenuCodes.length);

  useEffect(() => {
    if (props.leftMenuCodes.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [props.leftMenuCodes.length, prevTaskLength]);
  return (
    <div className="coding">
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
  leftMenuCodes:selectLeftMenuCodes
})
const mapDispatchToProps = dispatch => ({
  setLeftMenuCodes: collectionsMap => dispatch(setLeftMenuCodes(collectionsMap)),
  
});
export default connect(mapStateToProps,mapDispatchToProps)(Coding);
