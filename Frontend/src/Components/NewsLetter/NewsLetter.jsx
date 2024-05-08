import React from "react";
import './NewsLetter.css'
const NewsLetter = () => {
    return(
        <div className="newsletter">
<h1>Get Your New Offers On Your Email</h1>
<p>Subscribe Our NewsLetter And Stay Updated </p>
<div>
    <input type="email" placeholder="Enter Your Email Id"/>
    <button>SUBSCRIBE</button>
</div>
        </div>
    )
}
export default NewsLetter;