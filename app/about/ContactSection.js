import React, { useEffect, useRef } from 'react';
import JSConfetti from 'js-confetti';
import './ContactSection.css';

const ContactSection = () => {
  const confettiRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    confettiRef.current = new JSConfetti();

    const observer = new IntersectionObserver(
      ([entry]) => {
        
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const triggerConfetti = () => {
    confettiRef.current.addConfetti({
      emojis: ['📧', '📞', '🏢', '💻', '🔬'],
      emojiSize: 50,
      confettiNumber: 50,
    });
  };

  return (
    <div ref={sectionRef} className="contact-section neo-futuristic-container">
      <h2 className="glitch-text">Contact Us</h2>
      <div className="contact-grid">
        <div className="contact-info">
          <p className="neon-text">
            <span className="icon">📧</span> support@vlab.co.in
          </p>
          <p className="neon-text">
            <span className="icon">📞</span> 011-26582050
          </p>
        </div>
        <div className="address-info">
          <h3 className="sub-heading">Address</h3>
          <p className="address neon-text">
            Wireless Research Lab<br />
            Room No - 206/IIA<br />
            Bharti School of Telecom<br />
            Indian Institute of Technology Delhi<br />
            Hauz Khas, New Delhi-110016
          </p>
        </div>
      </div>
      <button className="cyber-button" onClick={triggerConfetti}>
        <span className="glitch-text">Celebrate Contact!</span>
      </button>
    </div>
  );
};

export default ContactSection;
