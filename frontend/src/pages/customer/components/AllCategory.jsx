import React from 'react'
import { PiHandbagThin } from "react-icons/pi";
import { CiGlass } from "react-icons/ci";
import { SiHomebrew } from "react-icons/si";
import { PiBroom } from "react-icons/pi";
import { MdOutlineSmartToy } from "react-icons/md";
import { CiApple } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { GiSmartphone } from "react-icons/gi";
import { PiDressThin } from "react-icons/pi";
import { PiShirtFoldedLight } from "react-icons/pi";

export default function AllCategory() {
    return (
        <>
                <div className='home-all-categories'>
                    <div>
                        <PiHandbagThin size={30}></PiHandbagThin>
                        <p>All</p>
                    </div>
                    <div>
                        <SiHomebrew size={30}></SiHomebrew>
                        <p>Cafe</p>
                    </div>
                    <div>
                        <PiBroom size={30}></PiBroom>
                        <p>Home</p>
                    </div>
                    <div>
                        <MdOutlineSmartToy size={30}></MdOutlineSmartToy>
                        <p>Toys</p>
                    </div>
                    <div>
                        <CiApple size={30}></CiApple>
                        <p>Fresh</p>
                    </div>
                    <div style={{width:"150px"}}>
                        <CiHeadphones size={30}></CiHeadphones>
                        <p>Electronics</p>
                    </div>
                    <div>
                        <GiSmartphone size={30}></GiSmartphone>
                        <p>Mobiles</p>
                    </div>
                    <div>
                        <PiDressThin size={30}></PiDressThin>
                        <p>Beauty</p>
                    </div>
                    <div>
                        <PiShirtFoldedLight size={30}></PiShirtFoldedLight>
                        <p>Fashion</p>
                    </div>
                </div>
        </>
    )
}
