import React from "react";
import "./RolePopup.css";
import { useNavigate } from "react-router-dom";

const RolePopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleRedirect = (role, type) => {
        navigate(`/${type}?role=${role}`);
        onClose();
    };

    return (
        <div className="popup-overlay">
        <div className="popup-content">
            <button className="close-btn" onClick={onClose}>
            ✖
            </button>
            <h2 className="popup-title">Continue as</h2>

            <div className="role-options">
            <div
                className="role-card"
                onClick={() => navigate("/customer/login")}
            >
                <h3>Customer</h3>
                <p>Order groceries & get them delivered</p>
            </div>

            <div
                className="role-card"
                onClick={() => navigate("/deliveryPartner/login")}
            >
                <h3>Delivery Staff</h3>
                <p>Deliver orders quickly and safely</p>
            </div>

            <div
                className="role-card"
                onClick={() => navigate("/pickerPacker/login")}
            >
                <h3>Packer/Picker</h3>
                <p>Pack fresh products from the warehouse</p>
            </div>

            <div
                className="role-card"
                onClick={() => handleRedirect("admin", "login")}
            >
                <h3>Warehouse Admin</h3>
                <p>Manage products, discounts & stock</p>
            </div>
            </div>

            <div className="switch-section">
            <p>Don’t have an account?</p>
            <button
                className="switch-btn"
                onClick={() => navigate("/register")}
            >
                Register Now
            </button>
            </div>
        </div>
        </div>
    );
};

export default RolePopup;
