import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Home.css'
import banner from "../../assets/zepto_banner.webp"
import AllCategory from './components/AllCategory'
import AvailableCategory from './components/AvailableCategory'
import ProductTemplate from './components/ProductTemplate'
import FooterAbove from './components/FooterAbove'
import RolePopup from '../../components/RolePopup'
import axios from 'axios'


export default function Home() {
    const [products , setProducts]=useState([]);
    useEffect(()=> {
        function getProducts(){
            axios.get("http://localhost:8080/products/getAllNewProducts")
            .then((res)=> {
                setProducts(res.data.data)
            })
            .catch((err)=> alert(err.response.message))
        }
        getProducts();
    },[])

    let arr=[1,2,3,4,5,6];
    console.log(products);
    return (
        <>
        <Navbar></Navbar>
        <div className='home-container'>
            <div className='home-container-in'>
                <AllCategory></AllCategory>
                <AvailableCategory></AvailableCategory>
                <div className='home-banner-image'>
                    <img src={banner}></img>
                </div>
                <div className='product-row-1'>
                    <h2>Vegetables</h2>
                    <div className='product-row'>
                        {products.length>0 && (
                            products
                                .filter(product => product.commonDetails.category === "vegetables") // filter by category
                                .map((product, key) => (
                                product && <ProductTemplate key={key} product={product} />
                                ))
                        )}
                    </div>
                </div>

                <div className='product-row-1'>
                    <h2>Fruits</h2>
                    <div className='product-row'>
                        {products.length>0 && (
                            products
                                .filter(product => product.commonDetails.category === "fruits") // filter by category
                                .map((product, key) => (
                                product && <ProductTemplate key={key} product={product} />
                                ))
                        )}
                    </div>
                </div>

                {/* <div className='product-row-1'>
                    <h2>Fruits & Vegetables</h2>
                    <div className='product-row'>
                        {arr.map((order, key)=> (
                            <ProductTemplate></ProductTemplate>
                        ))}
                    </div>
                </div>''
                <div className='product-row-1'>
                    <h2>Fruits & Vegetables</h2>
                    <div className='product-row'>
                        {arr.map((order, key)=> (
                            <ProductTemplate></ProductTemplate>
                        ))}
                    </div>
                </div> */}
                <FooterAbove></FooterAbove>
            </div>
        </div>
        
        <Footer></Footer>
        <RolePopup></RolePopup>
        </>
    )
}
