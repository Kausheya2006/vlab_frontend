"use client";
import { useState } from "react"
import "./announcement.css"

const announcements = [
  {
    id: 1,
    text: "Various projects/ICT initiatives of the Ministry of Education are available on the link given here.",
    link: "#",
    linkText: "Please click here for more details.",
    date: "May 15, 2023",
  },
  {
    id: 2,
    text: "Please click here to see the tutorial for using the Flash-based Labs through Virtual Box.",
    link: "#",
    linkText: "Please click here",
    date: "April 28, 2023",
  },
  {
    id: 3,
    text: "To enroll as a Nodal Center, kindly submit the Expression of Interest (EOI) Form_2025.",
    link: "#",
    linkText: "Expression of Interest (EOI) Form_2025.",
    date: "March 10, 2023",
  },
  {
    id: 4,
    text: "New Virtual Labs on Quantum Computing and Artificial Intelligence are now available for students.",
    link: "#",
    linkText: "Explore new labs here.",
    date: "February 22, 2023",
  },
]

const Announcements = () => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <h2 className="announcements-title">Latest Announcements</h2>
        <div className="announcements-badge">Official Updates</div>
      </div>

      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`announcement-card ${expandedId === announcement.id ? "expanded" : ""}`}
            onClick={() => toggleExpand(announcement.id)}
          >
            <div className="announcement-date">{announcement.date}</div>
            <div className="announcement-content">
              <p>
                {announcement.text}{" "}
                <a href={announcement.link} className="announcement-link" onClick={(e) => e.stopPropagation()}>
                  {announcement.linkText}
                </a>
              </p>
            </div>
            <div className="announcement-indicator">{expandedId === announcement.id ? "−" : "+"}</div>
          </div>
        ))}
      </div>

      <a href="#" className="view-all-link">
        View All Announcements
        <span className="arrow-icon">→</span>
      </a>
    </div>
  )
}

export default Announcements

