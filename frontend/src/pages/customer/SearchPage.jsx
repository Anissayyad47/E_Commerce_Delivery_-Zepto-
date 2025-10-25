import React, { useEffect, useState } from 'react'
import './SearchPage.css'
import Navbar from '../../components/Navbar1'
import search_banner from '../../assets/zepto_theme/search_banner.webp'
import axios from 'axios';
import ProductTemplate from './components/ProductTemplate'
import FooterAbove from './components/FooterAbove'
import Footer from '../../components/Footer.jsx';
import LoadProducts from '../../components/LoadProducts'
import ThreeDotLoader from '../../components/ThreeDotLoader'

export default function SearchPage() {
    const [products, setProducts]=useState();
    const [change, setChange]=useState(false);
    const [loading, setLoading]=useState(false);
    const [isSearch, setIsSearch]=useState(false);
    const [productFound, setProductFound]=useState(false);
    const [text, setText]=useState("?")

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // useEffect(()=> {
    //     axios.get(`${backendUrl}/products/search/orange`)
    //     .then((res)=> {
    //         console.log("Data ",res.data.categoryProducts);
    //         setProducts(res.data)
    //     }).catch((err)=> alert("faild to get data "))
    // },[])
    
    const handleSearch=async (text)=> {
        setIsSearch(true)
        setText(text);
        await axios.get(`${backendUrl}/products/search/${text}`)
        .then((res)=> {
            if(res.data.message==="No results found"){
                console.log("no result found");
                setProductFound(true)
                setIsSearch(false);
                
            }else {
            setIsSearch(false);
            setProducts(res.data)
            setProductFound(false)
            }
        }).catch((res)=> {
            alert("failed to search product please try again after some time")
            setIsSearch(false);
        })
        
    }
    return (
        <>
        <Navbar change={change} handleSearch={handleSearch}></Navbar>
        {!isSearch  ? (
        products && !productFound ? (
        <div className="search-container">
            <div className="search-container-in">
                <div className="search-recent-search">
                    <p className='recent-search'>Recent Search</p>
                    <div className='recent-search-container'>
                        <p>Bread</p>
                        <p>Bread</p>
                        <p>Bread</p>
                        <p>Bread</p>
                    </div>
                    <p className='search-result-query'>Showing results for "{text}"</p>
                </div>
                {/* <div className="div">
                    <img src={search_banner} />
                </div> */}
                <div className="search-result">
                {products &&  (
                    <>
                    <div className='product-row-1'>
                                        {/* <h2 className='product-row-heading'>Similar Products</h2> */}
                                            <div className='product-row'>
                                                {products.matchingProducts && (
                                                    products.matchingProducts
                                                        // .filter(product => product.commonDetails.category === "vegetables") // filter by category
                                                        .map((product, key) => (
                                                        product && <ProductTemplate key={key} product={product} setChange={setChange} setLoading={setLoading} />
                                                        ))
                                                )}
                                            </div>
                    </div>
                    <div className='product-row-1'>
                                        <h2 className='product-row-heading'>Similar Products</h2>
                                            <div className='product-row'>
                                                {products.categoryProducts && (
                                                    products.categoryProducts
                                                        // .filter(product => product.commonDetails.category === "vegetables") // filter by category
                                                        .map((product, key) => (
                                                        product && <ProductTemplate key={key} product={product} setChange={setChange} setLoading={setLoading} />
                                                        ))
                                                )}
                                            </div>
                    </div>
                    <div className='product-row-1'>
                                        <h2 className='product-row-heading'>You Might also like</h2>
                                            <div className='product-row'>
                                                {products.subCategoryProducts && (
                                                    products.subCategoryProducts
                                                        // .filter(product => product.commonDetails.category === "vegetables") // filter by category
                                                        .map((product, key) => (
                                                        product && <ProductTemplate key={key} product={product} setChange={setChange} setLoading={setLoading} />
                                                        ))
                                                )}
                                            </div>
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
        ):(
        <>
        <br/>
        <br/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='search-no-result-found'>No Result Found</div>
        </>
        )

        ):(
        <>
        <br/>
        <br/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <LoadProducts ></LoadProducts></>)}
        <div className='product-footer-container'>
            <div className='product-footer'>
                <FooterAbove></FooterAbove>
            </div>
        </div>
        {loading && (<ThreeDotLoader></ThreeDotLoader>)}
        <Footer></Footer>
        </>
    )
}
