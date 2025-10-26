import React, { useState, useEffect } from "react";
import "./DevelopmentNotice.css";

const DevelopmentNotice = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenNotice = sessionStorage.getItem("seenDevNotice");
    if (!hasSeenNotice) {
      setShow(true);
      sessionStorage.setItem("seenDevNotice", "true");
    }
  }, []);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="notice-overlay">
      <div className="notice-modal">
        <h2>👋 Hi there!</h2>
        <p className="intro">
          I'm <strong>Anis</strong> — the developer of this project.
        </p>
        <p>
          This website is currently <strong>under active development</strong>.
          I'm adding new features, improving the UI, and fixing bugs.  
        </p>
        <p>
          Some pages, components, or functionalities might not be fully working
          right now — but updates are coming soon 🚀
        </p>

        <div className="render-note">
          <h3>⚙️ Technical Note</h3>
          <p>
            The backend server for this project is hosted on{" "}
            <strong>Render</strong>. If you’re visiting after a long time, the
            server might be sleeping. It can take up to <strong>3–5 minutes</strong> 
            to wake up and respond to new requests. Please wait a bit if data loads slowly ⏳
          </p>
        </div>

        <p className="thanks">Thanks for checking it out 💙</p>

        <button onClick={() => setShow(false)}>Continue to Site</button>
      </div>
    </div>
  );
};

export default DevelopmentNotice;
