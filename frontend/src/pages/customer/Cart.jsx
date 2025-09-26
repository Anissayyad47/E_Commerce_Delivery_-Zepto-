import React, { useEffect, useState } from 'react'
import './Cart.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FooterAbove from './components/FooterAbove'
import timeImage from '../../assets/zepto_theme/time.webp'
import locationImage from '../../assets/zepto_theme/location.webp'
import axios from 'axios'


export default function Cart() {
    const [qty, setQty]=useState(1);
    const [cartItems, setCartItems]=useState([]);
    const [items, setItems]=useState([]);
    useEffect(()=> {
        async function getCartItems(){
            axios.get("http://localhost:8080/cart/getAllCart/5")
            .then((res)=> {
                console.log(res.data.data)
                setItems(res.data.data.items)
                setCartItems(res.data.data)
            })
            .catch((err)=> console.log("failed to get itesm "))
        }
        getCartItems();
    },[])
    return (
        <>
        <Navbar></Navbar>
        <div className='cart-page'>
            <div className='cart-container'>
                <div className="cart-items-container">
                    <span><img src={timeImage}></img>Delivery in 6 mins</span>
                    {items && (
                        items.map((item,key)=> (
                            <div className="cart-itme" key={key}>
                                <img src={item.product.commonDetails.productImages[0]}></img>
                                <div className='cart-itme-details'>
                                    <p className='cart-itme-name'>{item.product.commonDetails.productName}</p>
                                    <p className='cart-itme-weight'>{item.product.commonDetails.qty}</p>
                                </div>
                                <div className='cart-item-quentity'>
                                    <button onClick={()=> setQty(qty-1)}>-</button>{qty}<button onClick={()=> setQty(qty+1)}>+</button>
                                </div>
                                <div className="cart-item-price">
                                    <span className="discounted-price">₹ {item.product.commonDetails.discountPrice} </span>
                                    <span className="original-price">₹ {item.product.commonDetails.actualPrice}</span>
                                </div>
                                <button className='cart-item-remove'>Remove from cart</button>
                            </div>
                        ))
                    )}

                </div>

                <div className="cart-place-order">
                    <div className='cart-address'>
                        <img src={locationImage}></img>
                        <div>
                            <h3>Delivering to Other</h3>
                            <p>sayyad nagar lane no.23, Hadapsar, Sayyad Nagar, Pune</p>
                        </div>
                    </div>
                    <button>Click to Pay Rs 434</button>
                </div>
                <FooterAbove></FooterAbove>
            </div>
        </div>

        <Footer></Footer>
        </>
    )
}
