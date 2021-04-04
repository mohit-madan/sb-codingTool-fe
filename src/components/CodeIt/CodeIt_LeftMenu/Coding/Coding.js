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
  const [ nodes,setNodes]=useState()

  useEffect(async () => {

    let room =JSON.parse(localStorage.listOfQuestion)[props.questionNumber]._id
    console.log("room---->",room)

    let {tree,codewords} = await userActions.questionCodebookId(room)
    socket.emit('joinRoom',{room: room, username: JSON.parse(localStorage.user).user.email,projectId:localStorage.projectId,questionCodebookId:localStorage.questionCodebookId }); //here {room: questionId, username: loginUser }

    console.log("Tree---->",tree)
    setNodes(tree)
    
    console.log("Codewords---->",codewords)

    let data=[]
    if(userUtilities.isIterable(codewords)){
      codewords?.map((item,index)=>{
        let percentage= item?.resToAssigned?.length
        data.push({id: `${item?._id}`, name: item?.tag, active: item?.active,percentage: percentage})
      })
      console.log("codewords--->",data)
      props.setLeftMenuCodes(data)
    }

  }, [props.questionNumber])
  
  // const [leftMenuCodes, setLeftMenuCodes] = useState(_tasks);

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
        const {codeword,codewordId} = value
        // const newTask = { id: "todo-" + nanoid()+` ${count-1}`, name: codeword, completed: true };
        const newTask = { id: `${codewordId}`, name: codeword, active: true ,percentage: 0};
        props.setLeftMenuCodes([...props.leftMenuCodes, newTask]);
      // }
    });

    socket.on('toggle-codeword-to-list', (value)=>{

      console.log('toggle-codeword-to-list',value)
      const id=value.codewordId
      const status=value.status
      const updatedTasks = props.leftMenuCodes.map(task => {
          console.log(id === task.id)
          if (id === task.id) {
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
    socket.once("root",operation=>{
      if(typeof(operation)!="undefined" && operation!==nodes){
        setNodes(operation)
      }
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

  function createNewCategory(categoryName,codewordId,categoryId){

    let temp0=nodes
    let temp1=0
    let presentCategoryId=""

    temp0?.map((item,index)=>{
       if(typeof(item?.codewords)=="object" && item?.codewords?.length>0){
         item?.codewords?.map((_codeword,codeword_index)=>{
          if(_codeword?._id==codewordId){
           temp1=1
          //  categoryName=item?.name
            presentCategoryId=item._id
           return
          }
         })
       }
       if(item?._id==codewordId){
         temp1=0
         return
       }
    })

    if(temp1==0){

      const body={
        "category":categoryName,
        "categoryName":categoryName,
        "categoryId":categoryId,
        "codewordId":codewordId
      }
      console.log(body)
      socket.emit("assingedCodeword",body)

    }else if(temp1==1){
      const body={
        "codewordId":codewordId,
        "categoryId1":categoryId,
        "categoryId2":undefined,
        "categoryName":categoryName,
      }
      console.log(body)
      socket.emit("moveCodeword",body)
    }

  }

  function addToCategory(id,category){
    
    let temp0=nodes
    let temp1=0
    let presentCategoryId=""

    temp0?.map((item,index)=>{
       if(typeof(item?.codewords)=="object" && item?.codewords?.length>0){
         item?.codewords?.map((_codeword,codeword_index)=>{
          if(_codeword?._id==id){
           temp1=1
          //  categoryName=item?.name
            presentCategoryId=item._id
           return
          }
         })
       }
       if(item?._id==id){
         temp1=0
         return
       }
    })

    if(temp1==0){

      const body={
        "codewordId":id,
        "categoryId":category
      }
      console.log(body)
      socket.emit("assingedCodeword",body)

    }else if(temp1==1){

      const body={
        "codewordId":id,
        "categoryId1":presentCategoryId,
        "categoryId2":category,
        "categoryName":undefined,
      }
      console.log(body)
      socket.emit("moveCodeword",body)

    }
  }

  function deleteTask(id) {
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
    setCount(count+1)
    let newCodeword={
      "projectCodebookId":localStorage.codebook, 
      "codeword":name, 
      "codekey":count.toString(),
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


  function clickHandler(event, id){

    let temp0=nodes
    console.log("crtlclcik changed nodes id",id)
    console.log("crtlclcik changed nodes nodes",nodes)

    if (event.ctrlKey){
         console.log("Ctrl+click has just happened!");

         temp0?.map((item,index)=>{

            if(typeof(item?.codewords)=="object" && item?.codewords?.length>0){
              item?.codewords?.map((_codeword,codeword_index)=>{
                console.log("crtlclcik changed ids",_codeword._id)
               if(_codeword?._id==id){
                console.log("crtlclcik changed nodes","match",{_codeword})
                _codeword["ctrlClickActive"]= _codeword["ctrlClickActive"] ?!_codeword["ctrlClickActive"] : true
                console.log({_codeword})
               }
              })
            }

            if(item?._id==id){
              console.log("crtlclcik changed nodes","match")
              item["ctrlClickActive"]= item["ctrlClickActive"] ?!item["ctrlClickActive"] : true
            }

         })
         console.log("crtlclcik changed nodes",{temp0})
        setNodes([...temp0])
    }
 }


  const classes = useStyles();
  
  
  return (
    <div className="coding">
      <Form addTask={addTask} />
      <hr style={{width:"auto"}}/>

      {/* <button onClick={handleEmit}>node-structure</button> */}

      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {nodes?.map((data,index)=>{

          if (typeof(data?.codewords)=="undefined" ) {
            return (
              <CodeRow
                  id={data?._id}
                  name={data?.tag}
                  completed={data?.active}
                  key={data?.id}
                  index={index}
                  percentage={data?.resToAssigned?.length}
                  toggleTaskCompleted={toggleTaskCompleted}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  // category={data?.category}
                  addToCategory={addToCategory}
                  nodes={nodes}
                  createNewCategory={createNewCategory}
                  ctrlClick={clickHandler}
                  ctrlClickActive={data?.ctrlClickActive ? data?.ctrlClickActive : false}
              />
              ) ;
          }

          return (
            <div>
              <ContextMenuTrigger id={`asf32`}>
                  {data.codewords.length==0 ?
                    <TreeItem key={data._id} nodeId={data._id} label={data.name} >
                      <p>Empty Category</p>
                    </TreeItem> 
                    
                    :
                    <TreeItem key={data._id} nodeId={data._id} label={data.name} >
                    {
                    data.codewords.map((node, idx) => 
                      {
                        return (
                        <CodeRow
                            id={node?._id}
                            name={node?.tag}
                            completed={node?.active}
                            key={node?.id}
                            index={index+idx}
                            percentage={node?.resToAssigned?.length}
                            toggleTaskCompleted={toggleTaskCompleted}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            // category={data?.category}
                            addToCategory={addToCategory}
                            nodes={nodes}
                            createNewCategory={createNewCategory}
                            ctrlClick={clickHandler}
                            ctrlClickActive={node?.ctrlClickActive ? node?.ctrlClickActive : false}
                        />
                      )})
                    }
                  </TreeItem>
                }
              </ContextMenuTrigger>
              <ContextMenu data={{data:"asdasd"}} id={`asf32`}>
                <MenuItem>
                    Details
                  </MenuItem>
              </ContextMenu>
            </div>
          )
            // return TreeRender(data)
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
