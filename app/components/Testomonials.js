"use client";
import { useState, useEffect } from "react"
import "./Testomonials.css"

const testimonials = [
  {
    quote:
      "One of the primary advantages associated with the utilization of Virtual Laboratory is the ability for students to engage in self-paced learning. This technology facilitates students in engaging in studying, preparing for, and doing laboratory experiments at their own convenience, regardless of time and location.",
    author: "Dr. Mohd Zubair Ansari",
    institution: "National Institute of Technology Srinagar",
    image: "/image1.png",
  },
  {
    quote:
      "Virtual Labs are implemented in USAR, GGSIPU and are useful in understanding the theories and concepts of science or other subjects that cannot be studied alone only by textbooks. It has the great potential to enhance actual laboratory experiences.",
    author: "Dr. Khyati Chopra",
    institution: "USAR, GGSIPU",
    image: "/image2.png",
  },
  {
    quote:
      "Virtual Labs is the knowledge seed for the students of the science and technology domain. Such an astonishing platform would enlighten the learning path of the students before they move to the real lab for the experiments.",
    author: "Dr. Pankaj K. Goswami",
    institution: "Amity University Uttar Pradesh, Lucknow",
    image: "/image3.png",
  },
  {
    quote:
      "Virtual lab is a platform which provides an opportunity to understand the theoretical concept in a very easy way with the help of simulator. Pretest and post-test feature provided make the self-assessment part easy for the students.",
    author: "Radheshyam Acholia",
    institution: "Chameli Devi Group of Institution, Indore",
    image: "/image4.png",
  },
]

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Success Stories</div>
          <h2 className="section-title">What Educators Say</h2>
          <p className="section-subtitle">
            Hear from faculty members across India about their experience with Virtual Labs
          </p>
        </div>

        <div className="testimonials-container">
          <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img src={testimonial.image || "/placeholder.svg?height=60&width=60"} alt={testimonial.author} />
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.author}</h4>
                      <p className="author-institution">{testimonial.institution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`control-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div className="testimonial-background"></div>
    </section>
  )
}

export default TestimonialsSection

