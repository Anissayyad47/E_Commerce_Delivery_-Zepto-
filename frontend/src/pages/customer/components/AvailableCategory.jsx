import React from 'react'
import fruitsVegetables from "../../../assets/categories/vegitables.png"
import breakfast from "../../../assets/categories/breakfast&snacks.png";
import groceries from "../../../assets/categories/groceries.png";
import frozenFood from "../../../assets/categories/frozenFood.png";
import iceCreams from "../../../assets/categories/iceCreams.png";
import packagedFood from "../../../assets/categories/packagedFood.png"
import sweets from "../../../assets/categories/sweets.png";
import teaCofee from "../../../assets/categories/teaCofee.png"
import vegitables from "../../../assets/categories/vegitables.png";
import zeptoCafe from "../../../assets/categories/zeptoCafe.png"

export default function AvailableCategory() {
    return (
    <>
        <div className='home-available-categories'> 
            <div className='home-category'>
                <img src={fruitsVegetables} alt='Vegetable' ></img>
                <h3>Fruits & Vegetables</h3>
            </div>
            <div className='home-category'>
                <img src={breakfast} alt='Vegetable'></img>
                <h3>Dairy,Bread & Eggs</h3>
            </div>
            <div className='home-category'>
                <img src={groceries} alt='Vegetable'></img>
                <h3>Atta,Rice,Oil & Dals</h3>
            </div>
            <div className='home-category'>
                <img src={frozenFood} alt='Vegetable'></img>
                <h3>Frozen Food</h3>
            </div>
            <div className='home-category'>
                <img src={iceCreams} alt='Vegetable'></img>
                <h3>Ice Creams & More</h3>
            </div>
            <div className='home-category'>
                <img src={packagedFood} alt='Vegetable'></img>
                <h3>Packaged Food</h3>
            </div>
            <div className='home-category'>
                <img src={sweets} alt='Vegetable'></img>
                <h3>Sweet Cravings</h3>
            </div>
            <div className='home-category'>
                <img src={teaCofee} alt='Vegetable'></img>
                <h3>Tea, Cofee & More</h3>
            </div>
        </div>
    </>
    )
}
