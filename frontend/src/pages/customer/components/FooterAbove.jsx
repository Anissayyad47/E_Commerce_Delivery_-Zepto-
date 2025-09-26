import React from 'react'
import opne_app from '../../../assets/zepto_theme/opne-app.svg'
import place_order from '../../../assets/zepto_theme/place-an-order.svg'
import get_delivery from '../../../assets/zepto_theme/get-free-delivery.svg'


export default function FooterAbove() {
    return (
        <>
        <div className='footerabove-container'>
            <div className='footerabove-fssai'>
                <div>
                    <h1>The place that fits all</h1>
                    <h1>your needs</h1>
                    <p>Crafted with love from <span>Zepto Team </span></p>
                </div>
            </div>
            <div className='footerabove-how-it-works'>
                <p className='footerabove-heading'>How it Works</p>
                <div className='footerabove-how-it-works-in'>
                    <div>
                        <img src={opne_app} alt='opne-app'></img>
                        <p className='footerabove-how-it-works-heading'>Open the app</p>
                        <p className='footerabove-how-it-works-description'>Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more</p>
                    </div>
                    <div>
                        <img src={place_order} alt='opne-app'></img>
                        <p className='footerabove-how-it-works-heading'>Place an order</p>
                        <p className='footerabove-how-it-works-description'>Add your favourite items to the cart & avail the best offers</p>
                    </div>
                    <div>
                        <img src={get_delivery} alt='opne-app'></img>
                        <p className='footerabove-how-it-works-heading'>Get free delivery</p>
                        <p className='footerabove-how-it-works-description'>Experience lighting-fast speed & get all your items delivered in 10 minutes</p>
                    </div>
                </div>
            </div>
            <div className='footerabove-searches-categories'>
                <div className='footerabove-popular-searches'>
                    <p className='footerabove-searches-categories-heading'>Popular Searches</p>
                    <p className='footerabove-popular-searches-topic'><span>Products :</span>Avocado | Strawberry | Pomegranate | Beetroot | Ash gourd | Bottle gourd | Lady finger | Potato | Lemon | Dalchini | Fnnel seeds | Blueberry | Papaya|Dragon fruit | Mushroom | Lettuce </p>
                    <p className='footerabove-popular-searches-topic'><span>Brands :</span>Yakult | My Muse | Aashirvaad Atta | Too Yumm | Lays | Figaro Olive Oil | Nandini Milk | Amul | Mother Dairy Near Me | Fortune Oil | Superyou|Durex Condoms | Ferns and Petals</p>
                    <p className='footerabove-popular-searches-topic'><span>Categories :</span>Grocery | Cigarettes | Chips | Curd | Hukka flavour | Paan shop near me | Eggs price | Cheese slice | Fresh fruits | Fresh vegetables | Refined oil | Butter price | Paneer price</p>
                </div>
                <p className='footerabove-searches-categories-heading'>Categories</p>
                <div className='footerabove-categories'>
                    <div className='footerabove-categories-columns'>
                        <p>Fruits & Vegetables</p>
                        <p>Baby Food</p>
                        <p>Breakfast & Sauces</p>
                        <p>Cleaning Essentials</p>
                        <p>Homegrown Brands</p>
                    </div>
                    <div className='footerabove-categories-columns'>
                        <p>Atta, Rice, Oil & Dals</p>
                        <p>Dairy, Bread & Eggs</p>
                        <p>Tea, Coffee & More</p>
                        <p>Home Needs</p>
                        <p>Paan Corner</p>
                    </div>
                    <div className='footerabove-categories-columns'>
                        <p>Masala & Dry Fruits</p>
                        <p>Cold Drinks & Juices</p>
                        <p>Biscuits</p>
                        <p>Electricals & Accessories</p>
                        
                    </div>
                    <div className='footerabove-categories-columns'>
                        <p>Sweet Cravings</p>
                        <p>Munchies</p>
                        <p>Makeup & Beauty</p>
                        <p>Hygien & Grooming</p>
                        
                    </div>
                    <div className='footerabove-categories-columns'>
                        <p>Frozen Food & Ice Creams</p>
                        <p>Meats, Fish & Eggs</p>
                        <p>Bath & Body</p>
                        <p>Health & Baby Care</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
