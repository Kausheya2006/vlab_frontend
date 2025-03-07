"use client";
import React from "react";
import "./announcement.css"; // Custom CSS for Announcements

const Announcements = () => {
  return (
    <div className="announcements-container">
      <h2 className="announcements-title">📢 Latest Announcements</h2>
      <div className="announcements-list">
        <div className="announcement-card">
          <p>
            Various projects/ICT initiatives of the Ministry of Education are
            available on the link given here.{" "}
            <a href="#" className="announcement-link">Please click here for more details.</a>
          </p>
        </div>
        <div className="announcement-card">
          <p>
            <a href="#" className="announcement-link">Please click here</a> to see the tutorial for
            using the Flash-based Labs through Virtual Box.
          </p>
        </div>
        <div className="announcement-card">
          <p>
            To enroll as a Nodal Center, kindly submit the{" "}
            <a href="#" className="announcement-link">Expression of Interest (EOI) Form_2025.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
