import React from "react";
import "./labAnnouncements.css"; // Custom styles for Lab Page Announcements

const LabAnnouncements = () => {
  return (
    <div className="lab-announcements-container">
      <h2 className="lab-announcements-title">📢 Announcements</h2>
      <div className="lab-announcements-box">
        <div className="lab-announcements-scroll">
          <p>
            🔹 Various projects/ICT initiatives of the Ministry of Education are available on the link given here.{" "}
            <a href="#" className="lab-announcement-link">Please click here for more details.</a>
          </p>
          <p>
            🔹 <a href="#" className="lab-announcement-link">Please click here</a> to see the tutorial for using the Flash-based Labs through Virtual Box.
          </p>
          <p>
            🔹 To enroll as a Nodal Center, kindly submit the{" "}
            <a href="#" className="lab-announcement-link">Expression of Interest (EOI) Form_2025</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabAnnouncements;
