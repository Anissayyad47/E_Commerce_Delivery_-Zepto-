import React from 'react'
import '../customer/CustomerLogin.css'
import { useState } from 'react'

export default function Pikcer_packer_login() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-wrapper">
        <div className="auth-box">
            {/* Left Side (banner area) */}
            <div className="auth-left">
            <h1>Picker packer</h1>
            <h1>Groceries delivered in 10 minutes</h1>
            <p>Order faster & easier everytime with the Zepto App</p>
            </div>

            {/* Right Side (form) */}
            <div className="auth-right">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form>
                {!isLogin && (
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" />
                </div>
                )}

                <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
                </div>

                <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
                </div>

                <button type="submit" className="auth-btn">
                {isLogin ? "Login" : "Register"}
                </button>
            </form>

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
