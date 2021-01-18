import React, { useState,useEffect } from 'react'
import "./styles.css"
import detectBrowserLanguage from 'detect-browser-language'

const AboutReverse =({data,image_src,icon_src})=> {

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
  const [order,setOrder]=useState(false)
  useEffect(()=>{
    if(width<980){
      setOrder(true)
    }
    return(
        ()=>setOrder(false)
    )
  },[width])

    return (
        <div id="about">
        <div className="container">
          <div className="row">
            {order && <div className="col-xs-12 col-md-6"> <img src={image_src} className="img-responsive" alt=""/> </div>}
            <div className="col-xs-12 col-md-6">
              <div className="_height">
              <div className="about-text">
                <img className="about_right_icon" src={icon_src} />
                <h4 className="about_blue_text">{data?.blue_text[detectBrowserLanguage()]}</h4>
                <h2>{data?.heading[detectBrowserLanguage()]}</h2>
                <p>{data?.para[detectBrowserLanguage()]}</p>
              </div>
              </div>
            </div>
            {!order && <div className="col-xs-12 col-md-6"> <img src={image_src} className="img-responsive" alt=""/> </div>}
          </div>
        </div>
      </div>
    )
  }


export default AboutReverse
