import React, { Component,useEffect } from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx';
import { setExcelData, setExcelFileName } from '../../../Redux/ExcelData/excel-data.actions';
import { setProgressNumber } from '../../../Redux/Progress-number/progress.actions';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import Loader from 'react-loader-spinner'
import { alertActions, userActions } from '../../../_actions';
import { userConstants } from '../../../Constants';
import config from '../../../config';
import { handleResponse } from '../../../services';
import axios from 'axios';
import WithSpinner from "../../with-spinner/with-spinner.component"
import { Button } from '@material-ui/core';
import { selectExcelData, selectExcelFileName } from '../../../Redux/ExcelData/excel-data.selectors';
import { createStructuredSelector } from 'reselect';

let file_name =''

const ExcelReaderHTML=({removeExcelData,file,excelFileName,x,fileName,selectExcelData})=>{
  return(
    <div className="excel_reader">
      {!selectExcelData &&
       <form className="height100" encType="multipart/form-data" action>
        <label htmlFor="file">Upload </label>
        <input type="file" className="form-control custom-file-upload" id="file" name="file" onChange={x}/>
      </form>}
      {(selectExcelData) && 
        <div  className="file_details" >
          <img className="file_img" src="https://png.pngtree.com/svg/20170708/_type_excel_file_1154793.png"/>
          <Button><Button>{fileName}</Button><Button onClick={removeExcelData}>X</Button></Button>
        </div>
        /* {fileName} */
       }
      </div>
  )
}

const ExcelReaderWithHOC=WithSpinner(ExcelReaderHTML)

let _data

class ExcelReader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      data: [],
      cols: [],
      loading:false,
      uploaded:false,
      fileName:this.props.excelFileName,
      moveNext:false
    }
    
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
   async handleChange(e){
    this.setState({loading:true})
    const {updateExcelData,setProgressNumber }=this.props
    const files = e.target.files;
    if (files && files[0]){ 
     _data = await userActions.uploadFile()
     console.log(`data`,_data)
      if(_data==2){
        console.log(`move next`)
      }
      this.props.setExcelFileName(files[0].name)
      file_name = files[0].name
      this.setState({ file: files[0],fileName:files[0]?.name,uploaded:true,loading:true },this.handleFile);
    }
  };
 
  handleFile() {
    this.setState({loading:true})
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      const {updateExcelData,setProgressNumber }=this.props
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        // console.log(JSON.stringify(this.state.data, null, 2));
        updateExcelData(JSON.stringify(this.state.data, null, 2))
        localStorage.setItem("excelData",JSON.stringify(this.state.data, null, 2))
        // {this.state.moveNext && setProgressNumber(2)}
        setProgressNumber(2)
        this.setState({loading:false})
      });
      
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }
  removeExcelData=()=>{
    const {updateExcelData }=this.props
    updateExcelData(null)
  }

  render() {
    return (
      <ExcelReaderWithHOC isLoading={this.state.loading}
      
      selectExcelData={this.props.excelData}
      excelFileName={this.props.excelFileName} 
      removeExcelData={this.removeExcelData}
      x={this.handleChange} file={this.state.file} fileName={this.state.fileName}  />
      
    )
  }
}

const mapDispatchToProps = dispatch => ({
    updateExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
    setExcelFileName: progressNumber =>dispatch(setExcelFileName(progressNumber)),
    // setExcelFileName
});
const mapStateToProps=createStructuredSelector({
  excelFileName: selectExcelFileName,
  excelData:selectExcelData,
})
export default connect(mapStateToProps,mapDispatchToProps)(ExcelReader);