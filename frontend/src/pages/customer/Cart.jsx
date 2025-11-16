import React, { useEffect, useState } from 'react'
import './Cart.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FooterAbove from './components/FooterAbove'
import timeImage from '../../assets/zepto_theme/time.webp'
import locationImage from '../../assets/zepto_theme/location.webp'
import axios from 'axios'
import ThreeDotLoader from '../../components/ThreeDotLoader'
import Loader from '../../components/Loader'


export default function Cart() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [qty, setQty]=useState(1);
    const [cartItems, setCartItems]=useState();
    const [change, setChange]=useState(false);
    const [load, setLoad]=useState(false)
    const [items, setItems]=useState([]);
    useEffect(()=> {
        async function getCartItems(){
            axios.get(`${backendUrl}/cart/getAllCart/5`)
            .then((res)=> {
                console.log(res.data.data)
                setItems(res.data.data.items)
                setCartItems(res.data.data)
                setLoad(false)
            })
            .catch((err)=> console.log("failed to get itesm "))
        }
        getCartItems();
    },[change])

    const handelAddQty=async(product)=> {
        const item={
            "productId":product.productId,
            "quantity":1,
            "price":product.price,
            "discountedPrice":product.discountedPrice,
            "total":product.discountedPrice,
            "totalActualPrice": product.price
        }
        console.log("holy " ,item);
        setLoad(true)
        axios.post(`${backendUrl}/cart/addItem/${5}`,item)
        .then((res)=> {
            setChange(prev=>!prev);
        })
        .catch((res)=> alert("failed to inremented qty"))
    }

    const handleRemoveQty=async(product)=> {
        setLoad(true)
        axios.delete(`${backendUrl}/cart/remove/qty/${5}/${product.productId}`)
        .then((res)=> {
            setChange(prev=> !prev);
        })
        .catch((res)=> alert("failed to decrement qty"))
    }

    const handleRemoveItem=async(product)=> {
        setLoad(true)
        axios.delete(`${backendUrl}/cart/remove/${5}/${product.productId}`)
        .then((res)=> setChange(prev=> !prev))
        .catch((res)=> alert("failed to remove item from cart"))
    }

    const makePayment = async () => {
    const res = await fetch("http://localhost:8080/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartItems.cartTotal }), // Rs 500
    });

    const order = await res.json();

    const options = {
        key: "rzp_test_Rg2Xl4W3DJ9Vzd",
        amount: order.amount,
        currency: "INR",
        name: "My Ecommerce Store",
        order_id: order.id,
        handler: async function (response) {
        const verifyRes = await fetch("http://localhost:8080/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
        });
        const result = await verifyRes.text();
        alert(result);
        },
        theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    };

    return (
        <>
        {cartItems ? (
            <>
            <Navbar change={change}></Navbar>
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
                                                <button onClick={()=> handleRemoveQty(item)}>-</button>{item.quantity}<button onClick={()=> handelAddQty(item)}>+</button>
                                            </div>
                                            <div className="cart-item-price">
                                                <span className="discounted-price">₹ {item.total} </span>
                                                <span className="original-price">₹ {item.totalActualPrice}</span>
                                            </div>
                                            <button className='cart-item-remove' onClick={()=> handleRemoveItem(item)}>Remove from cart</button>
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
                                <button onClick={makePayment}>Click to Pay Rs {cartItems.cartTotal}</button>
                            </div>
                            <FooterAbove></FooterAbove>
                        </div>
                    </div>
                    {load && (<ThreeDotLoader></ThreeDotLoader>)}
                    <Footer></Footer>
            </>
        ):(<Loader></Loader>)}
        </>
    )
}
