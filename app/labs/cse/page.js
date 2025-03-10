"use client"
import { useState, useEffect, useRef } from "react"
import "./cse.css"
import "./live-comments.css"
import {
  FiMenu,
  FiX,
  FiChevronRight,
  FiStar,
  FiBookOpen,
  FiUsers,
  FiTarget,
  FiAlignLeft,
  FiMessageSquare,
} from "react-icons/fi"
import LiveComments from "../../components/LiveComments"
// Function to render stars for experiment ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FiStar key={`full-${i}`} className="star filled" />
      ))}
      {halfStar && <FiStar className="star half-filled" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FiStar key={`empty-${i}`} className="star empty" />
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  )
}
const sections = [
  {
    name: "Introduction",
    icon: <FiBookOpen />,
    content: (
      <div className="content-box introduction">
        <div className="content-header">
          <div className="header-icon">
            <FiBookOpen />
          </div>
          <h2>Computer Organisation</h2>
        </div>
        <div className="content-body">
          <p>
            Computer science is all about providing abstractions and their efficient implementation. An abstraction
            provides a logical view of a certain service or a resource by giving a well-defined black-box model, its
            associated properties, and hides the internal details of the black-box.
          </p>
          <div className="highlight-box">
            <p>
              For example, the design and implementation of a processor are abstracted away through the Instruction Set
              Architecture (ISA) of the processor. Further, high-level programming languages like C, C++ abstract away
              the ISA of a processor by allowing programmers to express their intent using constructs like for-loops,
              while-loops, etc.
            </p>
          </div>
          <p>
            In this lab, the first two experiments deal with two primitive data abstractions: integers and
            floating-point numbers. We look at various approaches for representing integers and floating-point numbers
            in binary and their pros and cons.
          </p>
          <p>
            The next four experiments involve writing assembly language programs using MIPS and ARM ISA. In these
            experiments, we learn how to map high-level language constructs to a sequence of assembly language
            instructions.
          </p>
          <p>
            In the last experiment, we study how to design a processor for a subset of MIPS ISA using the Single Cycle
            Per Instruction approach. This helps us understand how high-level language constructs map to assembly
            programs, followed by realizing assembly instructions using logic gates.
          </p>
          <div className="info-card">
            <div className="info-card-header">
              <h3>Key Components</h3>
            </div>
            <div className="info-card-body">
              <p>
                Processor, Memory, and I/O Devices are three major subsystems in a computer. Cache memory plays a
                crucial role in bridging the speed mismatch between a processor and the associated main memory module.
              </p>
              <p>
                We have three experiments on cache memories illustrating various possible cache organizations and their
                impact on program performance. Additionally, one experiment covers the concept of Virtual Memory.
              </p>
            </div>
          </div>
          <div className="section-divider"></div>
          <h3>Software Dependencies</h3>
          <ul className="dependencies-list">
            <li>
              <span className="dependency-icon">🌐</span>
              <span className="dependency-text">Browsers - Firefox 50 and lower versions, Internet Explorer</span>
            </li>
            <li>
              <span className="dependency-icon">🔌</span>
              <span className="dependency-text">Adobe Flash Plugin</span>
            </li>
            <li>
              <span className="dependency-icon">☕</span>
              <span className="dependency-text">Java 1.7</span>
            </li>
            <li>
              <span className="dependency-icon">🧊</span>
              <span className="dependency-text">Java3D-1.5.2</span>
            </li>
            <li>
              <span className="dependency-icon">🍵</span>
              <span className="dependency-text">IcedTea Plugin</span>
            </li>
          </ul>
          <div className="recommendation-box">
            <div className="recommendation-icon">💡</div>
            <div className="recommendation-content">
              <h4>Recommendation</h4>
              <p>
                We recommend using our customized VirtualBox for smooth simulation execution. Install VirtualBox from
                Virtual Labs to ensure compatibility with required dependencies.
              </p>
              <button className="download-btn">Download VirtualBox</button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Objective",
    icon: <FiTarget />,
    content: (
      <div className="content-box objective">
        <div className="content-header">
          <div className="header-icon">
            <FiTarget />
          </div>
          <h2>Objectives</h2>
        </div>
        <div className="content-body">
          <div className="objectives-container">
            <div className="objective-card">
              <div className="objective-icon">🎯</div>
              <div className="objective-content">
                <h3>Primary Objective</h3>
                <p>To understand the fundamental concepts of computer organization and architecture.</p>
              </div>
            </div>
            <div className="objectives-grid">
              <div className="objective-item">
                <div className="objective-number">01</div>
                <p>Learn binary representation of integers and floating-point numbers</p>
              </div>
              <div className="objective-item">
                <div className="objective-number">02</div>
                <p>Understand assembly language programming using MIPS and ARM ISA</p>
              </div>
              <div className="objective-item">
                <div className="objective-number">03</div>
                <p>Study processor design using Single Cycle Per Instruction approach</p>
              </div>
              <div className="objective-item">
                <div className="objective-number">04</div>
                <p>Explore cache memory organization and virtual memory concepts</p>
              </div>
              <div className="objective-item">
                <div className="objective-number">05</div>
                <p>Bridge theoretical knowledge with practical implementation</p>
              </div>
              <div className="objective-item">
                <div className="objective-number">06</div>
                <p>Develop problem-solving skills in computer architecture domain</p>
              </div>
            </div>
          </div>
          <div className="learning-outcomes">
            <h3>Learning Outcomes</h3>
            <p>After completing this lab, students will be able to:</p>
            <ul>
              <li>Perform arithmetic operations on binary representations of numbers</li>
              <li>Write and debug assembly language programs</li>
              <li>Design simple processor components</li>
              <li>Analyze the performance impact of different cache organizations</li>
              <li>Understand the concept and implementation of virtual memory</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "List of Experiments",
    icon: <FiAlignLeft />,
    content: (
      <div className="content-box experiments">
        <div className="content-header">
          <div className="header-icon">
            <FiAlignLeft />
          </div>
          <h2>List of Experiments</h2>
        </div>
        <div className="content-body">
          <div className="experiments-container">
            <div className="experiment-card">
              <div className="experiment-number">01</div>
              <div className="experiment-content">
                <h3>Representation of Integers and their Arithmetic</h3>
                <p>Learn about different ways to represent integers in binary and perform arithmetic operations.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Intermediate</div>
                  <div className="duration">1.5 hours</div>
                  {renderStars(4)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
            <div className="experiment-card">
              <div className="experiment-number">02</div>
              <div className="experiment-content">
                <h3>Representation of Floating Point Numbers and their Arithmetic</h3>
                <p>Understand IEEE 754 standard for floating-point representation and arithmetic operations.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Advanced</div>
                  <div className="duration">2 hours</div>
                  {renderStars(4.5)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
            <div className="experiment-card">
              <div className="experiment-number">03</div>
              <div className="experiment-content">
                <h3>Virtual Memory</h3>
                <p>Explore the concept of virtual memory, page tables, and address translation.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Intermediate</div>
                  <div className="duration">1.5 hours</div>
                  {renderStars(4)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
            <div className="experiment-card">
              <div className="experiment-number">04</div>
              <div className="experiment-content">
                <h3>MIPS Assembly Language Programming - 1</h3>
                <p>Introduction to MIPS assembly language programming with basic instructions and control flow.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Beginner</div>
                  <div className="duration">2 hours</div>
                  {renderStars(0)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
            <div className="experiment-card">
              <div className="experiment-number">05</div>
              <div className="experiment-content">
                <h3>ARM Assembly Language Programming - 1</h3>
                <p>Learn ARM assembly language basics and write simple programs.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Intermediate</div>
                  <div className="duration">2 hours</div>
                  {renderStars(4.5)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
            <div className="experiment-card">
              <div className="experiment-number">06</div>
              <div className="experiment-content">
                <h3>ARM Assembly Language Programming - 2</h3>
                <p>Advanced ARM assembly programming with complex data structures and algorithms.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Advanced</div>
                  <div className="duration">2.5 hours</div>
                  {renderStars(0)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
            <div className="experiment-card">
              <div className="experiment-number">07</div>
              <div className="experiment-content">
                <h3>Single Cycle MIPS CPU</h3>
                <p>Design and implement a single-cycle MIPS CPU using digital logic components.</p>
                <div className="experiment-meta">
                  <div className="difficulty">Advanced</div>
                  <div className="duration">3 hours</div>
                  {renderStars(4.5)}
                </div>
                <button className="experiment-btn">Start Experiment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Target Audience",
    icon: <FiUsers />,
    content: (
      <div className="content-box target-audience">
        <div className="content-header">
          <div className="header-icon">
            <FiUsers />
          </div>
          <h2>Target Audience</h2>
        </div>
        <div className="content-body">
          <div className="audience-container">
            <div className="audience-card undergraduate">
              <div className="audience-icon">🎓</div>
              <h3>Undergraduate Students</h3>
              <ul>
                <li>B.Tech / B.E in Computer Science & Engineering</li>
                <li>B.Tech / B.E in Information Technology</li>
                <li>B.Tech / B.E in Electronics Engineering</li>
                <li>B.Sc in Computer Science</li>
              </ul>
              <div className="audience-level">
                <div className="level-label">Recommended Year:</div>
                <div className="level-bars">
                  <div className="level-bar active"></div>
                  <div className="level-bar active"></div>
                  <div className="level-bar"></div>
                  <div className="level-bar"></div>
                </div>
                <div className="level-text">2nd Year</div>
              </div>
            </div>
            <div className="audience-card postgraduate">
              <div className="audience-icon">🎓</div>
              <h3>Postgraduate Students</h3>
              <ul>
                <li>M.Tech / M.E in Computer Science & Engineering</li>
                <li>M.Tech / M.E in Embedded Systems</li>
                <li>M.Tech / M.E in VLSI Design</li>
                <li>M.Sc in Computer Science</li>
              </ul>
              <div className="audience-level">
                <div className="level-label">Recommended Year:</div>
                <div className="level-bars">
                  <div className="level-bar active"></div>
                  <div className="level-bar"></div>
                </div>
                <div className="level-text">1st Year</div>
              </div>
            </div>
            <div className="prerequisites-box">
              <h3>Prerequisites</h3>
              <div className="prerequisites-grid">
                <div className="prerequisite-item">
                  <div className="prerequisite-icon">📚</div>
                  <div className="prerequisite-content">
                    <h4>Digital Logic Design</h4>
                    <p>Basic understanding of logic gates, boolean algebra, and digital circuits</p>
                  </div>
                </div>
                <div className="prerequisite-item">
                  <div className="prerequisite-icon">💻</div>
                  <div className="prerequisite-content">
                    <h4>Programming Fundamentals</h4>
                    <p>Experience with at least one high-level programming language (C/C++ preferred)</p>
                  </div>
                </div>
                <div className="prerequisite-item">
                  <div className="prerequisite-icon">🧮</div>
                  <div className="prerequisite-content">
                    <h4>Basic Mathematics</h4>
                    <p>Knowledge of binary number system and basic mathematical operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Course Alignment",
    icon: <FiAlignLeft />,
    content: (
      <div className="content-box course-alignment">
        <div className="content-header">
          <div className="header-icon">
            <FiAlignLeft />
          </div>
          <h2>Course Alignment</h2>
        </div>
        <div className="content-body">
          <div className="alignment-container">
            <div className="alignment-intro">
              <p>
                This virtual lab aligns with the following courses typically offered in Computer Science and Engineering
                curricula:
              </p>
            </div>
            <div className="courses-grid">
              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon">🖥️</div>
                  <h3>Computer Organization and Architecture</h3>
                </div>
                <div className="course-body">
                  <p>Core course covering fundamentals of computer hardware organization and architecture</p>
                  <div className="course-topics">
                    <span className="topic-tag">Digital Logic</span>
                    <span className="topic-tag">ISA</span>
                    <span className="topic-tag">Memory</span>
                    <span className="topic-tag">CPU Design</span>
                  </div>
                </div>
              </div>
              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon">⚙️</div>
                  <h3>Microprocessors and Interfacing</h3>
                </div>
                <div className="course-body">
                  <p>Course focused on microprocessor architecture and hardware interfacing techniques</p>
                  <div className="course-topics">
                    <span className="topic-tag">Assembly</span>
                    <span className="topic-tag">I/O</span>
                    <span className="topic-tag">Interfacing</span>
                  </div>
                </div>
              </div>
              <div className="course-card">
                <div className="course-header">
                  <div className="course-icon">🧠</div>
                  <h3>Computer Architecture</h3>
                </div>
                <div className="course-body">
                  <p>Advanced course on modern computer architecture concepts and design principles</p>
                  <div className="course-topics">
                    <span className="topic-tag">Pipelining</span>
                    <span className="topic-tag">Cache</span>
                    <span className="topic-tag">Parallelism</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="curriculum-mapping">
              <h3>Curriculum Mapping</h3>
              <div className="curriculum-table">
                <div className="table-header">
                  <div className="header-cell">Experiment</div>
                  <div className="header-cell">Course Topic</div>
                  <div className="header-cell">Learning Outcome</div>
                </div>
                <div className="table-row">
                  <div className="cell">Integer Representation</div>
                  <div className="cell">Number Systems</div>
                  <div className="cell">Understand binary representation of integers</div>
                </div>
                <div className="table-row">
                  <div className="cell">Floating Point Representation</div>
                  <div className="cell">IEEE 754 Standard</div>
                  <div className="cell">Implement floating-point arithmetic</div>
                </div>
                <div className="table-row">
                  <div className="cell">MIPS Assembly</div>
                  <div className="cell">Assembly Programming</div>
                  <div className="cell">Write basic assembly programs</div>
                </div>
                <div className="table-row">
                  <div className="cell">Single Cycle CPU</div>
                  <div className="cell">Processor Design</div>
                  <div className="cell">Design a basic CPU implementation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Feedback",
    icon: <FiMessageSquare />,
    content: (
      <div className="content-box feedback-section">
        <div className="content-header">
          <div className="header-icon">
            <FiMessageSquare />
          </div>
          <h2>Feedback</h2>
        </div>
        <div className="content-body">
          <div className="feedback-container">
            <div className="feedback-intro">
              <div className="feedback-icon">💬</div>
              <div className="feedback-message">
                <h3>We Value Your Input!</h3>
                <p>
                  Your feedback helps us improve the Virtual Labs experience for everyone. Please take a moment to share
                  your thoughts on this lab.
                </p>
              </div>
            </div>
            <div className="feedback-form">
              <div className="form-group">
                <label>How would you rate your overall experience?</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} className="rating-btn">
                      <FiStar className="rating-star" />
                      <span className="rating-number">{num}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>What aspects of the lab did you find most useful?</label>
                <textarea
                  className="feedback-textarea"
                  placeholder="The experiments were well-structured and easy to follow..."
                ></textarea>
              </div>
              <div className="form-group">
                <label>How can we improve this lab?</label>
                <textarea
                  className="feedback-textarea"
                  placeholder="I would like to see more interactive elements..."
                ></textarea>
              </div>
              <div className="form-actions">
                <button className="submit-feedback-btn">Submit Feedback</button>
              </div>
            </div>
            <div className="feedback-footer">
              <p>
                Thank you for helping us make Virtual Labs better!
                <br />
                <strong>— The Virtual Labs Team</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]
const CSEPage = () => {
  const [activeSection, setActiveSection] = useState(sections[0])
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const contentRef = useRef(null)
  const [animateContent, setAnimateContent] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setIsSidebarVisible(!isSidebarVisible)
  }

  // Function to check if the screen size is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-show sidebar on desktop
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true)
      } else {
        setIsSidebarVisible(false)
      }
    }
    // Check on initial load
    checkScreenSize()
    // Set up event listener for window resize
    window.addEventListener("resize", checkScreenSize)
    // Clean up event listener
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])
  
  useEffect(() => {
    // Reset animation state when section changes
    setAnimateContent(false)
    setTimeout(() => {
      setAnimateContent(true)
    }, 50)
    // Add scroll event listener for the content area
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > 20)
      }
    }
    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [activeSection])
  
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }
  
  return (
    <div className="cse-page">
      {/* Hamburger Menu Button for Mobile */}
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      {/* Left Vertical Navbar */}
      <nav className={`side-navbar ${isSidebarVisible ? "visible" : ""}`}>
        <div className="nav-header">
          <div className="nav-logo">
            <img src="/vlead_icon.jpg" alt="Virtual Labs Logo" className="nav-logo-img" />
          </div>
          <h3 className="nav-title">Computer Organization Lab</h3>
        </div>
        <div className="nav-items">
          {sections.map((section, index) => (
            <button
              key={index}
              className={`nav-item ${activeSection.name === section.name ? "active" : ""}`}
              onClick={() => {
                setActiveSection(section)
                if (isMobile) toggleSidebar() // Close sidebar after selection on mobile
              }}
            >
              <span className="nav-item-icon">{section.icon}</span>
              <span className="nav-item-text">{section.name}</span>
              {activeSection.name === section.name && (
                <span className="nav-item-indicator">
                  <FiChevronRight />
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="nav-footer">
          <button className="nav-footer-btn">
            <span className="nav-footer-icon">🏠</span>
            <span className="nav-footer-text">Back to Labs</span>
          </button>
        </div>
      </nav>
      
      {/* Right Content Area */}
      <div
        ref={contentRef}
        className={`content-area ${isMobile && isSidebarVisible ? "shifted" : ""} ${animateContent ? "animate" : ""}`}
      >
        {activeSection.content}
      </div>
      
      {/* Background Elements */}
      <div className="bg-decoration circle-1"></div>
      <div className="bg-decoration circle-2"></div>
      <div className="bg-decoration circle-3"></div>
      <LiveComments />
    </div>
  )
}
export default CSEPage