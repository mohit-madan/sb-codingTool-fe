import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import "./components/styles.css"
import { socket } from "../../../../config"

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
  var prev=0,next=0
  const _tasks = [
    { id: "code-0", name: "Code 1", completed: true },
    { id: "code-1", name: "Code 2", completed: true },
    { id: "code-2", name: "Code 3", completed: true },
  ];
  
  const [tasks, setTasks] = useState(_tasks);
  const [filter, setFilter] = useState('All');

  useEffect(()=>{
    socket.once('left-menu-codes-object', (value) => {
      console.log(value)
      setTasks(value)
    })
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
    const remainingTasks = tasks.filter(task => id !== task.id);
    // setTasks(remainingTasks);
    socket.emit('left-menu-codes-object',remainingTasks)
  }


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    // setTasks(editedTaskList);
    socket.emit('left-menu-codes-object',editedTaskList)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: true };
    // setTasks([...tasks, newTask]);
    let data =[...tasks, newTask]
    console.log(data)
    socket.emit('left-menu-codes-object',data)
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);
console.log(tasks)
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

export default NEWUI;
