import React, { useContext, useRef, useState,useEffect } from "react";
import './Navbar.css'
import nav_dropdown from '../Assets/nav_dropdown.png'
import logo from '../Assets/logo.jpg';
import cart_icon from '../Assets/cart_icon.png';
import { Link,  useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import profile from '../Assets/profile.png';

const Navbar = () => {
    const navigate = useNavigate();
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setIsAdmin(userRole === 'admin');
    }, []);

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img onClick={()=>navigate('/adminpanel')}src={logo} alt="" />
                <p>i-fly</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li><Link style={{ textDecoration: 'none'}} to='/'>Home</Link></li>
                <li><Link style={{ textDecoration: 'none'}} to='/mens'>Men</Link></li>
                <li><Link style={{ textDecoration: 'none'}} to='/womens'>Women</Link></li>
                <li><Link style={{ textDecoration: 'none'}} to='/kids'>Kids</Link></li>
                {isAdmin && <li><Link style={{ textDecoration: 'none'}} to='/admin'>Admin Panel</Link></li>}
            </ul>
            <br/>
            <br/>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <>
                        <button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                        <img src={profile} onClick={() => navigate('/userprofile')} height='40px' alt=""/>
                    </>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
