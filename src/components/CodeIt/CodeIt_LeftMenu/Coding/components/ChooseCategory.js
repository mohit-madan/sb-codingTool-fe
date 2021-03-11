import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tree: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
    root: {
      "&.MuiTypography-root": {
        textAlign:"-webkit-center",
      },
    },
    button:{width:"300px !important",alignSelf:"center!important",marginTop:"10px!important"},
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
    
  }));
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
function ChooseCategory(props) {

    const classes = useStyles();
    const { onClose, selectedValue, open ,addToCategory} = props;
    const [name, setName] = React.useState();
    

   function OptionsGenerator() {

    const TreeRender = data => {
      if (!Array.isArray(data.children) || !data.children.length) {
        return
      }
      return (
        <div className="chooseCategoryOption">
          <Button onClick={e=>handleListItemClick(data.name)}>{data.name}</Button>
          {data.children.map((node, idx) => TreeRender(node))}
        </div>
      )
    }
  
    return (
      <div>
        {
          nodes?.map((item,index)=>{
            return TreeRender(nodes[index])
          })
        }
      </div>
    );
  }

    const handleChange = (event) => {
      setName(event.target.value);
    };
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (cat) => {
      onClose(cat);
      // console.log(cat)
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add a Category</DialogTitle>
        {/* {categoriesList?.map((item)=>{
            return(
                  <ListItem button onClick={() => handleListItemClick(item)} key={item}>
                    <ListItemText className={classes.root} primary={item} />
                  </ListItem>
            )})} */}

        {OptionsGenerator(nodes)}
      </Dialog>
    );
  }
  
  ChooseCategory.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
export default ChooseCategory