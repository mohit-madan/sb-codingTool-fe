import React from "react"
import $ from "jquery"
import "./Navbar.css"
import { Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import axios from "axios";
import config from "../../../config";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
class Navbar extends React.Component{
    logout=()=>{
        axios.get(`${config.apiUrl}/logout`)
        localStorage.clear()
        // window.location.replace(`${config.redirecturl}`);
    }
    componentDidMount(){
        $(document).ready(function(){
            $(window).scroll(function(){
                // sticky navbar on scroll script
                if(this.scrollY > 20){
                    $('.navbar').addClass("sticky");
                }else{
                    $('.navbar').removeClass("sticky");
                }
                
                // scroll-up button show/hide script
                if(this.scrollY > 500){
                    $('.scroll-up-btn').addClass("show");
                }else{
                    $('.scroll-up-btn').removeClass("show");
                }
            });
        
            // slide-up script
            $('.scroll-up-btn').click(function(){
                $('html').animate({scrollTop: 0});
                // removing smooth scroll on slide-up button click
                $('html').css("scrollBehavior", "auto");
            });
        
            $('.navbar .menu li a').click(function(){
                // applying again smooth scroll on menu items click
                $('html').css("scrollBehavior", "smooth");
            });
        
            // toggle menu/navbar script
            $('.menu-btn').click(function(){
                $('.navbar .menu').toggleClass("active");
                $('.menu-btn i').toggleClass("active");
            });
        
            // typing text animation script
            // var typed = new Typed(".typing", {
            //     strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
            //     typeSpeed: 100,
            //     backSpeed: 60,
            //     loop: true
            // });
        
            // var typed = new Typed(".typing-2", {
            //     strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
            //     typeSpeed: 100,
            //     backSpeed: 60,
            //     loop: true
            // });
        
            // owl carousel script
            // $('.carousel').owlCarousel({
            //     margin: 20,
            //     loop: true,
            //     autoplayTimeOut: 2000,
            //     autoplayHoverPause: true,
            //     responsive: {
            //         0:{
            //             items: 1,
            //             nav: false
            //         },
            //         600:{
            //             items: 2,
            //             nav: false
            //         },
            //         1000:{
            //             items: 3,
            //             nav: false
            //         }
            //     }
            // });
        });
        
    }
    render(){
        return(
            <div>
      <div className="scroll-up-btn">
          {/* <i className="fas fa-angle-up" /> */}
            <ArrowUpwardIcon/>
        </div>
        <nav className="navbar">
          <div className="max-width">
            <div className="logo">
              <a href="#">Survey<span>Buddy</span></a></div>
            <ul className="menu">
              <li><a href="#home" className="menu-btn">Home</a></li>
              <li><a href="#about" className="menu-btn">About</a></li>
              {/* <li><a href="#services" className="menu-btn">Services</a></li> */}
              {/* <li><a href="#skills" className="menu-btn">Skills</a></li> */}
              {/* <li><a href="#teams" className="menu-btn">Teams</a></li> */}
              <li><a onClick={this.logout} href="#contact" className="menu-btn logout">Logout</a></li>
            </ul>
            <div className="menu-btn">
              {/* <i className="fas fa-bars" /> */}
              <Button ><MenuIcon style={{color:"#0e71eb",height:"30px",width:"30px"}}/></Button>
            </div>
          </div>
        </nav>
        
      </div>
        )
    }
}
export default Navbar