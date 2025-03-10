'use client';
import Link from "next/link"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <img src="/vlead_icon.jpg" alt="Virtual Labs Logo" className="footer-logo-img" />
                <div className="footer-logo-text">
                  <h3 className="footer-logo-title">Virtual Labs</h3>
                  <p className="footer-logo-subtitle">Ministry of Education, Govt. of India</p>
                </div>
              </div>
              <p className="footer-description">
                Providing remote-access to simulation-based Labs in various disciplines of Science and Engineering.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/labs">All Labs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/outreach">Outreach</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Lab Categories</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/cse">Computer Science</Link>
                </li>
                <li>
                  <Link href="/labs">Electronics & Communications</Link>
                </li>
                <li>
                  <Link href="/labs">Mechanical Engineering</Link>
                </li>
                <li>
                  <Link href="/labs">Civil Engineering</Link>
                </li>
                <li>
                  <Link href="/labs">Biotechnology</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Contact Us</h3>
              <address className="footer-contact">
                <p>
                  <span className="contact-icon">📍</span>
                  Virtual Labs, Ministry of Education
                </p>
                <p>
                  <span className="contact-icon">📧</span>
                  <a href="mailto:support@vlabs.ac.in">support@vlabs.ac.in</a>
                </p>
                <p>
                  <span className="contact-icon">📞</span>
                  +91-11-2659-1201
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} Virtual Labs. All Rights Reserved. Ministry of Education, Government of India.
            </p>
            <div className="footer-bottom-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #1e293b;
          color: #f8fafc;
        }
        
        .footer-top {
          padding: 4rem 0 3rem;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .footer-column {
          display: flex;
          flex-direction: column;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .footer-logo-img {
          width: 48px;
          height: 48px;
          margin-right: 1rem;
        }
        
        .footer-logo-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: white;
        }
        
        .footer-logo-subtitle {
          font-size: 0.75rem;
          margin: 0;
          color: #cbd5e1;
        }
        
        .footer-description {
          color: #cbd5e1;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .footer-social {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background-color: #1a73e8;
          transform: translateY(-3px);
        }
        
        .footer-heading {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: white;
          position: relative;
          padding-bottom: 0.75rem;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: #1a73e8;
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-links a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-block;
        }
        
        .footer-links a:hover {
          color: white;
          transform: translateX(3px);
        }
        
        .footer-contact p {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
          color: #cbd5e1;
        }
        
        .contact-icon {
          margin-right: 0.75rem;
        }
        
        .footer-contact a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-contact a:hover {
          color: white;
        }
        
        .footer-bottom {
          background-color: rgba(0, 0, 0, 0.2);
          padding: 1.5rem 0;
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .copyright {
          color: #94a3b8;
          font-size: 0.875rem;
          margin: 0;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .footer-bottom-links a {
          color: #94a3b8;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-bottom-links a:hover {
          color: white;
        }
        
        @media (max-width: 768px) {
          .footer-top {
            padding: 3rem 0 2rem;
          }
          
          .footer-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-bottom-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer

