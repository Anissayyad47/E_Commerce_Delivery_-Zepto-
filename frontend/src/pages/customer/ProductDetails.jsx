import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { FaStar } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import Navbar from '../../components/Navbar.jsx'
import img1 from '../../assets/products/milk/image1.webp'
import img2 from '../../assets/products/milk/image2.webp'
import img3 from '../../assets/products/milk/image3.webp'
import img4 from '../../assets/products/milk/image4.webp'
import img5 from '../../assets/products/milk/image5.webp'
import noReturns from '../../assets/no_return.svg';
import fastDelivery from '../../assets/fastDelivery.svg'
import FooterAbove from './components/FooterAbove'
import Footer from '../../components/Footer.jsx';
import axios from 'axios';
import ProductTemplate from './components/ProductTemplate'

const productId="68d505660697c1091d145d37";

export default function ProductDetails() {
    const [image, setImage]=useState();
    const [product, setProduct]=useState();
    const [similarProduct , setSimilarProduct]=useState([]);
    const [alsoLikeProduct, setAlsoLikeProduct]=useState([]);

    useEffect(()=>{
        async function getProduct(){
            axios.get(`http://localhost:8080/products/get/${productId}`)
            .then((res)=> {
                console.log("Data received : ",res.data)
                setProduct(res.data.data)
                setImage(res.data.data.commonDetails.productImages[0])
            })
            .catch((err)=> console.log("Failed to receive"))
        }
        getProduct();
    },[])

    useEffect(()=> {
        async function getSimilarProduct(){
            if(product){
                axios.get(`http://localhost:8080/products/get/similarProducts/${product.commonDetails.category}`)
                .then((res)=> {
                    console.log("Similar Data received ************************* : ",res.data)
                    setSimilarProduct(res.data.data)
                })
                .catch((err)=> console.log("Failed to receive"))

                axios.get(`http://localhost:8080/products/get/alsoLikeProducts/${product.commonDetails.subCategory}`)
                .then((res)=> {
                    console.log("You might also like *************************** : ",res.data)
                    setAlsoLikeProduct(res.data.data)
                })
                .catch((err)=> console.log("Failed to receive"))
                console.log('Sub category : ',product.commonDetails.category );
                console.log('Sub category : ',product.commonDetails.subCategory );
                
            }
        }
        getSimilarProduct();
    },[product])
    let columImg = [img1,img2,img3,img4,img5];
    
    const formatLabel = (key) => {
    const result = key.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
    };
    return (
        <>
        <Navbar></Navbar>
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
                            <p className='product-price'>₹{product.commonDetails.actualPrice}</p>
                        </div>
                        <div className='product-features'>
                                <div>
                                    <img src={noReturns} alt='No Returns'></img>
                                    <p>No Return or Exchange</p>
                                </div>
                                <div>
                                    <img src={fastDelivery} alt='Fast delivery'></img>
                                    <p>No Return or Exchange</p>
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
                                {/* <tr>
                                    <td >Brand</td>
                                    <td>Amul</td>
                                </tr>
                                <tr>
                                    <td>Product Type</td>
                                    <td>Toned Milk</td>
                                </tr>
                                <tr>
                                    <td>Key Features</td>
                                    <td>Pasteurized and homogenized for safety, rich in essential nutrients and calcium, perfect for tea and coffee making, zero added preservatives</td>
                                </tr>
                                <tr>
                                    <td>Material Type Free</td>
                                    <td>Preservative-free</td>
                                </tr>
                                <tr>
                                    <td>Packaging Type</td>
                                    <td>Pouch</td>
                                </tr>
                                <tr>
                                    <td>Ingredients</td>
                                    <td>Milk Solids (3% Fat Minimum, 8.5% Snf Minimum)</td>
                                </tr>
                                <tr>
                                    <td>Usage Recommendation</td>
                                    <td>For Immediate Use</td>
                                </tr>
                                <tr>
                                    <td>Dietary Preference</td>
                                    <td>Veg</td>
                                </tr>
                                <tr>
                                    <td>Unit</td>
                                    <td>1 pack (500 ml)</td>
                                </tr>
                                <tr>
                                    <td>Storage Instruction</td>
                                    <td>Store continuously under refrigeration below 5?C until the 'Use By' date</td>
                                </tr> */}
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
                        {product && product.commonDetails.productImages.length>0 && (
                            similarProduct
                                // .filter(product => product.commonDetails.category === "fruits")
                                .map((product, key) => (
                                product && <ProductTemplate key={key} product={product} />
                                ))
                        )}
                    </div>
                </div>

                <div className='product-row-1'>
                    <h2>You might also like</h2>
                    <div className='product-row'>
                        {product && product.commonDetails.productImages.length>0 && (
                            alsoLikeProduct
                                // .filter(product => product.commonDetails.category === "vegetables")
                                .map((product, key) => (
                                product && <ProductTemplate key={key} product={product} />
                                ))
                        )}
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
    )
}
