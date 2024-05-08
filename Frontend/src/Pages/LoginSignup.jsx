import React, {useState } from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom'
const LoginSignup = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
     
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
       navigate('/userprofile');
        const response = await fetch('http://localhost:4000/login', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('auth-token', data.token);
            window.location.replace("/");
        } else {
            alert(data.errors);
        }
    }
    const signup = async () => {
        
        console.log("Signup Function Executed ",formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response)=>response.json()).then((data)=>responseData=data)
       if(responseData.success) {
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/login");
        } else {
            alert(responseData.errors)
        }
    };



  return (
    <div className="loginsignup">

        <div className="loginsignup-container">
            <h1>{state}</h1>
            <div className="loginsignup-fields">
               {state==="Sign Up"? <input  name='username' value={formData.username} onChange={changeHandler}  type="text" placeholder='First  Name'/>:<></>}
                <input name="email" value={formData.email} onChange={changeHandler}  type="email" placeholder='EMAIL ADDRESS'/>
                <input  name="password" value={formData.password} onChange={changeHandler}   type="password" placeholder='PASSWORD'/>
            </div>
             <button className="loginsignup-fields-btn" onClick={()=>{state==="Login"?login():signup()}}>Contiue</button>
             {state==="Sign Up"
             ?<p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}>Login here</span></p>
            :<p className="loginsignup-login">Create an account ?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
            
             <div className="loginsignup-agree">
                <input type="checkbox"  name='' id='' />
                <p>By continuing ,I  agree to the terms of use & privacy policy   </p>
             </div>
        </div>
    </div>

  )
}
export default LoginSignup;