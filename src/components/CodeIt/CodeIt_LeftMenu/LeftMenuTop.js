import React from 'react'

function LeftMenuTop() {
    return (
            <div className="flex">
                <div className="flex">
                    <input className=" _1"
                     placeholder={`Filter by Keyword`} />
                </div>
                <div className="flex">
                <p>Order : </p>
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
    )
}

export default LeftMenuTop
