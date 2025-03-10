"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import "./institutes.css"

const InstitutePage = () => {
  const { name } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeInstitute, setActiveInstitute] = useState(null)

  // Dictionary for institutes and their labs
  const institutesData = {
    "iit-guwahati": {
      name: "IIT Guwahati",
      description: "Indian Institute of Technology Guwahati, a premier institute in engineering and research.",
      labs: [
        "Virtual Mass Transfer Lab",
        "Virtual English and Communication Lab",
        "Digital Electronics Lab-II",
        "Digital Anthropology Lab",
        "Creative Design, Prototyping & Experiential Lab",
      ],
    },
    "iit-bombay": {
      name: "IIT Bombay",
      description:
        "Indian Institute of Technology Bombay, renowned for its technical education and research contributions.",
      labs: [
        "Chemical Engineering Lab",
        "Single Board Heater System Lab",
        "Digital Applications Lab",
        "Digital Logic Design Lab (Logic Gates & Mux-Demux)",
        "Heat Transfer Lab (New)",
        "Engineering Physics Lab I (New)",
      ],
    },
    "iit-delhi": {
      name: "IIT Delhi",
      description: "Indian Institute of Technology Delhi, a globally recognized center for innovation and excellence.",
      labs: [
        "Bioreactor Modeling and Simulation Lab",
        "Smart Structures and Dynamics Lab",
        "Concrete Structures Lab",
        "Waves and Vibration Transmission in Periodic Structures Lab",
        "Structural Analysis II Virtual Lab (New)",
        "Queuing Theory and Modelling Lab (New)",
        "Probability and Statistics Lab (New)",
        "Power Electronics I Virtual Lab (New)",
        "Power Electronics II Virtual Lab (New)",
      ],
    },
    "iit-kharagpur": {
      name: "IIT Kharagpur",
      description:
        "Indian Institute of Technology Kharagpur, one of India's first IITs, known for cutting-edge research.",
      labs: [
        "Mine Automation & Virtual Reality",
        "Virtual Laboratory For Simulation and Gaming",
        "Mechanisms and Robotics Lab",
        "Virtual High Voltage Lab",
        "Model Based Fault Detection Lab",
        "Analog Signals, Network and Measurement Lab",
        "Digital Electronic Circuits Lab",
        "Computer Organisation and Architecture Lab",
        "Real Time Embedded Systems Lab",
        "Basic Electronics Lab",
        "Kinematics and Dynamics of Mechanisms Lab",
        "Soft Computing Tools in Engineering Lab",
        "Chemical Process Dynamics Laboratory",
        "Digital Signal Processing Virtual Laboratory",
        "Microelectronics and VLSI Engineering Laboratory",
        "Software Engineering Lab",
        "Analog Electronics Circuits Virtual Lab",
      ],
    },
    "iiit-hyderabad": {
      name: "IIIT Hyderabad",
      description:
        "International Institute of Information Technology Hyderabad, a leader in computing and AI research.",
      labs: [
        "Problem Solving Lab",
        "Structural Dynamics Lab",
        "Hydraulics and Fluid Mechanics Lab",
        "Basic Engineering Mechanics and Strength of Materials Lab",
        "Quantum Chemistry Lab",
        "Data Structures - I",
        "Data Structures - II",
        "Soil Mechanics Lab",
        "Artificial Neural Networks Lab",
        "Molecular Fluorescence Spectroscopy Lab",
        "Colloid and Surface Chemistry Lab",
        "Molecular Absorption Spectroscopy Lab",
        "Circular Dichroism Spectroscopy Lab",
        "Physical Chemistry (IIITH) Lab",
        "Data Structures Lab",
        "Computer Programming Lab",
        "Computer Organization Lab",
        "Speech Signal Processing Lab",
        "Image Processing Lab",
        "Computational Linguistics Lab",
        "Natural Language Processing Lab",
        "Cryptography Lab",
        "Python Programming Lab - Advanced Topics (New)",
        "Artificial Intelligence II Lab (New)",
        "Artificial Intelligence I Lab (New)",
      ],
    },
    "amrita-vishwa-vidyapeetham": {
      name: "Amrita Vishwa Vidyapeetham",
      description: "A private university excelling in biotechnology, engineering, and health sciences education.",
      labs: [
        "Bioinformatics Virtual Lab I",
        "Bioinformatics Virtual Lab II",
        "Bioinformatics Virtual Lab III",
        "Systems Biology Virtual Lab",
        "Computer-Aided Drug Design Virtual Lab",
        "Biological Image Processing Lab",
        "Neurophysiology Lab",
        "Neuron Simulation Lab",
        "Biochemistry Virtual Lab I",
        "Population Ecology I",
        "Population Ecology II",
        "Immunology Virtual Lab II",
        "Microbiology Virtual Lab I",
        "Microbiology Virtual Lab II",
        "Molecular biology Virtual Lab I",
        "Molecular Biology Virtual Lab II",
        "Cell Biology Virtual Lab I",
        "Cell Biology Virtual Lab II",
        "Advanced Mechanics Virtual Lab",
        "Laser Optics Virtual Lab",
        "Heat & Thermodynamics Lab",
        "Physical Chemistry (Amrita) Lab",
        "Inorganic Chemistry Virtual Lab",
        "Electricity and Magnetism Virtual Lab",
        "Optics Virtual Lab",
        "Mechanics Virtual Lab (Pilot)",
        "Biosignal Processing and Analysis Lab",
        "Bioinformatics and Data Science in Biotechnology Lab",
        "Immunology Virtual Lab I",
        "Biosensor Virtual Lab (New)",
        "Bioinformatics and Computational Biology Virtual Lab (New)",
      ],
    },
    "nitk-surathkal": {
      name: "NITK Surathkal",
      description: "National Institute of Technology Karnataka, known for quality technical education and research.",
      labs: [
        "Fluid Mechanics Lab",
        "Transportation Engineering Lab",
        "Environmental Engineering Lab I",
        "Environmental Engineering Lab II",
        "Fluid Machinery Lab",
        "Marine Structure Lab",
        "Mining Geology Lab",
        "Industrial Electric Drives Lab",
        "Mechanics of Machine Lab I",
        "Machine Dynamics & Mechanical Vibration Lab",
        "Process Control, Reaction Engineering and Unit Operations Lab",
        "Strength of Materials Lab",
        "Dynamics of Machine Lab",
        "Substation Automation Lab",
        "Mechanics of Machines Lab 2",
        "Geotechnical Engineering Lab (New)",
        "Engineering Graphics Lab (New)",
        "Advanced Remote Sensing and GIS Lab (New)",
      ],
    },
    "coep-technological-university-pune": {
      name: "COEP Technological University Pune",
      description:
        "College of Engineering Pune, one of India's oldest engineering institutes with a strong academic legacy.",
      labs: [
        "Sensors Modeling & Simulation Lab",
        "Industrial Automation Lab",
        "Electrical Machines (COEP) Lab",
        "PLC Lab",
        "Vibration and Acoustics Lab",
        "Micromachining Lab",
        "FAB Lab",
        "Biomedical and Signal Processing Lab",
        "Hybrid Electronics Lab",
        "Process Loop Component for Current and Pneumatic Converters Lab",
        "Process Loop Component for High Low Selector and Alarm Annunciators Lab",
        "Process Loop Component for Transmitter and Tank Applications Lab",
        "Process Loop Component and Control Valve for Various Applications Lab",
        "Basics of Pneumatic Components Lab",
        "Engineering Geology Lab (New)",
        "Instrumentation and Control Lab (New)",
        "Sensors and Instrumentation Lab (New)",
      ],
    },
    "iit-roorkee": {
      name: "IIT Roorkee",
      description: "Indian Institute of Technology Roorkee, a leader in engineering education and research.",
      labs: [
        "Electrical Machines Lab",
        "Surveying Lab",
        "Biomedical Instrumentation Lab",
        "Bio-Medical Signal & Image Processing Lab",
        "Digital Electronics Lab-I",
        "Analog Electronics Lab",
        "Analog and Digital Electronics Lab - I (New)",
        "Analog and Digital Electronics Lab - II (New)",
        "Electrical Measurements Lab (New)",
        "Optical Communication Lab (New)",
        "Power Electronics Lab (New)",
        "Microwave Engineering Lab (New)",
      ],
    },
    "iit-kanpur":{
      name: "IIT Kanpur",
      description: "Indian Institute of Technology Kanpur",
      labs:[
      "Electronics Lab",
      "Aerospace Engineering Lab"]
    }
  }

  // If no parameter is provided, show all institutes
  const allInstitutes = Object.keys(institutesData).map((key) => ({
    id: key,
    ...institutesData[key],
  }))

  useEffect(() => {
    // Simulate loading to ensure proper rendering
    const timer = setTimeout(() => {
      setIsLoaded(true)

      // Force layout recalculation
      window.dispatchEvent(new Event("resize"))
    }, 100)

    // Clean up the timer
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Function to adjust container height based on content
    const adjustContainerHeight = () => {
      const container = document.querySelector(".institute-content")
      const labsList = document.querySelector(".labs-list")

      if (container && labsList) {
        // Reset any fixed height
        container.style.height = "auto"

        // Get the actual content height
        const contentHeight = labsList.scrollHeight

        // Set a minimum height but allow growth
        container.style.minHeight = `${contentHeight + 150}px`
      }
    }

    // Adjust on load and window resize
    if (isLoaded) {
      adjustContainerHeight()
      window.addEventListener("resize", adjustContainerHeight)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", adjustContainerHeight)
    }
  }, [isLoaded, name])

  // Handle institute click
  const handleInstituteClick = (institute) => {
    setActiveInstitute(institute.id === activeInstitute ? null : institute.id)
  }

  // If a specific institute is requested via URL parameter
  if (name && institutesData[name]) {
    const institute = institutesData[name]

    return (
      <div className={`institutes-page specific-institute ${isLoaded ? "loaded" : ""}`}>
        <div className="institute-header">
          <div className="header-content">
            <h1>{institute.name}</h1>
            <div className="header-divider"></div>
            <p className="institute-description">{institute.description}</p>
          </div>
        </div>

        <div className="institute-content">
          <h2>Available Labs</h2>
          <ul className="labs-list">
            {institute.labs.map((lab, index) => (
              <li key={index} className="lab-item">
                <Link href="/labs" className="lab-link">
                  <span className="lab-name">
                    {lab.includes("(New)") ? (
                      <>
                        {lab.replace(" (New)", "")}
                        <span className="new-badge">New</span>
                      </>
                    ) : (
                      lab
                    )}
                  </span>
                  <span className="lab-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="back-button-container">
            <Link href="/" className="back-button">
              <span className="back-icon">←</span>
              <span>Back to Institutes</span>
            </Link>
          </div>
        </div>

        {/* Background elements */}
        <div className="bg-circle circle1"></div>
        <div className="bg-circle circle2"></div>
        <div className="bg-circle circle3"></div>
      </div>
    )
  }

  // Show all institutes if no specific one is requested
  return (
    <div className={`institutes-page all-institutes ${isLoaded ? "loaded" : ""}`}>
      <div className="institutes-header">
        <h1>Virtual Labs Institutes</h1>
        <div className="header-divider"></div>
        <p className="header-description">
          Explore virtual labs from top educational institutions across India. Click on an institute to view its
          available virtual labs.
        </p>
      </div>

      <div className="institutes-grid">
        {allInstitutes.map((institute) => (
          <div
            key={institute.id}
            className={`institute-card ${activeInstitute === institute.id ? "active" : ""}`}
            onClick={() => handleInstituteClick(institute)}
          >
            <div className="institute-card-header">
              <h2>{institute.name}</h2>
              <span className={`expand-icon ${activeInstitute === institute.id ? "active" : ""}`}>+</span>
            </div>

            <div className="institute-card-content">
              <p>{institute.description}</p>
              <div className="labs-count">
                <span className="count-number">{institute.labs.length}</span>
                <span className="count-text">Labs Available</span>
              </div>

              {activeInstitute === institute.id && (
                <div className="institute-actions">
                  <Link href={`/institutes/${institute.id}`} className="view-labs-button">
                    View All Labs
                    <span className="button-arrow">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Background elements */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>
    </div>
  )
}

export default InstitutePage

