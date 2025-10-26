import React, { useEffect, useState } from 'react'
import './NavbarFooter.css'
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { BsFillLightningChargeFill } from "react-icons/bs";
import RolePopup from './RolePopup';
import { useNavigate } from 'react-router-dom';
import super_saver from '../assets/zepto_theme/super_saver.svg'
import zepto_logo from '../assets/zepto_theme/zepto_logo.svg'
import axios from 'axios';

export default function Navbar1({change, handleSearch}) {
    const navigation=useNavigate();
    const [loginPopup, setShowPopup] = useState(false);
    const [cart, setCart]=useState();
    const [searchText, setSearchText]=useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

        useEffect(()=> {
        async function getCartItems(){
            axios.get(`${backendUrl}/cart/getAllCart/5`)
            .then((res)=> {
                setCart(res.data.data)
                
            })
            .catch((err)=> console.log("failed to get itesm "))
        }
        getCartItems();
    },[change])

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(searchText);
        }

    };

    const handleCart=()=> {
        navigation("/cart")
    }

    const handleOnChange=(e)=> {
        setSearchText(e.target.value)
    }
    
    return (
    <>
    <div className='navbar-container'>
        <div className='navbar-container-in'>
            <div className='navbar-logo' onClick={()=> navigation("/")}><img src={zepto_logo}></img></div>
            <div><img src={super_saver}></img></div>
            <div className='navbar-heading'>
                <h2><BsFillLightningChargeFill size={15}></BsFillLightningChargeFill><span>5 minutes</span></h2>
                <p>Other-Mohmmadwadi Ghule Nagar</p>
            </div>
            <div className='navbar-search'>
                <FiSearch size={20} onClick={handleKeyDown}></FiSearch>
                <input type='text' placeholder='Search product' onChange={handleOnChange} onKeyDown={handleKeyDown}></input>
            </div>
            <div className='navbar-profile' onClick={()=> setShowPopup(true)}>
                <CgProfile size={25}></CgProfile>
                <p>Profile</p>
            </div>
            <div className='navbar-cart' onClick={handleCart}>
                <div className='navbar-cart-notification'>
                    {cart && (<div className='navbar-cart-notification-icon'>{cart.items.length}</div>)}
                    <IoCartOutline size={25}></IoCartOutline>
                </div>
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