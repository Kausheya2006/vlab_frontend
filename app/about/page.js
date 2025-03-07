"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./page.css";
import ContactSection from "./ContactSection";


const systemOverview = {
  title: "System Overview",
  description: "Virtual Labs project is an initiative of the Ministry of Education (MoE), Government of India under the National Mission on Education through Information and Communication Technology (NMEICT). This consortium activity involves twelve participating institutes, with IIT Delhi as the coordinating institute. It represents a paradigm shift in ICT-based education, pioneering remote experimentation. The project has developed over 100 Virtual Labs comprising approximately 700+ web-enabled experiments designed for remote operation and viewing. These labs cover nine disciplines of science and engineering, providing students with the ability to perform experiments using only a computer with an internet connection.",
  beneficiaries: [
    "Students and faculty members of science and engineering colleges lacking access to good lab facilities or instruments",
    "High school students, to trigger curiosity and potentially motivate them to pursue higher studies",
    "Researchers in different institutes for collaboration and resource sharing",
    "Engineering colleges benefiting from the content and related teaching resources",
    "Students in rural areas who can now perform experiments previously inaccessible to them"
  ],
  infrastructure: "Virtual Labs require no additional infrastructural setup for conducting experiments at user premises. The simulation-based experiments can be accessed remotely via internet, while remote-triggered labs allow users to connect to real equipment using a web browser.",
  additionalInfo: "The Virtual Labs website (vlab.co.in) has received over 233,570 site visits and 1,034,443 page visits in just six months, with over 4,500 registered users from 134 countries. It handles around 100GB of traffic per month."
};

const SystemOverview = () => {
  return (
    <div className="system-overview">
      <h2>{systemOverview.title}</h2>
      <p>{systemOverview.description}</p>
      <h3>Beneficiaries:</h3>
      <ul>
        {systemOverview.beneficiaries.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Infrastructure:</h3>
      <p>{systemOverview.infrastructure}</p>
      <h3>Additional Information:</h3>
      <p>{systemOverview.additionalInfo}</p>
    </div>
  );
};


const About = () => {
  const particlesRef = useRef(null);
  const heroTextRef = useRef(null);

  // Particles animation effect
  useEffect(() => {
    if (!particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, ${
          Math.random() * 50 + 50
        }%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect particles with lines
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    init();
    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Typing effect for hero text
  // Typing effect for hero text
useEffect(() => {
  if (!heroTextRef.current) return;

  const text = "About Virtual Labs";
  const element = heroTextRef.current;
  let i = 0;

  // Ensure text is cleared before starting
  element.textContent = "";

  // Flag to prevent multiple executions
  let isTyping = true;

  const typeWriter = () => {
    if (i < text.length && isTyping) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    }
  };

  typeWriter();

  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    let target = +counter.getAttribute("data-count");
    let count = 0;
    let increment = target / 50; // Adjust speed by changing the divisor

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target; // Ensure exact final value
      }
    };

    updateCount();
  });

  return () => {
    // Cleanup function to stop typing on unmount
    isTyping = false;
  };

  
}, []);


  return (
    <div className="neo-futuristic">
      {/* Animated Particle Background */}
      <canvas ref={particlesRef} className="particle-canvas"></canvas>

      {/* Hero Section */}
      <header className="hero-container">
        <div className="hero-hologram">
          <div className="hologram-circle"></div>
          <div className="hologram-lines"></div>
        </div>

        <div className="hero-content">
          <h1 ref={heroTextRef} className="cyber-glitch"></h1>
          <p className="hero-subtitle">
            <span className="tech-bracket">[</span>
            Revolutionizing education through ICT-based remote experimentation
            <span className="tech-bracket">]</span>
          </p>

          <div className="dynamic-stats">
            <div className="stat-item">
              <div className="stat-number" data-count="100">
                0
              </div>
              <div className="stat-label">Virtual Labs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="100">
                0
              </div>
              <div className="stat-label">Web Experiments</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="11">
                0
              </div>
              <div className="stat-label">Institutions</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Neon Borders */}
      <main className="content-grid">
        {/* Overview Section */}
        <section className="content-panel overview-panel">
          <div className="panel-header">
            <div className="panel-icon"></div>
            <h2>
              System Overview<span className="blink">_</span>
            </h2>
          </div>

          <div className="panel-content">
            <SystemOverview/>


            <div className="tech-diagram">
              <div className="diagram-node center">Virtual Labs Core</div>
              <div className="diagram-node n1">Remote Access</div>
              <div className="diagram-node n2">Simulation</div>
              <div className="diagram-node n3">Data Analysis</div>
              <div className="diagram-node n4">Collaborative Learning</div>
              <div className="diagram-lines"></div>
            </div>
          </div>
        </section>

        {/* Beneficiaries Section */}
        <section className="content-panel beneficiaries-panel">
          <div className="panel-header">
            <div className="panel-icon"></div>
            <h2>
              User Profiles<span className="blink">_</span>
            </h2>
          </div>

          <div className="panel-content">
            <div className="hexagon-grid">
              {[
                { title: "Students", desc: "Without access to physical labs" },
                { title: "Faculty", desc: "Remote teaching capabilities" },
                { title: "Researchers", desc: "Advanced collaboration tools" },
                { title: "High Schools", desc: "Early STEM inspiration" },
              ].map((item, index) => (
                <div key={index} className="hexagon-item">
                  <div className="hexagon">
                    <div className="hexagon-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="content-panel features-panel">
          <div className="panel-header">
            <div className="panel-icon"></div>
            <h2>
              System Advantages<span className="blink">_</span>
            </h2>
          </div>

          <div className="panel-content">
            <div className="feature-cards">
              {[
                {
                  title: "Zero Setup",
                  icon: "⚡",
                  desc: "No additional hardware or software required",
                },
                {
                  title: "24/7 Access",
                  icon: "🌐",
                  desc: "Available anytime from anywhere globally",
                },
                {
                  title: "Real-Time Results",
                  icon: "📊",
                  desc: "Immediate feedback and data visualization",
                },
                {
                  title: "Scalable Learning",
                  icon: "📈",
                  desc: "From basic concepts to advanced applications",
                },
              ].map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <div className="card-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Futuristic Call to Action */}
      <div className="cta-container">
        <div className="cta-hologram">
          <div className="hologram-ripple"></div>
        </div>

        <h2 className="cta-title">Initialize Lab Sequence</h2>

        <Link href="/labs" className="cyber-button">
          <span className="cyber-button-text">Access Labs</span>
          <span className="cyber-button-glitch"></span>
          <span className="cyber-button-tag">v2.0</span>
        </Link>
      </div>

      <ContactSection />
      
    </div>
  );
};

export default About;

