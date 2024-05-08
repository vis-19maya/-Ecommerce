import React from "react";
import './Footer.css';
import footer_logo from '../Assets/logo_big.jpg';
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
    return(
        <div className="footer">
          <div className="footer-logo">
            <img src={footer_logo} alt=""/>
            <p>i-fly</p>
          </div>
          <ul className="footer-links">
               <li>Company</li>
               <li>Products</li>
               <li>Offices</li>
               <li>About</li>
               <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-containers">
                <img src={instagram_icon} alt=""/>
            </div>
            <div className="footer-icons-containers">
                <img src={pintester_icon} alt=""/>
            </div>
            <div className="footer-icons-containers">
                <img src={whatsapp_icon} alt=""/>
            </div>
        </div>
        <div className="footer-copright">
            <hr/>
            <p>Copyright @2024 - All Right Reserved.</p>
        </div>
        </div>
    )
}
export default Footer;