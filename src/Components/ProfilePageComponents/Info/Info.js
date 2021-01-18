import React,{useState} from "react"
import { Badge ,Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import "./Info.css"
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const Info =({fetchedUser,full})=>{
    const [editMode,setEditMode]=useState(false);
    const [formats, setFormats] = React.useState(() => ["Hindi"]);
    const [user,setUser]=useState({
      name:String,
      age:Number,
      date_of_birth:String,
      languages:formats,
    });

  const handleFormat = (event, newFormats) => {
    if (newFormats.length) {
      setFormats(newFormats);
      setUser({...user,languages:formats})
    }
  };

    function handleChange(e) {
      const { name, value } = e.target;
      setUser((inputs) => ({ ...inputs, [name]: value }));
    }
    return(
        <div id={full && `info`} className="info">
          <div className="info_profile_pic">
              <AvatarGroup>
                <Badge 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}}
                badgeContent={editMode && <a>Edit</a>} color="">
                  <Avatar src={fetchedUser?.profileObj?.imageUrl} />
                </Badge>
              </AvatarGroup>
            <div className="_name">
              <h3> {!fetchedUser?.Mt ? `${fetchedUser?.user?.email}` : `${fetchedUser?.Mt?.Ed}`}</h3>
              <p>New York, USA</p>
            </div>
          </div>
        <div className="info_details">
        <div className="col-lg-12 col-md-6 _inputs">
            <div className="_input">
            <label for="fname">Name</label>
            <input type="text" id="fname" name="name" onChange={handleChange} placeholder={fetchedUser?.Mt?.Ed} disabled={!editMode}/>
            </div>
            
            <div className="_input">
            <label for="fname">Age</label>
            <input type="text" id="age" name="age" onChange={handleChange} placeholder="18" disabled={!editMode} />
            </div>

        </div>
        <div className="col-lg-12 col-md-6 _inputs">
            <div className="_input">
            <label for="fname">Date Of Birth</label>
            <input type="text" id="date_of_birth" name="date_of_birth" onChange={handleChange} placeholder="01/01/2001" disabled={!editMode} />
            </div>

            
        <div className=" _multiselect">
            <label className="languages_known_label" for="fname">Languages Known</label>
          <ToggleButtonGroup className="languages_known_options" value={formats} onChange={handleFormat} aria-label="device">
            <ToggleButton value="Hindi" aria-label="Hindi" disabled={!editMode}>
              Hindi
            </ToggleButton>
            <ToggleButton value="English" aria-label="English" disabled={!editMode}>
              English
            </ToggleButton>
            <ToggleButton value="Other" aria-label="Other" disabled={!editMode}>
              Other
            </ToggleButton>
          </ToggleButtonGroup>
            </div>
        </div>
      </div>
          <div className="save_changes_btn">
            <button className="btn-grad" onClick={()=>{setEditMode(!editMode)}}>{editMode ? "Save changes" : "Edit Profile"}</button>
          </div>
        </div>
    )
}
export default Info;