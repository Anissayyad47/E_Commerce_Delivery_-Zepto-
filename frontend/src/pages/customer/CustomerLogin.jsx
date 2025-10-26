import React from 'react'
import './CustomerLogin.css'
import { useState } from 'react'
import axios from 'axios';

export default function CustomerLogin() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser]=useState({
        username:"",
        email:"",
        password:"",
        role:"customer"
    })
    const [message, setMessage]=useState("")
    const handleChange = (e)=> {
        const {name, value}=e.target;
        setUser((prev)=> ({...prev,[name]:value}))
    }

    const handleLogin=async (e)=> {
        e.preventDefault();
        axios.post(`${backendUrl}/auth/login`,user)
        .then((res)=> setMessage(res.data.message))
        .catch((res)=> {
            setMessage(res.response.data.message)
        })
    }

    const handleRegister= async (e)=> {
        e.preventDefault();
    }
    
    return (
        <div className="auth-wrapper">
        <div className="auth-box">
            {/* Left Side (banner area) */}
            <div className="auth-left">
            <h1>Groceries delivered in 10 minutes</h1>
            <p>Order faster & easier everytime with the Zepto App</p>
            </div>

            {/* Right Side (form) */}
            <div className="auth-right">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            {message && (
                <p>{message}</p>
            )}
        {isLogin ? (
            <form onSubmit={handleLogin}>
                <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" name='email' onChange={handleChange}/>
                </div>

                <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" name='password' onChange={handleChange} />
                </div>
                <button type="submit" className="auth-btn">
                    Login
                </button>
            </form>
        ) : (
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" name='username' onChange={handleChange}/>
                </div>
                <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" name='email' onChange={handleChange}/>
                </div>

                <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" name='password' onChange={handleChange} />
                </div>
                <button type="submit" className="auth-btn">
                    Register
                </button>
            </form>
        )}
            <p className="toggle-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Register" : "Login"}
                </span>
            </p>
            </div>
        </div>
        </div>
    );
    }
