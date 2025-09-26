import React from 'react'
import { BsFillLightningChargeFill } from "react-icons/bs";
import peanutButter from "../../../assets/products/Peanut-Butter.webp"

export default function ProductTemplate({product}) {
    console.log("product : ",product);
    
    return (
        <>
        <div className='product-container'>
            <div className='product-image'>
                <img src={product.commonDetails.productImages[0]} ></img>
                {/* <button className='product-add-btn'>ADD</button> */}
                <p className='product-add-btn'>ADD</p>
            </div>
            <div className='product-details'>
                <p className='product-save'>SAVE ₹{product.commonDetails.actualPrice-product.commonDetails.discountPrice}</p>
                <span class="discounted-price">₹ {product.commonDetails.discountPrice} </span>
                <span class="original-price">₹ {product.commonDetails.actualPrice}</span>
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
