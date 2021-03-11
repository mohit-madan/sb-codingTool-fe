import TreeView from "@material-ui/lab/TreeView";

const loop = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon size="large" />}
            defaultExpandIcon={<ChevronRightIcon size="large" />}
          >
            {loop(item.children)}
          </TreeView>
        )
      }
      return (<TreeItem nodeId={index} label={item} >
          <Todo
                          id={item?.id}
                          name={item?.name}
                          completed={item?.active}
                          key={item?.id}
                          index={index}
                          percentage={item?.percentage}
                          toggleTaskCompleted={toggleTaskCompleted}
                          deleteTask={deleteTask}
                          editTask={editTask}
                          category={item?.category}
                          addToCategory={addToCategory}
                          categoriesList={categories}
                          createNewCategory={createNewCategory}
                          ctrlClick={clickHandler}
                          ctrlClickActive={item?.ctrlClickActive}
                        />
      </TreeItem>);
    })
  }

const nodes = [
{
  id:"2131sa",
  name: "project",
  label: "project",
  active:true,
  percentage:2,
  category:"fruits",
  index:1,
  ctrlClickActive:false,
  children: [
    {
      name: "activity",
      label: "activity",
      id:"2131sa",
      active:true,
      percentage:2,
      category:"fruits",
      index:1,
      ctrlClickActive:false,
      children: [
        {
          name: "task",
          label: "task",
          
      active:true,
      percentage:2,
      category:"fruits",
      index:1,
      ctrlClickActive:false,
          children: [
            {
              name: "subtask",
              label: "subtask",
              
      active:true,
      percentage:2,
      category:"fruits",
      index:1,
      ctrlClickActive:false,
            }
          ]
        },
        {
          name: "task",
          label: "task",
          
      active:true,
      percentage:2,
      category:"fruits",
      index:1,
      ctrlClickActive:false,
          children: [
            {
              name: "subtask",
              label: "subtask",
              
      active:true,
      percentage:2,
      category:"fruits",
      index:1,
      ctrlClickActive:false,
            }
          ]
        }
      ]
    }
  ],
  
},
{
  name: "project",
  label: "project",
  active:true,
  percentage:2,
  category:"fruits",
  index:1,
  ctrlClickActive:false,
}
];


[{id: `11323gfsdwe`, name: "fruits1", active: true,percentage: 2,category:"fruits",index:1,ctrlClickActive:false},
      {id: `1135rwaf23we`, name: "apples1", active: true,percentage: 2,category:"apples",index:2,ctrlClickActive:false},
      {id: `1132sdfswer133we`, name: "keywords1", active: true,percentage: 2,category:"keywords",index:3,ctrlClickActive:false},
      {id: `11323xzawjk;.we`, name: "keywords2", active: true,percentage: 2,category:"keywords",index:4,ctrlClickActive:false},
      {id: `113sdfg23we`, name: "apples2", active: true,percentage: 2,category:"apples",index:5,ctrlClickActive:false},
      {id: `11323wxbsdfge`, name: "fruits2", active: true,percentage: 2,category:"fruits",index:6,ctrlClickActive:false},
      {id: `11323wxsdfgbsdfge`, name: "fruits2", active: true,percentage: 2,category:"undefined",index:7,ctrlClickActive:false},
    ]