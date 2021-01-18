import React, { Component } from "react";

export class Features extends Component {
  render() {
    return (
      <div className="features">  
      <div className="indian_people_img_div">      
        <img className="indian_people_img" src="images/indian-people-group-wearing-national-traditional-clothes-banner_48369-20033-removebg-preview.png" />
      </div>
      <div id="features" className=" text-center">
        <div className="features_row container">
          {/* <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Features</h2>
          </div> */}
          <div className="row">
            {this.props.data
              ? this.props.data.map((d,i) => (
                  <div  key={`${d.title}-${i}`} className="col-md-4 col-sm-6">
                    {" "}
                    <i className={d.icon}></i>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Features;
