import React,{useState} from "react"
import "./CodeIt_LeftMenu.css"
import Switch from '@material-ui/core/Switch';
import { Button, Radio } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";

class CodeIt_LeftMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = { values: [] };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    createUI(){
       return this.state.values.map((el, i) => 
        <div >
        <div className="flex">
            <div style={{alignItems: "end"}} className="flex">
                &nbsp;&nbsp;
                {/* <input type="radio" id="other" value="other" /> */}
                <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
                {/* <Radio onChange={e=>console.log(e)}/> */}
                &nbsp;&nbsp;
                <input className='width'/>
                {/* style={{border:"none"}} */}
            </div>
            <div className="flex" >
                <ListIcon />&nbsp;&nbsp;&nbsp;
                86.72%(73)
            </div>
        </div>
         
         </div>
       )
    }
  
    handleChange(i, event) {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
    }
    
    addClick(){
      this.setState(prevState => ({ values: [...prevState.values, '']}))
    }
    
    removeClick(i){
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.values.join(', '));
      event.preventDefault();
    }
  
    render() {
      return (
        
        <div className="codeit_leftmenu">
                <div className="flex">
                    <div className="flex">
                        <input className=" _1"
                         placeholder={`Filter by Keyword`} />
                    </div>
                    <div className="flex">
                    Order : 
                        <div class="dropdown">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                              <a href="#">Link 1</a>
                              <a href="#">Link 2</a>
                              <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="background-color flex">
                    <div className="">
                        Edit mode:
                        <Switch
                            defaultChecked
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                    </div>
                    <div >
                        <button> <ChevronRightIcon/></button>
                        <button> <ExpandMoreIcon/></button>
                        <button> +</button>
                        <button> <ChevronRightIcon/></button>
                        <button> <ExpandMoreIcon/></button>
                        <button> +</button>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {this.createUI()}        
                    <input type='button' value='Add a Code' onClick={this.addClick.bind(this)}/>
                    {/* <input type="submit" value="Submit" /> */}
                </form>
            
            </div>
      );
    }
  }

export default connect()(CodeIt_LeftMenu)