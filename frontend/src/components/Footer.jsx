import React from 'react'
import './NavbarFooter.css'


export default function Footer() {
    return (
        <footer className="footer">
        <div className="footer-container">
            
            {/* Logo + Description */}
            <div className="footer-section">
            <h2 className="footer-logo">Zepto Clone</h2>
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
                <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
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
