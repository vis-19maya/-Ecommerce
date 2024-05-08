import React from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {
    return(
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">DESCRIPTION</div>
                <div className="descriptionbox-nav-box">REVIEWS(122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An e-commerce website is an online platform that facilities the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactons without the need for a physical presence. E-commerce websites have gained mmense popularity due to their convinience, accesibility and the global reach they offer.</p>
        
        <br/>
         <p>E-commerce webites typical display product or services along with detailed description, images, prices and any available variation (eg: size, colours). Each product usually has its own dedicated page with relevant information.</p>
            </div>
        </div>
    )
}
export default DescriptionBox;