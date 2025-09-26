import React, { useState } from 'react'
import './NavbarFooter.css'
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { BsFillLightningChargeFill } from "react-icons/bs";
import RolePopup from './RolePopup';

export default function Navbar() {
    const [loginPopup, setShowPopup] = useState(false)
    return (
    <>
    <div className='navbar-container'>
        <div className='navbar-container-in'>
            <div className='navbar-logo'><h1>ZEPTO</h1></div>
            <div className='navbar-heading'>
                <h2><BsFillLightningChargeFill size={20}></BsFillLightningChargeFill><span>5 minutes</span></h2>
                <p>Other-Mohmmadwadi Ghule Nagar</p>
            </div>
            <div className='navbar-search'>
                <FiSearch size={25}></FiSearch>
                <input type='text' placeholder='Search product'></input>
            </div>
            <div className='navbar-profile' onClick={()=> setShowPopup(true)}>
                <CgProfile size={30}></CgProfile>
                <p>Profile</p>
            </div>
            <div className='navbar-cart'>
                <IoCartOutline size={30}></IoCartOutline>
                <p>Cart</p>
            </div>
        </div>
        {loginPopup && (
            <RolePopup isOpen={loginPopup} onClose={() => setShowPopup(false)} />
        )}
    </div>
    </>
    )
}
