import React,{useState} from "react"
import "../Info/Info.css"
import "./Contact.css"

const Contact =({user,full})=>{
    const [changePassword, setChangePassword] = useState(false);
// {!user?.Mt ? `${user?.user?.email}` : `${user?.Mt?.Ed}`}
    return(
    <div id={full && `info`} className="info">
        <div className="info_profile_pic" />
        <div className="contact_details">
        <div className="col-xs-12 col-md-6 _inputs">
            { !changePassword && <div className="_input">
            <label for="fname">Email &nbsp;&nbsp; Verified</label>
            <input type="text" id="email" name="firstname" placeholder={!user?.Mt ? `${user?.user?.email}` : `${user?.Mt?.Ed}`} disabled/>
            </div>}
            

            { !changePassword && <div className="_input">
            <label for="fname">State</label>
            <input type="text" id="state" name="firstname" placeholder="Kerala" />
            </div>}

            
            {   changePassword &&
                <div className="_input">
            <label for="fname">New password</label>
            <input type="text" id="new_password" name="firstname" placeholder="Change Password" />
            </div>}

        </div>
        <div className="col-xs-12 col-md-6 _inputs _inputs2">
            { !changePassword && <div className="_input">
            <label for="fname">Whatsapp Number</label>
            <input type="text" id="whatsapp_number" name="firstname" placeholder="987456321" disabled />
            </div>}

            { !changePassword && <div className="_input">
            <label for="fname">City</label>
            <input type="text" id="city" name="firstname" placeholder="Kochi" disabled />
            </div>}
            

            {   changePassword &&
                <div className="_input">
            <label for="fname">Confirm New password</label>
            <input type="text" id="confirm_new_password" name="firstname" placeholder="Change Password" />
            </div>}

        </div>
        </div>
        <div className="save_changes_btn">
            <button className="btn-grad" onClick={()=>{setChangePassword(!changePassword)}}>{!changePassword ? "Change Password" : "Submit"}</button>
        </div>
        </div>
    )
}
export default Contact;