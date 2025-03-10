"use client";
import { useState, useEffect, useRef } from "react"

const Counter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    labs: 0,
    experiments: 0,
    users: 0,
    institutes: 0,
  })

  const targetCounts = {
    labs: 225,
    experiments: 1800,
    users: 2000000,
    institutes: 30,
  }

  const counterRef = useRef(null)
  const animationStarted = useRef(false)

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+"
    }
    return num + "+"
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && !animationStarted.current) {
      animationStarted.current = true

      const duration = 2000 // 2 seconds
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)

      let frame = 0

      const counter = setInterval(() => {
        frame++

        const progress = frame / totalFrames
        const easeOutQuad = 1 - (1 - progress) * (1 - progress)

        setCounts({
          labs: Math.floor(targetCounts.labs * easeOutQuad),
          experiments: Math.floor(targetCounts.experiments * easeOutQuad),
          users: Math.floor(targetCounts.users * easeOutQuad),
          institutes: Math.floor(targetCounts.institutes * easeOutQuad),
        })

        if (frame === totalFrames) {
          clearInterval(counter)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [isVisible])

  return (
    <section className="counter-section" ref={counterRef}>
      <div className="container">
        <div className="counter-grid">
          <div className="counter-item">
            <div className="counter-icon">🧪</div>
            <div className="counter-number">{formatNumber(counts.labs)}</div>
            <div className="counter-label">Virtual Labs</div>
          </div>

          <div className="counter-item">
            <div className="counter-icon">🔬</div>
            <div className="counter-number">{formatNumber(counts.experiments)}</div>
            <div className="counter-label">Experiments</div>
          </div>

          <div className="counter-item">
            <div className="counter-icon">👨‍🎓</div>
            <div className="counter-number">{formatNumber(counts.users)}</div>
            <div className="counter-label">Users Benefited</div>
          </div>

          <div className="counter-item">
            <div className="counter-icon">🏛️</div>
            <div className="counter-number">{formatNumber(counts.institutes)}</div>
            <div className="counter-label">Participating Institutes</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .counter-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #1a73e8, #0d47a1);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .counter-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/vlead_icon.jpg');
          background-size: 200px;
          background-repeat: repeat;
          opacity: 0.05;
          z-index: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }
        
        .counter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }
        
        .counter-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(5px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .counter-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .counter-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .counter-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .counter-label {
          font-size: 1rem;
          opacity: 0.9;
        }
        
        @media (max-width: 768px) {
          .counter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .counter-item {
            padding: 1.5rem;
          }
          
          .counter-number {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .counter-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Counter

