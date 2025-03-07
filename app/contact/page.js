"use client";
import React, { useState, useEffect } from "react";
import "./contact.css"; // Import the CSS file
import confetti from "canvas-confetti"; // Confetti effect

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [fieldOffsets, setFieldOffsets] = useState({});

  // Track mouse position for advanced glow effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Calculate field offsets for precise glow positioning
    const calculateFieldOffsets = () => {
      const offsets = {};
      document.querySelectorAll(".input-container").forEach((container) => {
        const rect = container.getBoundingClientRect();
        offsets[container.dataset.field] = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };
      });
      setFieldOffsets(offsets);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", calculateFieldOffsets);

    // Initial calculation
    setTimeout(calculateFieldOffsets, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", calculateFieldOffsets);
    };
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Set active field for enhanced focus effect
  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Trigger Confetti on Form Submit with enhanced effect
  const triggerConfetti = () => {
    // First burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#0077b6", "#00bcd4", "#4a90e2", "#8e44ad", "#f39c12"],
    });

    // Second burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.6 },
        colors: ["#0077b6", "#00bcd4", "#4a90e2"],
      });
    }, 200);

    // Third burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.6 },
        colors: ["#8e44ad", "#f39c12", "#0077b6"],
      });
    }, 400);

    // Final burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 90,
        spread: 360,
        startVelocity: 20,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#0077b6", "#00bcd4", "#4a90e2", "#8e44ad", "#f39c12"],
      });
    }, 600);

    setIsSubmitted(true);

    // Reset form after successful submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  // Validate form before submission
  const validateForm = () => {
    // Basic validation (can be expanded)
    return (
      formData.name !== "" && formData.email !== "" && formData.message !== ""
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      triggerConfetti();
    }
  };

  return (
    <div
      className="contact-container"
      style={{
        "--mouse-x": `${mousePosition.x}px`,
        "--mouse-y": `${mousePosition.y}px`,
      }}
    >
      {/* Animated background elements */}
      <div className="bg-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--index": i,
              "--delay": `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Success message overlay */}
      {isSubmitted && (
        <div className="success-message">
          <div className="success-content">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" className="checkmark-svg">
                <path className="checkmark-path" d="M3,12 l6,6 l12,-12" />
              </svg>
            </div>
            <h3>Message Sent!</h3>
            <p>We'll get back to you soon</p>
          </div>
        </div>
      )}

      {/* Main content card */}
      <div className="floating-box">
        <div className="card-decoration top-left"></div>
        <div className="card-decoration top-right"></div>
        <div className="card-decoration bottom-left"></div>
        <div className="card-decoration bottom-right"></div>

        <div className="glow-effect"></div>

        <div className="content-wrapper">
          <header className="contact-header">
            <h1 className="title">
              <span className="title-icon">
                <svg className="email-icon" viewBox="0 0 24 24">
                  <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                </svg>
              </span>
              <span className="title-text">Contact Us</span>
            </h1>
          </header>

          <div className="contact-info-section">
            <div className="contact-details">
              <div className="location-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z" />
                </svg>
              </div>
              <p>
                Wireless Research Lab <br />
                Room No - 206/IIA <br />
                Bharti School of Telecom <br />
                Indian Institute of Technology Delhi <br />
                Hauz Khas, New Delhi-110016, INDIA
              </p>
            </div>

            <div className="contact-actions">
              <div className="contact-item phone-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                </span>
                <p>011-26582050</p>
              </div>

              <div className="contact-item email-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                  </svg>
                </span>
                <a href="mailto:support@vlab.co.in" className="email-link">
                  support@vlab.co.in
                </a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <h2 className="form-title">
              <span className="form-title-text">Send Us a Message</span>
              <span className="form-title-decoration"></span>
            </h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div
                className={`input-container ${
                  activeField === "name" ? "active" : ""
                }`}
                data-field="name"
                style={{
                  "--offset-left": fieldOffsets.name?.left || 0,
                  "--offset-top": fieldOffsets.name?.top || 0,
                }}
              >
                <label>
                  <span className="label-text">Name</span>
                  <span className="label-decoration"></span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="input-field"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                  />
                  <div className="field-highlight"></div>
                  <div className="field-decoration"></div>
                </div>
              </div>

              <div
                className={`input-container ${
                  activeField === "email" ? "active" : ""
                }`}
                data-field="email"
                style={{
                  "--offset-left": fieldOffsets.email?.left || 0,
                  "--offset-top": fieldOffsets.email?.top || 0,
                }}
              >
                <label>
                  <span className="label-text">Email</span>
                  <span className="label-decoration"></span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="input-field"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                  />
                  <div className="field-highlight"></div>
                  <div className="field-decoration"></div>
                </div>
              </div>

              <div
                className={`input-container ${
                  activeField === "message" ? "active" : ""
                }`}
                data-field="message"
                style={{
                  "--offset-left": fieldOffsets.message?.left || 0,
                  "--offset-top": fieldOffsets.message?.top || 0,
                }}
              >
                <label>
                  <span className="label-text">Message</span>
                  <span className="label-decoration"></span>
                </label>
                <div className="input-wrapper">
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    className="input-field"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                  ></textarea>
                  <div className="field-highlight"></div>
                  <div className="field-decoration"></div>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-background"></span>
                <span className="btn-text">Submit</span>
                <span className="btn-shine"></span>
                <span className="btn-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="map-container">
        <h2 className="map-title">
          <span className="map-title-text">Find Us on Google Maps</span>
          <span className="map-title-decoration"></span>
        </h2>
        <div className="map-wrapper">
          <div className="map-decoration top-left"></div>
          <div className="map-decoration top-right"></div>
          <div className="map-decoration bottom-left"></div>
          <div className="map-decoration bottom-right"></div>

          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps?q=28.5458982,77.185786&hl=en&z=17&output=embed"
            allowFullScreen=""
            loading="lazy"
            className="map-frame"
          ></iframe>
          <div className="map-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
