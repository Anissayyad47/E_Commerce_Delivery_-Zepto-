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
import LoadProducts from '../../components/LoadProducts'
import ThreeDotLoader from '../../components/ThreeDotLoader'
import Loader from '../../components/Loader'
import DevelopmentNotice from '../../components/DevelopmentNotice'

export default function Home() {
    const [products , setProducts]=useState([]);
    const [change, setChange]=useState(false);
    const [loading, setLoading]=useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    useEffect(()=> {
        function getProducts(){
            axios.get(`${backendUrl}/products/getAllNewProducts`)
            .then((res)=> {
                setProducts(res.data.data)
            })
            .catch((err)=> alert(err.response.message))
        }
        getProducts();
    },[])

    console.log(products);
    return (
        <>
        <DevelopmentNotice></DevelopmentNotice>
        
        {products ? (
        <>
            <Navbar change={change}></Navbar>
                    <div className='home-container'>
                        <div className='home-container-in'>
                            <AllCategory></AllCategory>
                            <div className='home-banner-image'>
                                <img src={banner}></img>
                            </div>
                            <AvailableCategory></AvailableCategory>
                            {products.length>0 ? (<>
                                <div className='product-row-1'>
                                    <h2 className='product-row-heading'>Vegetables</h2>
                                        <div className='product-row'>
                                            {products.length>0 && (
                                                products
                                                    .filter(product => product.commonDetails.category === "vegetables") // filter by category
                                                    .map((product, key) => (
                                                    product && <ProductTemplate key={key} product={product} setChange={setChange} setLoading={setLoading} />
                                                    ))
                                            )}
                                        </div>
                                </div>
                                <div className='product-row-1'>
                                    <h2 className='product-row-heading'>Fruits</h2>
                                    <div className='product-row'>
                                        {products.length>0 && (
                                            products
                                                .filter(product => product.commonDetails.category === "fruits") // filter by category
                                                .map((product, key) => (
                                                product && <ProductTemplate key={key} product={product} setChange={setChange} setLoading={setLoading} />
                                        ))
                                    )}
                                </div>
                            </div>
                        </>):(<LoadProducts></LoadProducts>)}

                        <FooterAbove></FooterAbove>
                    </div>
                </div>
            {loading && (<ThreeDotLoader></ThreeDotLoader>)}
            <Footer></Footer>
            <RolePopup></RolePopup>
        </>
        ):(
            <>
            <Loader></Loader>
            </>
        )}
        
        </>
    )
}
