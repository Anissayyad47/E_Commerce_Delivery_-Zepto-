import React, { useEffect } from 'react'
import './ThreeDotLoader.css'


export default function ThreeDotLoader() {
    useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
    document.body.style.overflow = "auto";
    };
    }, []);

    return (
    <div className="overlay-loader">
      <div className="loader">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
    )
}
