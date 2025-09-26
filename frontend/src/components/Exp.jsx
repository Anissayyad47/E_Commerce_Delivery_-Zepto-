
import RolePopup from './RolePopup'
import React, { useState } from "react";

export default function Exp() {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div>
        <button onClick={() => setShowPopup(true)}>Login / Register</button>
        <RolePopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
        </div>
    )
}
