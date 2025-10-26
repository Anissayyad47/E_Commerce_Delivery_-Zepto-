import React, { useEffect, useState } from "react";
import "./ResponsiveWarning.css";

const ResponsiveWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Show warning if screen width is less than 1700px
      setShowWarning(window.innerWidth < 1700);
    };

    // Initial check
    checkScreenSize();

    // Check whenever window resizes
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (showWarning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Restore scrolling on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWarning]);

  if (!showWarning) return null;

  return (
    <div className="responsive-popup">
      <div className="popup-content">
        <h2>⚠️ Website Not Optimized for Small Screens</h2>
        <p>
          Currently, this website is not fully responsive. In the future, it may
          become responsive. Please view it on a larger screen for the best experience.
        </p>
        {/* <button onClick={() => setShowWarning(false)}>Close</button> */}
      </div>
    </div>
  );
};

export default ResponsiveWarning;
