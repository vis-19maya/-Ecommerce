import React from "react";
import './Hero.css';
import hero_image from '../Assets/home_banner.jpg';
const Hero = () => {
    return(
        <div className="hero">
    
      <div className="hero-right">
         <img src={hero_image} alt=""/>  
      </div>
        </div>
    )
}
export default Hero;