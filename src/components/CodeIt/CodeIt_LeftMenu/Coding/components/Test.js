import React, { Component } from 'react'
// import { nodes } from './util'
import Tree from "./draggable-react-tree-component/lib/Tree"
import TreeNode from "./draggable-react-tree-component/lib/TreeNode"

// import '../../assets/index.less'
/* eslint-enable */
// import './draggable.less'

const nodes = [
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
  ];
    
  
class Demo extends Component {
  constructor(props) {
    super(props);

    [
      'onDragStart',
      'onDragEnter',
      'onDrop',
      'onExpand',
      'handleDragExpandDelayChanged'
    ].forEach((name) => (this[name] = this[name].bind(this)))

    this.state = {
      dragExpandDelay: 2,
      nodes:nodes,
      autoExpandParent: true,
      expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
    }
  }
  onDragStart(info) {
    console.log('start', info)
  }
  onDragEnter(info) {
    // console.log('enter', info)
    this.setState({
      expandedKeys: info.expandedKeys,
    })
  }


  onDrop(info) {
    console.log('drop', info)

    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey


    // traverse to the hiven key and execute the given callback
    const traverseToKey = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr)
        }
        if (item.children) {
          return traverseToKey(item.children, key, callback)
        }
        return null
      })
    }

    const data = [...this.state.nodes]
    let dragObj

    traverseToKey(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (info.dropToGap) {
      traverseToKey(data, dropKey, (item) => {
        item.children = item.children || []

        let index = info.dropPosition +
          (info.dropPositionOnNode > 0 ? 1 : 0)

        if (info.isSameLevel && info.dragPosition < info.dropPosition) {
          index -= 1
        }
        // where to insert
        item.children.splice(index, 0, dragObj)
      })
    }
    else {
      traverseToKey(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert
        item.children.push(dragObj)
      })
    }

    this.setState({
      nodes: data,
      expandedKeys: info.rawExpandedKeys.concat([dropKey]),
    })

  }
  onExpand(expandedKeys) {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  handleDragExpandDelayChanged({ target: { value } }) {
    this.setState({
      dragExpandDelay: value
    })
  }

  render() {
    const loop = data => (
      data.map((item) =>
        (<TreeNode
          key={item.name}
          items={
            (item.children && item.children.length) ? loop(item.children) : null
          }
        >
          <a href={`#/${item.name}`} draggable={false}>
            {item.title}
          </a>
        </TreeNode>)
      )
    )
    return (<div className="draggable-demo">
      <h2>Draggable </h2>
      <p>drag a node into another node</p>
      {/* <label htmlFor="drag-delay-slider">
        <span>DragExpandDelay: <strong>{this.state.dragExpandDelay}s</strong></span>
        <input
          id="drag-delay-slider"
          onChange={this.handleDragExpandDelayChanged}
          type="range"
          min={0}
          max={10}
          value={this.state.dragExpandDelay}
        />
      </label> */}
      <div className="draggable-container">
        <Tree
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          dragExpandDelay={this.state.dragExpandDelay * 1000}
          autoExpandParent={this.state.autoExpandParent}
          draggable
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          droppedNodeClassNameDelay={2400}
        >
          {loop(this.state.nodes)}
        </Tree>
      </div>
    </div>)
  }
}

const Func1=()=>{

    function TreeViewer() {
    
        const TreeRender = data => {
          if (!Array.isArray(data.children) || !data.children.length) {
            return (
              <p>asdasd</p>
              ) ;
          }
          return (
            <TreeNode key={data.name} nodeId={data.name} label={data.name}>
              {data.children.map((node, idx) => TreeRender(node))}
            </TreeNode>
          )
        }
      
        return (
          <Tree
          draggable
          >
            {
              nodes?.map((item,index)=>{
                return TreeRender(nodes[index])
              })
            }
          </Tree>
        );
      }
      
    const loop = data => (
        data.map((item) =>
          (<TreeNode
            key={item.name}
            items={
              (item.children && item.children.length) ? loop(item.children) : null
            }
          >
            <a href={`#/${item.name}`} draggable={false}>
              {item.title}
            </a>
          </TreeNode>)
        )
      )
    return(
        // <Tree
        // //   expandedKeys={this.state.expandedKeys}
        // //   onExpand={this.onExpand}
        // //   dragExpandDelay={this.state.dragExpandDelay * 1000}
        // //   autoExpandParent={this.state.autoExpandParent}
        //   draggable
        // //   onDragStart={this.onDragStart}
        // //   onDragEnter={this.onDragEnter}
        // //   onDrop={this.onDrop}
        // //   droppedNodeClassNameDelay={2400}
        // >
        //     {loop(nodes)}
          
        // </Tree>
        <div>
            {TreeViewer(nodes)}
        </div>
    )
}

export { Func1 as default }
