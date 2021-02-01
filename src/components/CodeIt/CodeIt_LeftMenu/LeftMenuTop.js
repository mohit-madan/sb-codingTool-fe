import React from 'react'

function LeftMenuTop() {
    return (
            <div className="flex">
                <div className="flex input_box_div">
                    <input className=" _1"
                     placeholder={`Filter by Keyword`} />
                </div>
                <div className="flex" style={{alignItems: "start"}}>
                <p style={{width: "max-content"}}>Order : </p>
                    <div className="dropdown">
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default LeftMenuTop
