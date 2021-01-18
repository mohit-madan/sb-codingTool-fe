import React, { Component } from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx';
import { setExcelData } from '../../../Redux/ExcelData/excel-data.actions';
import { setProgressNumber } from '../../../Redux/Progress-number/progress.actions';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
 
class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      loading:false,
      uploaded:false,
    }
    
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    this.setState({loading:true})
    const files = e.target.files;
    if (files && files[0]){ 
      this.setState({ file: files[0],uploaded:true,loading:true });
    }
    this.setState({loading:false})
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
        setProgressNumber(2)
      });
 
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }
 
  render() {
    return (
      <div>
        {this.state.loading && <h1>Loading ...</h1>}
        <label htmlFor="file">Upload </label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        {
          this.state.uploaded && <input type='submit' 
            value="Process"
            onClick={this.handleFile} />
        }
        
        </div>
      
    )
  }
}
const mapDispatchToProps = dispatch => ({
    updateExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),
    setProgressNumber: progressNumber =>dispatch(setProgressNumber(progressNumber))
});
export default connect(null,mapDispatchToProps)(ExcelReader);