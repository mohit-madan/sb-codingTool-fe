import React from "react"
import "./Card.css"
const Card =({title})=>{
    return(
        <div className="card">
            <img className="card_img" alt="Card_Avatar" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_avatar_child_kid-512.png" />
            <h2 className="card_title">{title ? title : "Mohit"}</h2>
            <h5 className="card_info">asdasdnchanged. It was popularise with thes, and more recently with</h5>

            <hr />
            <div className="">
                <ul className="card_options">
                    <li className="card_option">
                        <h2 > 4 </h2>
                        <h5>Total Wins</h5>
                    </li>
                    <li className="card_option">
                        <h2 > 4 </h2>
                        <h5>Total Wins</h5>
                    </li>
                    <li className="card_option">
                        <h2 > 4 </h2>
                        <h5>Total Wins</h5>
                    </li>
                </ul>
            </div>
        </div>
    )
}



export default Card

