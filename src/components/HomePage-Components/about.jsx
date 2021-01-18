import React, { useState,useEffect } from 'react'
import "./styles.css"
import Reveal from 'react-reveal/Reveal';
import detectBrowserLanguage from 'detect-browser-language'

const About =({order,data,image_src,icon_src})=> {
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
  
  useEffect(()=>{
    if(width<980){
      order=true;
    }
  },[width])

    return (
      
      <Reveal effect="fadeInUp">
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
            {!order && <div className="col-xs-12 col-md-6"> <img src="img/about.jpg" className="img-responsive" alt=""/> </div>}
          </div>
        </div>
      </div>
      </Reveal>
    )
  }


export default About
