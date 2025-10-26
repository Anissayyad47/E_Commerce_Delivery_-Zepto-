import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './ProductDetails.css'
import { FaStar } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import Navbar from '../../components/Navbar.jsx'
import img1 from '../../assets/products/milk/image1.webp'
import noReturns from '../../assets/no_return.svg';
import fastDelivery from '../../assets/fastDelivery.svg'
import FooterAbove from './components/FooterAbove'
import Footer from '../../components/Footer.jsx';
import axios from 'axios';
import ProductTemplate from './components/ProductTemplate'
import Loader from '../../components/Loader.jsx';
import ProductSkeleton from '../../components/ProductSkeleton .jsx';


export default function ProductDetails() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [image, setImage]=useState();
    const [product, setProduct]=useState(null);
    const [similarProduct , setSimilarProduct]=useState([]);
    const [alsoLikeProduct, setAlsoLikeProduct]=useState([]);
    const { slug, productId } = useParams();

    useEffect(()=>{
        async function getProduct(){
            axios.get(`${backendUrl}/products/get/${productId}`)
            .then((res)=> {
                setProduct(res.data.data)
                setImage(res.data.data.commonDetails.productImages[0])
            })
            .catch((err)=> console.log("Failed to receive"))
        }
        getProduct();
    },[productId])

    useEffect(()=> {
        async function getSimilarProduct(){
            if(product){
                axios.get(`${backendUrl}/products/get/similarProducts/${product.commonDetails.category}`)
                .then((res)=> {
                    // console.log("Similar Data received ************************* : ",res.data)
                    setSimilarProduct(res.data.data)
                })
                .catch((err)=> console.log("Failed to receive"))

                axios.get(`${backendUrl}/products/get/alsoLikeProducts/${product.commonDetails.subCategory}`)
                .then((res)=> {
                    // console.log("You might also like *************************** : ",res.data)
                    setAlsoLikeProduct(res.data.data)
                })
                .catch((err)=> console.log("Failed to receive"))
                // console.log('Sub category : ',product.commonDetails.category );
                // console.log('Sub category : ',product.commonDetails.subCategory );
                
            }
        }
        getSimilarProduct();
    },[product])
    
    const formatLabel = (key) => {
    const result = key.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
    };
    return (
        <>
        <Navbar></Navbar>
        {product ? (
        <>
        <div className='product-container'>
            <div className='product-container-in'>
                <div className='product-container-left'>
                    <div className='product-container-images'>
                        <div className='product-container-column-images'>
                            {product && product.commonDetails.productImages.length>0 && (
                                product.commonDetails.productImages.map((image, key)=> (
                                    <img src={image} onClick={()=> setImage(image)} key={key}></img>
                                ))
                            )}
                        </div>
                        <div className='product-container-row-images'>
                            <div>
                                {product ? (<img src={image}></img>):(<img src={img1}></img>)}
                                
                                {/* <button className='product-left'>left</button>
                                <button className='product-right'>right</button> */}
                            </div>
                            <button className='product-add-to-cart'>Add To Cart</button>
                        </div>
                    </div>
                </div>
                {product && (
                <div className='product-container-right'>
                    <div className='product-right-details'>
                        <div className='product-detials'>
                            <h3>{product.commonDetails.productName}</h3>
                            <p>Net Qty: {product.commonDetails.qty} <span className='product-ratings'><FaStar></FaStar> 4.7</span> (990.9k)</p>
                            <p className='product-get-in'><BsLightningChargeFill size={20}></BsLightningChargeFill>Get in 6 minutes</p>
                            <div className='product-price'>
                                <div className='product-discoundPrice'>₹{product.commonDetails.actualPrice}</div>
                                <div className='product-actualPrice'>₹{product.commonDetails.discountPrice}</div>
                            </div>
                            
                        </div>
                        <div className='product-features'>
                                <div>
                                    <img src={noReturns} alt='No Returns'></img>
                                    <p>No Return or Exchange</p>
                                </div>
                                <div>
                                    <img src={fastDelivery} alt='Fast delivery'></img>
                                    <p>Fast Delivery</p>
                                </div>
                        </div>
                    </div>
                    <div className='product-highlights'>
                        <h2>Highlishts</h2>
                        <table>
                            <tbody>
                                {Object.entries(product.highlights)
                                .filter(([key, value])=> value !==null)
                                .map(([key, value])=> (
                                    <tr key={key}>
                                        <td>{formatLabel(key)}:</td>
                                        <td>{value.toString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='product-highlights'>
                        <h2>Information</h2>
                        <table>
                            <tbody>
                                {Object.entries(product.additionalInfo)
                                .filter(([key, value])=> value !==null)
                                .map(([key, value])=> (
                                    <tr key={key}>
                                        <td>{formatLabel(key)}:</td>
                                        <td>{value.toString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
            </div>
        </div>
        <div className='product-footer-container'>
            <div className='product-footer'>
                <div className='product-row-1'>
                    <h2>Similar Products</h2>
                    <div className='product-row'>
                        {product && product.commonDetails.productImages.length>0 ? (
                            similarProduct
                                // .filter(product => product.commonDetails.category === "fruits")
                                .map((product, key) => (
                                product && <ProductTemplate key={key} product={product} />
                                ))
                        ):(<ProductSkeleton></ProductSkeleton>)}
                    </div>
                </div>

                <div className='product-row-1'>
                    <h2>You might also like</h2>
                    <div className='product-row'>
                        {product && product.commonDetails.productImages.length>0 ? (
                            alsoLikeProduct
                                // .filter(product => product.commonDetails.category === "vegetables")
                                .map((product, key) => (
                                product && <ProductTemplate key={key} product={product} />
                                ))
                        ):(<ProductSkeleton></ProductSkeleton>)}
                    </div>
                </div>
            </div>
        </div>
        <div className='product-footer-container'>
            <div className='product-footer'>
                <FooterAbove></FooterAbove>
            </div>
        </div>
        <Footer></Footer>
        </>
        ):(<Loader></Loader>)}
        </>
    )
}
