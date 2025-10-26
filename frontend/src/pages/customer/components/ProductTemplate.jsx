import React, { useState } from 'react'
import { BsFillLightningChargeFill } from "react-icons/bs";
import peanutButter from "../../../assets/products/Peanut-Butter.webp"
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import axios from 'axios';

export default function ProductTemplate({product,setChange,setLoading}) {
    const [count, setCount]=useState(0);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate=useNavigate();
    const handleClick=()=> {
        navigate(`/pn/${product.commonDetails.productName}/pvid/${product.id}`)
    }

    // Add Count
    const handleAdd= async (e)=> {
        e.stopPropagation();
        // setCount(count+1);
        const item={
            "productId":product.id,
            "quantity":1,
            "price":product.commonDetails.actualPrice,
            "discountedPrice":product.commonDetails.discountPrice,
            "total":product.commonDetails.discountPrice,
            "totalActualPrice": product.commonDetails.actualPrice
        }
        setLoading(true);
        axios.post(`${backendUrl}/cart/addItem/${5}`,item)
        .then((res)=> {
            setLoading(false)
            setChange(prev => !prev)
        })
        .catch((res)=> alert("failed to add item"))
    }
    
    const handleAddCount=(e)=> {
        e.stopPropagation();
        // setCount(count+1);
        // add count here
    }
    // this is for deleting count
    const handleRemoveCount=(e)=> {
        e.stopPropagation();
        setCount(count-1);
    }

    return (
        <>
        <div className='product-container' onClick={handleClick}>
            <div className='product-image'>
                <img src={product.commonDetails.productImages[0]} ></img>
                {/* <button className='product-add-btn'>ADD</button> */}
                {count >0 ? (<div className='product-add-count' onClick={handleAddCount}><FiMinus className='product-minus' size={25} onClick={handleRemoveCount}></FiMinus> {count} <FaPlus className='product-plus' size={20} ></FaPlus></div>):(<p className='product-add-btn' onClick={handleAdd}>ADD</p>)}
            </div>
            <div className='product-details'>
                <p className='product-save'>SAVE ₹{product.commonDetails.actualPrice-product.commonDetails.discountPrice}</p>
                <span className="discounted-price">₹ {product.commonDetails.discountPrice} </span>
                <span className="original-price">₹ {product.commonDetails.actualPrice}</span>
                <p className='product-quentity'>{product.commonDetails.qty}</p>
                <p className='product-name'>{product.commonDetails.productName}</p>
                <div className='product-delivery-time'>
                    <BsFillLightningChargeFill></BsFillLightningChargeFill>
                    <p>7 mins</p>
                </div>
            </div>
        </div>

        </>
    )
}
