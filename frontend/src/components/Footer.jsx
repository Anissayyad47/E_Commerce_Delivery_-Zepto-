import React from 'react'
import './NavbarFooter.css'
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import red_logo from '../assets/zepto_theme/logo.svg'


export default function Footer() {
    return (
        <footer className="footer">
        <div className="footer-container">
            
            {/* Logo + Description */}
            <div className="footer-section">
            <h2 className="footer-logo"><img src={red_logo}></img></h2>
            <p className="footer-desc">
                Groceries delivered in 10 minutes! Fresh products from local warehouses to your doorstep.
            </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
            </div>

            {/* Customer Support */}
            <div className="footer-section">
            <h3>Customer Support</h3>
            <ul>
                <li><a href="/faq">FAQs</a></li>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
            </div>

            {/* Social Media */}
            <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
                <IoLogoInstagram></IoLogoInstagram>
                <FaLinkedinIn></FaLinkedinIn>
                <FaXTwitter></FaXTwitter>
                <FaFacebookF></FaFacebookF>
            </div>
            </div>
        </div>

        {/* Bottom Note */}
        <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Zepto Clone. All rights reserved.</p>
        </div>
        </footer>
    );
}
