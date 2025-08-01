import React, { useState } from 'react'
import './CSS/Login.css';

export default function Login() {
    const url = 'https://shopper-backend-ug5r.onrender.com'
    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    })

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const login = async() => {
        console.log("Login function executed", formData);
        let responseData;
        await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => responseData = data)
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token)
            window.location.replace('/');
        } else {
            alert(responseData.errors)
        }
    }

    const signup = async() => {
        console.log("Signup function executed", formData);
        let responseData;
        await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => responseData = data)
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token)
            window.location.replace('/');
        } else {
            alert(responseData.errors)
        }
    }

    return (
        <div className='Login'>
            <div className="LoginContainer">
                <h1>{state}</h1>
                <div className="LoginFields">
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => {state === "Login" ? login() : signup()}}>Continue</button>
                {state === "Sign Up" 
                ? <p className="ExistingLogin">
                    Already have an account? <span onClick={() => {setState("Login")}}>Login here</span>
                </p> 
                : <p className="ExistingLogin">
                    Create an account? <span onClick={() => {setState("Sign Up")}}>Click here</span>
                </p>}

                <div className="LoginAgree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}
