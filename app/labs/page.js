"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "./csEngineering.css"
import LabAnnouncements from "./labAnnouncements"
import NptelLink from "./nptelink"
import ReferenceBooksModal from "./ReferenceBooksModals"

const labs = [
  { title: "Artificial Intelligence I Lab (New)", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Artificial Intelligence II Lab (New)", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Artificial Neural Networks Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Computational Linguistics Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Computer Organisation and Architecture Lab", institute: 'IIIT Hyderabad', logo: "/iiitH.png" },
  { title: "Computer Organisation and Architecture Lab", institute: "IIT Kharagpur", logo: "/iitkgp.png" },
  {
    title: "Computer Organization Lab",
    institute: "IIIT Hyderabad",
    logo: "/iiitH.png",
    books: [
      "Computer Organization and Design: The Hardware/Software Interface by David A. Patterson and John L. Hennessy",
      "Computer Organization by Carl Hamachar, Zvonco Vranesic, and Safwat Zaky",
      "Computer Systems Design and Architecture by Vincent P. Heuring and Harry F. Jordan",
    ],
  },
  { title: "Computer Programming Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Creative Design, Prototyping & Experiential Lab", institute: "IIT Guwahati", logo: "/iitguwahati.png" },
  { title: "Cryptography Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Data Structures - I", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Data Structures - II", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Data Structures Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Image Processing Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Natural Language Processing Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Problem Solving Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Python Programming Lab", institute: "IIT Kanpur", logo: "/kanpur.png" },
  { title: "Python Programming Lab - Advanced Topics (New)", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Soft Computing Tools in Engineering Lab", institute: "IIT Kharagpur", logo: "/iitkgp.png" },
  { title: "Software Engineering Lab", institute: "IIT Kharagpur", logo: "/iitkgp.png" },
  { title: "Speech Signal Processing Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
]

const CSEngineering = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState([])
  const router = useRouter()
  const [syllabusModalOpen, setSyllabusModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLabs, setFilteredLabs] = useState(labs)
  const [activeFilter, setActiveFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setHeroVisible(true)
      }, 300)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter labs based on search term
    const results = labs.filter(
      (lab) =>
        lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.institute.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Apply institute filter if not "all"
    if (activeFilter !== "all") {
      const filtered = results.filter((lab) => lab.institute.includes(activeFilter))
      setFilteredLabs(filtered)
    } else {
      setFilteredLabs(results)
    }
  }, [searchTerm, activeFilter])

  const openReferenceModal = (books) => {
    setModalContent(books)
    setModalOpen(true)
  }

  const openSyllabusModal = () => {
    setSyllabusModalOpen(true)
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  // Get unique institutes for filter
  const institutes = ["all", ...new Set(labs.map((lab) => lab.institute))]

  return (
    <div className="cse-container">
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loader">
            <div className="loader-circle"></div>
            <div className="loader-text">Loading Virtual Labs</div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className={`hero-section ${heroVisible ? "visible" : ""}`}>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
             
            ></div>
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Engineering Labs</h1>
          <p className="hero-subtitle">Explore advanced Virtual Labs in Computer Science & Engineering</p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for labs or institutes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-icon"></div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-container">
          <h3 className="filter-title">Filter by Institute:</h3>
          <div className="filter-buttons">
            {institutes.map((institute, index) => (
              <button
                key={index}
                className={`filter-btn ${activeFilter === institute ? "active" : ""}`}
                onClick={() => handleFilterChange(institute)}
              >
                {institute === "all" ? "All Institutes" : institute}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Labs Grid Section */}
      <div className="labs-section">
        <h2 className="section-title">Explore Our Labs</h2>
        <div className="lab-grid">
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab, index) => (
              <div key={index} className="lab-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="lab-card-inner">
                  {/* Front Side */}
                  <div className="lab-card-front">
                    <div className="lab-card-header">
                      <div className="lab-institute-logo">
                        <img src={lab.logo || "/placeholder.svg"} alt={lab.institute} />
                      </div>
                      <div className="lab-institute-name">{lab.institute}</div>
                    </div>
                    <h3 className="lab-title">{lab.title}</h3>
                  </div>

                  {/* Back Side */}
                  <div className="lab-card-back">
                    <div className="lab-card-back-content">
                      <div className="lab-institute-badge">
                        <img src={lab.logo || "/placeholder.svg"} alt={lab.institute} />
                        <span>{lab.institute}</span>
                      </div>
                      <h3
                        className={`lab-title ${lab.title === "Computer Organiation Lab" ? "clickable" : ""}`}
                        onClick={() => lab.title === "Computer Organization Lab" && router.push("/labs/cse")}
                      >
                        {lab.title}
                      </h3>
                      <p className="lab-description">
                        {lab.title === "Computer Organization Lab"
                          ? "Explore computer architecture concepts, assembly language programming, and hardware design principles."
                          : "This lab provides hands-on experience with theoretical concepts through interactive simulations and experiments."}
                      </p>
                      <div className="lab-actions">
                        <button
                          className="lab-action-btn primary"
                          onClick={() => lab.title === "Computer Organization Lab" && router.push("/labs/cse")}
                        >
                          {lab.title === "Computer Organization Lab" ? "Open Lab" : "Coming Soon"}
                        </button>
                        <button
                          className="lab-action-btn secondary"
                          onClick={() => (lab.books ? openReferenceModal(lab.books) : null)}
                          disabled={!lab.books}
                        >
                          Resources
                        </button>
                        <button className="lab-action-btn tertiary" onClick={openSyllabusModal}>
                          Syllabus Mapping
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No labs found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button
                className="reset-search-btn"
                onClick={() => {
                  setSearchTerm("")
                  setActiveFilter("all")
                }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reference Books Modal */}
      <ReferenceBooksModal isOpen={modalOpen} onClose={() => setModalOpen(false)} books={modalContent} />

      {/* Syllabus Mapping Modal */}
      {syllabusModalOpen && (
        <div className="modal-overlay" onClick={() => setSyllabusModalOpen(false)}>
          <div className="modal-content syllabus-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Syllabus Mapping</h2>
              <button className="close-btn" onClick={() => setSyllabusModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="syllabus-content">
                <div className="syllabus-item">
                  <div className="syllabus-badge">IPU (UG)</div>
                  <p>
                    This lab aligns with the Computer Organization and Architecture course (CSE-205) in the B.Tech
                    Computer Science curriculum.
                  </p>
                </div>
                <div className="syllabus-item">
                  <div className="syllabus-badge">AICTE Model Curriculum</div>
                  <p>Covers essential topics from the AICTE model curriculum for Computer Organization.</p>
                </div>
                <div className="syllabus-item">
                  <div className="syllabus-badge">GATE CSE</div>
                  <p>
                    Helps in preparation for GATE CSE syllabus topics related to Computer Organization and Architecture.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-action-btn" onClick={() => setSyllabusModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <NptelLink />
      <LabAnnouncements />
    </div>
  )
}

export default CSEngineering

