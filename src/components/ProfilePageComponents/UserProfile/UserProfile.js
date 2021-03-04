import Card  from "../Card/Card"
import React,{useState,useEffect} from "react"
import "./UserProfile.css"

const UserProfile=({full,user})=>{
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      
       function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
      }
      
    const { height, width } = useWindowDimensions();
    const [showTwoInARow,setShowTwoInARow]=useState(false)
    useEffect(()=>{
        if(width<1180 && width>580){
            setShowTwoInARow(true);
        }return(()=>{
            setShowTwoInARow(false)
        })
    }
    ,[width])
    // styles={full && {"flex":"0"}}
    return(
        <div id={full && `user_profile`} className="user_profile"  >
            <div className="user_profile_user_info_card">
                {/* <Card title={`${user?.Mt?.Ed}`}/> */}
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                
            </div>
            <div className="survey_cards">
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
                <Card title={!user?.profileObj ? `${user?.user?.email}` : `${user?.profileObj?.name}`}/>
            </div>
        </div>
    )
}
export default UserProfile
{/* <div className="user_profile_survey_cards">
                <div className="row">
                    {showTwoInARow &&<div className="row_1">
                        <Card className="user_profile_row_card" />
                        <Card className="user_profile_row_card" />
                    </div>}
                    {!showTwoInARow && <Card className="user_profile_row_card" />}
                    {!showTwoInARow && <Card className="user_profile_row_card" />}
                    <Card className="user_profile_row_card" />
                </div>
            </div>
            <div className="user_profile_survey_cards">
                <div className="row">
                    {showTwoInARow &&<div className="row_1">
                        <Card className="user_profile_row_card" />
                        <Card className="user_profile_row_card" />
                    </div>}
                    {!showTwoInARow && <Card className="user_profile_row_card" />}
                    {!showTwoInARow && <Card className="user_profile_row_card" />}
                    <Card className="user_profile_row_card" />
                </div>
            </div>
            <div className="user_profile_survey_cards">
                <div className="row">
                    {showTwoInARow &&<div className="row_1">
                        <Card className="user_profile_row_card" />
                        <Card className="user_profile_row_card" />
                    </div>}
                    {!showTwoInARow && <Card className="user_profile_row_card" />}
                    {!showTwoInARow && <Card className="user_profile_row_card" />}
                    <Card className="user_profile_row_card" />
                </div>
            </div> */}