import React, { Component,useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import XLSX from 'xlsx';
import { setExcelData, setExcelFileName, setExcelDataHeaders } from '../../../Redux/ExcelData/excel-data.actions';
import { setProgressNumber } from '../../../Redux/Progress-number/progress.actions';
import { get_headers } from './GetHeaders';
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
import { setShowUploaderAlerts } from '../../../Redux/UploaderAlerts/UploaderAlerts.actions';

const ExcelReaderHTML=({removeExcelData,file,excelFileName,x,fileName,selectExcelData})=>{
  return(
    <div className="excel_reader">
      {!selectExcelData &&
       <form className="height100" encType="multipart/form-data">
        <label htmlFor="file">Upload </label>
        <input type="file" className="form-control custom-file-upload" id="file" name="file" onChange={x}/>
      </form>}
      {(selectExcelData) && 
        <div  className="file_details" >
          <img className="file_img" src="https://png.pngtree.com/svg/20170708/_type_excel_file_1154793.png"/>
          <Button><Button>{fileName}</Button><Button onClick={removeExcelData}>X</Button></Button>
        </div>
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
      header_list: [],
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
      this.props.setExcelFileName(files[0].name)
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
      let data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      const {updateExcelData,setProgressNumber,setShowUploaderAlerts, updateHeaders }=this.props
      if(data?.length>30){
        data=Object.entries(data).slice(0,30).map(entry => entry[1])
      }
      this.setState({ data: data, header_list: get_headers(ws) }, () => {
        updateExcelData(JSON.stringify(this.state.data, null, 2));
        updateHeaders(this.state.header_list);
        
        setProgressNumber(2);
        setShowUploaderAlerts(false);
        this.setState({loading:false});

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
    updateHeaders: collectionsMap => dispatch(setExcelDataHeaders(collectionsMap)),
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber)),
    setExcelFileName: progressNumber =>dispatch(setExcelFileName(progressNumber)),
    setShowUploaderAlerts: collectionsMap => dispatch(setShowUploaderAlerts(collectionsMap)),
    // setExcelFileName
});
const mapStateToProps=createStructuredSelector({
  excelFileName: selectExcelFileName,
  excelData:selectExcelData,
})
export default connect(mapStateToProps,mapDispatchToProps)(ExcelReader);