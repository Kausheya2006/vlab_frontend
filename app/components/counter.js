"use client";
import React, { useState, useEffect } from "react";
import "./counter.css";

const Counter = () => {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 3000); // Toggle every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="counter-container">
      <div className="counter-content">
        <h1 className="vlabs-header text-5xl">VLabs Outreach</h1>

        {/* Counter Section */}
        <div className="counter-box">
          {/* First Set of Counters */}
          <div
            className={`counter-group ${
              showFirst ? "slide-in-left" : "slide-out-left"
            }`}
          >
            <div className="counter-item counter-blue">
              <h3>Website Page Views</h3>
              <p>81,330,147</p>
            </div>
            <div className="counter-item counter-green">
              <h3>Participants Attended</h3>
              <p>8,560,251</p>
            </div>
          </div>

          {/* Second Set of Counters */}
          <div
            className={`counter-group ${
              showFirst ? "slide-out-right" : "slide-in-right"
            }`}
          >
            <div className="counter-item counter-orange">
              <h3>Nodal Centers</h3>
              <p>1,531</p>
            </div>
            <div className="counter-item counter-purple">
              <h3>Usage</h3>
              <p>4,679,904</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
