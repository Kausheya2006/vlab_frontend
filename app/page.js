"use client"
import { useState, useEffect } from "react"
import Institutes from "./components/Institutes"
import "./styles.css"
import BroadAreasSection from "./components/Section"
import TestimonialsSection from "./components/Testomonials"
import Announcements from "./components/announcement"
import Counter from "./components/counter"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
export default function Home() {
  const [activeTab, setActiveTab] = useState("objectives")
  const backgroundImages = ["virtual-network.jpg", "car-image.png", "vlab-network.jpg"]
  const [currentImage, setCurrentImage] = useState(0)

  // Cycle through background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="homepage-container">
      {/* Hero Section with Parallax Effect */}
      <div className="hero-section">
        <div className="hero-background" style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}></div>

        <div className="hero-content">
          <div className="hero-badge">Government of India Initiative</div>
          <h1 className="hero-title">Virtual Labs</h1>
          <p className="hero-subtitle">Empowering Education Through Digital Innovation</p>

          {/* Search Bar */}
          <div className="search-container">
            <input type="text" placeholder="Search for labs, experiments, or topics..." className="search-input" />
            <Link href='/labs' className="search-button">
              <MagnifyingGlassIcon className="search-icon" />
              <span>Search</span>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Participating Institutes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Virtual Labs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2M+</span>
              <span className="stat-label">Students Benefited</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-button ${activeTab === "objectives" ? "active" : ""}`}
                onClick={() => setActiveTab("objectives")}
              >
                OBJECTIVES
              </button>
              <button
                className={`tab-button ${activeTab === "philosophy" ? "active" : ""}`}
                onClick={() => setActiveTab("philosophy")}
              >
                THE PHILOSOPHY
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "objectives" ? (
                <div className="objectives-content">
                  <ul className="objectives-list">
                    <li>
                      <span className="objective-icon">🔬</span>
                      <span>Provide remote-access to simulation-based labs in various disciplines</span>
                    </li>
                    <li>
                      <span className="objective-icon">🧪</span>
                      <span>Enable students to learn by conducting experiments, fostering curiosity</span>
                    </li>
                    <li>
                      <span className="objective-icon">📚</span>
                      <span>Offer comprehensive Learning Management System with video lectures</span>
                    </li>
                    <li>
                      <span className="objective-icon">🌐</span>
                      <span>Bridge the digital divide in education across India</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="philosophy-content">
                  <p>
                    Virtual Labs enable learning beyond physical boundaries, bridging the gap between theoretical
                    knowledge and practical experimentation. Our philosophy centers on:
                  </p>
                  <div className="philosophy-points">
                    <div className="philosophy-point">
                      <div className="point-number">01</div>
                      <div className="point-text">Accessibility for All</div>
                    </div>
                    <div className="philosophy-point">
                      <div className="point-number">02</div>
                      <div className="point-text">Learning by Doing</div>
                    </div>
                    <div className="philosophy-point">
                      <div className="point-number">03</div>
                      <div className="point-text">Digital Innovation</div>
                    </div>
                    <div className="philosophy-point">
                      <div className="point-number">04</div>
                      <div className="point-text">Educational Equity</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Broad Areas Section */}
      <BroadAreasSection />

      {/* Participating Institutes */}
      <Institutes />

      {/* Announcements & Video Section */}
      <div className="announcements-video-section">
        <div className="container">
          <div className="announcements-video-grid">
            <div className="announcements-container">
              <Announcements />
            </div>
            <div className="video-container">
              <div className="video-wrapper">
                <h3 className="video-title">Virtual Labs in Action</h3>
                <iframe
                  src="https://www.youtube.com/embed/FT2e3UvKteM"
                  title="Virtual Labs - Anywhere, Anytime and Free to use for everyone"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Counter Stats */}
      <Counter />
    </div>
  )
}

