import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import CodeRow from "./components/CodeRow";
import { nanoid } from "nanoid";
import "./components/styles.css"
import { socket } from "../../../../config"
import { userActions } from "../../../../_actions";
import { connect } from "react-redux";
import { selectFilteredData, selectLeftMenuCodes, selectQuestionNumber } from "../../../../Redux/CodeitData/codeit-data.selectors";
import { createStructuredSelector } from "reselect";
import { setLeftMenuCodes } from "../../../../Redux/CodeitData/codeit-data.actions";
import { userUtilities } from "../../../../_utilities/utilities";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.active,
  Completed: task => task.active
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Coding(props) {
  let prev=0,next=0
  const  [ count,setCount]=useState(1)
  const _tasks = [];
  const [ nodes,setNodes]=useState([
    {
      id:"asdasd",
      name:"asdasdasdasd",
      active: true,
      percentage: 2,
      index:1,
      ctrlClickActive:false
    },
    {
      id:"gjhg",
      name:"fruits",
      children: [
        {
          name: "apples category",
          children: [
            {
              id:"asde1qq123",
              name: "apple  1  codeword",
              active: true,
              percentage: 2,
              index:1,
              ctrlClickActive:false
            },
            {
              id:"asde1qq12asd3",
              name: "apple2 codeword",
              active: true,
              percentage: 2,
              index:1,
              ctrlClickActive:false
            }
          ]
        }
      ]
    },
    {
      name:"keywords",
      children: [
        {
          name: "keywords category 1",
          children:[
            {
              id:"asq34123dasd",
              name:"keyword 1 cat 1 ",
              children: [
                {
                  id:"asdesdf1qq123",
                  name: "apple  1  codeword",
                  active: true,
                  percentage: 2,
                  index:1,
                  ctrlClickActive:false
                },
                {
                  id:"asde1qqxcv12asd3",
                  name: "apple2 codeword",
                  active: true,
                  percentage: 2,
                  index:1,
                  ctrlClickActive:false
                }
              ]
            },
            {
              id:"asq34123dasdasfd56",
              name:"keyword 2 cat 1 ",
              active: true,
              percentage: 2,
              index:1,
              ctrlClickActive:false
            },
          ]
        },
        {
          name: "keywords category 2",
          children:[
            {
              id:"asdas2346789",
              name:"keyword 1 cat 2",
              active: true,
              percentage: 2,
              index:1,
              ctrlClickActive:false
            },
            {
              id:"asdasd",
              name:"keyword 2 cat 2 ",
              active: true,
              percentage: 2,
              index:1,
              ctrlClickActive:false
            },
          ]
        }
      ]
      
    }
  ])

  useEffect(async () => {
    //  call api call 
    socket.emit('joinRoom',{room: localStorage.listOfQuestion?.split(',')[props.questionNumber], username: JSON.parse(localStorage.user).user.email,projectId:localStorage.projectId,rootId:localStorage.rootId }); //here {room: questionId, username: loginUser }

    let codewords = await userActions.questionCodebookId(localStorage.listOfQuestion?.split(',')[props.questionNumber])

    let data=[]
    const _categories = ["fruits","apples","keywords","undefined"]
    // console.log(codewords)
    if(userUtilities.isIterable(codewords)){
      codewords?.map((item,index)=>{
        // let percentage= item?.resToAssigned?.length/props?.filteredData?.length
        let percentage= item?.resToAssigned?.length
        var category = _categories[Math.floor(Math.random() * _categories.length)];
        data.push({id: `${item?._id}`, name: item?.tag, active: item?.active,percentage: percentage,category:category})
      })
      // console.log(data)
      props.setLeftMenuCodes(data)
      // props.setLeftMenuCodes([{id: `11323gfsdwe`, name: "fruits1", active: true,percentage: 2,category:"fruits",index:1,ctrlClickActive:false},
      //   {id: `1135rwaf23we`, name: "apples1", active: true,percentage: 2,category:"apples",index:2,ctrlClickActive:false},
      //   {id: `1132sdfswer133we`, name: "keywords1", active: true,percentage: 2,category:"keywords",index:3,ctrlClickActive:false},
      //   {id: `11323xzawjk;.we`, name: "keywords2", active: true,percentage: 2,category:"keywords",index:4,ctrlClickActive:false},
      //   {id: `113sdfg23we`, name: "apples2", active: true,percentage: 2,category:"apples",index:5,ctrlClickActive:false},
      //   {id: `11323wxbsdfge`, name: "fruits2", active: true,percentage: 2,category:"fruits",index:6,ctrlClickActive:false},
      //   {id: `11323wxsdfgbsdfge`, name: "fruits2", active: true,percentage: 2,category:"undefined",index:7,ctrlClickActive:false},
      // ])
      // props.setLeftMenuCodes(nodes)
    }
  }, [props.questionNumber])
  
  // const [leftMenuCodes, setLeftMenuCodes] = useState(_tasks);
  const [filter, setFilter] = useState('All');

  useEffect(()=>{
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
        const {codeword,codewordId,category} = value
        // const newTask = { id: "todo-" + nanoid()+` ${count-1}`, name: codeword, completed: true };
        const newTask = { id: `${codewordId}`, name: codeword, active: true ,category:category};
        props.setLeftMenuCodes([...props.leftMenuCodes, newTask]);
        next=next+1
      // }
    });
    socket.on('toggle-codeword-to-list', (value)=>{

      console.log('toggle-codeword-to-list',value)
      const id=value.codewordId
      const status=value.status
      
      const updatedTasks = props.leftMenuCodes.map(task => {
          // if this task has the same ID as the edited task
          console.log(id === task.id)
          if (id === task.id) {
            // use object spread to make a new obkect
            // whose `active` prop has been inverted
            return {...task, active: !status}
          }
          return task;
        });
        
        props.setLeftMenuCodes(updatedTasks)


    });

    socket.once('codeword-assigned-to-response', operation=> {
      const codewordId=operation?.codewordId
      const percentage=operation?.resToAssigned

      let temp = props.leftMenuCodes

      temp?.map((item)=>{
        if(codewordId == item?.id){
          item={...item,percentage:percentage}
        }
      })

      console.log(temp)

      // props.setLeftMenuCodes(temp)

    });
    socket.once("node-structure-to-list",operation=>{
      console.log("node-structure-to-list",operation)
    })
    socket.once("create-category-to-list",operation=>{
      console.log("create-category-to-list",operation)
    })
  })

  useEffect(() => {
    console.log(props.leftMenuCodes)
  }, [props.leftMenuCodes])

  function toggleTaskCompleted(id,status) {
    let toggleCodeword={codewordId:id,status:status}
    console.log(toggleCodeword)
    // (codeword=>{codewordId})
    socket.emit('toggleCodeword',toggleCodeword)
  }

  function createNewCategory(id,category){
    setCategories([...categories,category])
    addToCategory(id,category)
  }

  function addToCategory(id,category){
      const updatedTasks = props.leftMenuCodes.map(task => {
          // if this task has the same ID as the edited task
          console.log(id === task.id)
          if (id === task.id) {
            // use object spread to make a new obkect
            // whose `completed` prop has been inverted
            if(category!=""){
              return {...task, category: category}
            }
          }
          return task;
        });
        props.setLeftMenuCodes(updatedTasks)
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



  function addTask(name) {
    prev=prev+1
    setCount(count+1)
    var questionCodebookId=localStorage.questionCodebookId
    let newCodeword={
      "projectCodebookId":localStorage.codebook, 
      "questionCodebookId":questionCodebookId, 
      "codeword":name, 
      "codekey":count.toString(),
      "rootId":localStorage.rootId
    }
    socket.emit('addCodeword', newCodeword);
    socket.emit("node-structure",localStorage.rootId)
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(props.leftMenuCodes.length);

  useEffect(() => {
    if (props.leftMenuCodes.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [props.leftMenuCodes.length, prevTaskLength]);

  useEffect(() => {
    console.log(`nodes changed`,nodes)
  }, [nodes])

  function clickHandler(event, id){
    // event.stopPropagation();
    // In that case, event.ctrlKey does the trick.
    let temp0=nodes

    if (event.ctrlKey){
         console.log("Ctrl+click has just happened!");

         const TreeTraversal = data => {
          if (!Array.isArray(data.children) || !data.children.length) {
            if(data?.id ==id){
              // data={...data,ctrlClickActive:!data?.ctrlClickActive}  
              data.ctrlClickActive=!data?.ctrlClickActive
              console.log(data)
            }
            return
          }
          return data?.children?.map((node, idx) => TreeTraversal(node))
        }
          temp0?.map((item,index)=>{
            return TreeTraversal(item)
          })
          console.log(temp0)
    }
    setNodes([...temp0])
 }


  const classes = useStyles();
  const [categories,setCategories]=useState(["fruits","apples","keywords"])



    // const classes = useStyles();

    const TreeRender = data => {
      if (!Array.isArray(data.children) || !data.children.length) {
        return (
          <CodeRow
              id={data?.id}
              name={data?.name}
              completed={data?.active}
              key={data?.id}
              index={data.index}
              percentage={data?.percentage}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
              category={data?.category}
              addToCategory={addToCategory}
              nodes={props.leftMenuCodes}
              createNewCategory={createNewCategory}
              ctrlClick={clickHandler}
              ctrlClickActive={data?.ctrlClickActive}
          />
          ) ;
      }
      return (
        <div>
          <ContextMenuTrigger id={`asf32`}>
              <TreeItem key={data.name} nodeId={data.name} label={data.name} >
                {data.children.map((node, idx) => TreeRender(node))}
              </TreeItem>
          </ContextMenuTrigger>
          <ContextMenu data={{data:"asdasd"}} id={`asf32`}>
            <MenuItem>
                Details
              </MenuItem>
          </ContextMenu>
        </div>
      )
    }
  
  const handleEmit=()=>{
    const body={
      "category":"Category-name-2",
      "parent":localStorage.rootId
    }
    socket.emit("createCategory",body)
  }
  
  return (
    <div className="coding">
      <Form addTask={addTask} />
      <hr />
      {/* <Func1 /> */}
      {/* <TreeViewer nodes={nodes} / */}
      <button onClick={handleEmit}>node-structure</button>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >{
        nodes?.map((item,index)=>{
            return TreeRender(item)
        })
        }
      </TreeView>
      {/* <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {props.leftMenuCodes.map((task,index) => {
          if(task?.category=="undefined"){
            return (
            <Todo
              id={task?.id}
              name={task?.name}
              completed={task?.active}
              key={task?.id}
              index={task.index}
              percentage={task?.percentage}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
              category={task?.category}
              addToCategory={addToCategory}
              categoriesList={categories}
              createNewCategory={createNewCategory}
              ctrlClick={clickHandler}
              ctrlClickActive={task?.ctrlClickActive}
            />)
          }
        })}
      </ul>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon size="large" />}
          defaultExpandIcon={<ChevronRightIcon size="large" />}
        >
            {
              categories?.map((item,index)=>{
                return (
                <TreeItem nodeId={index} label={item}>
                    {props.leftMenuCodes.map((task,index) => {
                      if(task?.category==item){
                        return (<Todo
                          id={task?.id}
                          name={task?.name}
                          completed={task?.active}
                          key={task?.id}
                          index={index}
                          percentage={task?.percentage}
                          toggleTaskCompleted={toggleTaskCompleted}
                          deleteTask={deleteTask}
                          editTask={editTask}
                          category={task?.category}
                          addToCategory={addToCategory}
                          categoriesList={categories}
                          createNewCategory={createNewCategory}
                          ctrlClick={clickHandler}
                          ctrlClickActive={task?.ctrlClickActive}
                        />)
                      }
                    })}
                </TreeItem>
              )
              })
            }
        </TreeView>
      </ul> */}
    </div>
  );
}

const mapStateToProps=createStructuredSelector({
  questionNumber:selectQuestionNumber,
  leftMenuCodes:selectLeftMenuCodes,
  filteredData:selectFilteredData,
})
const mapDispatchToProps = dispatch => ({
  setLeftMenuCodes: collectionsMap => dispatch(setLeftMenuCodes(collectionsMap)),
  
});
export default connect(mapStateToProps,mapDispatchToProps)(Coding);
