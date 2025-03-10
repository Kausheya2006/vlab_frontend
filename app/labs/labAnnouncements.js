"use client"

import { useEffect, useState, useRef } from "react"
import "./labAnnouncements.css"

const announcements = [
  {
    id: 1,
    text: "Various projects/ICT initiatives of the Ministry of Education are available on the link given here.",
    link: "#",
    linkText: "Please click here for more details.",
  },
  {
    id: 2,
    text: "Please click here to see the tutorial for using the Flash-based Labs through Virtual Box.",
    link: "#",
    linkText: "Please click here",
  },
  {
    id: 3,
    text: "To enroll as a Nodal Center, kindly submit the Expression of Interest (EOI) Form_2025.",
    link: "#",
    linkText: "Expression of Interest (EOI) Form_2025",
  },
  {
    id: 4,
    text: "New Virtual Labs on Quantum Computing and Artificial Intelligence are now available for students.",
    link: "#",
    linkText: "Explore new labs here.",
  },
]

const LabAnnouncements = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const announcementRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Auto-rotate announcements
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % announcements.length)
      }
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [isPaused])

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handleDotClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="lab-announcements-container">
      <div className="lab-announcements-header">
        <div className="lab-announcements-icon">📢</div>
        <h2 className="lab-announcements-title">Announcements</h2>
      </div>

      <div
        className="lab-announcements-box"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={announcementRef}
      >
        <div className="lab-announcements-content">
          {announcements.map((announcement, index) => (
            <div key={announcement.id} className={`lab-announcement-item ${index === activeIndex ? "active" : ""}`}>
              <p className="announcement-text">
                <span className="announcement-bullet">🔹</span>
                {announcement.text}{" "}
                <a href={announcement.link} className="lab-announcement-link">
                  {announcement.linkText}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lab-announcements-dots">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Announcement ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="lab-announcements-decoration left"></div>
      <div className="lab-announcements-decoration right"></div>
    </div>
  )
}

export default LabAnnouncements

