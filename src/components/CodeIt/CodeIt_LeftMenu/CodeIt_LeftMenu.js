import React,{useState,useEffect,Fragment} from "react"
import EditIcon from '@material-ui/icons/Edit';
import "./CodeIt_LeftMenu.css"
import Switch from '@material-ui/core/Switch';
import { Button, Radio } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";
import LeftMenuTop from "./LeftMenuTop";
import LeftMenu_EditOptions from "./LeftMenu_EditOptions";
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import './styles/react-contextmenu.css'
import './styles/custom.css'
import FilterListTwoToneIcon from '@material-ui/icons/FilterListTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { socket } from "../../../config"
import { setShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.actions";
import { setContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.actions";

import { withStyles } from '@material-ui/core/styles';
import Coding from "./Coding/Coding";

const CodeIt_LeftMenu =()=>{
      return (
        <div className="codeit_leftmenu">
          <LeftMenuTop />
          {/* <LeftMenu_EditOptions /> */}
          <div className="background-color flex LeftMenu_EditOptions"></div>
          <Coding />
        </div>
      );
}
const mapDispatchToProps = dispatch => ({
  setShowCodedAs: collectionsMap => dispatch(setShowCodedAs(collectionsMap)),
  setContainsKeyword: collectionsMap => dispatch(setContainsKeyword(collectionsMap)),
});
export default connect(null,mapDispatchToProps)(CodeIt_LeftMenu)