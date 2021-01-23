import React from "react"
import $ from "jquery"

class Upload extends React.Component{

        uploadAction() {
            var data = new FormData();
            var fileData = document.querySelector('input[type="file"]').files[0];
            data.append("file", fileData);
            
            const _token=JSON.parse(localStorage.token).accessToken
            fetch("http://localhost:5000/uploadFile", {
              method: "POST",
              headers:{'Authorization': `Bearer ${_token}`},
              body: data
            }).then(function (res) {
              if (res.ok) {
                alert("Perfect! ");
              } else if (res.status == 401) {
                alert("Oops! ");
              }
            }, function (e) {
              alert("Error submitting form!");
            });
        
        }
    
    render(){
        return(
            <form encType="multipart/form-data" action>
            <label htmlFor="file">Upload </label>
            <input type="file" name="file" id="file" onChange={this.uploadAction.bind(this)} />
          </form>
        )
    }
}
export default Upload