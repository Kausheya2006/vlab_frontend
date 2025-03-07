"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./csEngineering.css";
import LabAnnouncements from "./labAnnouncements";
import NptelLink from "./nptelink";
import ReferenceBooksModal from "./ReferenceBooksModals";

const labs = [
  { title: "Artificial Intelligence I Lab (New)", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Artificial Intelligence II Lab (New)", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Artificial Neural Networks Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Computational Linguistics Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" },
  { title: "Computer Organisation and Architecture Lab", institute: "IIT Kharagpur", logo: "/iitkgp.png" },
  { title: "Computer Organization Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png", books: [
      "Computer Organization and Design: The Hardware/Software Interface by David A. Patterson and John L. Hennessy",
      "Computer Organization by Carl Hamachar, Zvonco Vranesic, and Safwat Zaky",
      "Computer Systems Design and Architecture by Vincent P. Heuring and Harry F. Jordan"
    ] 
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
  { title: "Speech Signal Processing Lab", institute: "IIIT Hyderabad", logo: "/iiitH.png" }
];

const CSEngineering = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const router = useRouter(); 
  const [syllabusModalOpen, setSyllabusModalOpen] = useState(false);

  const openReferenceModal = (books) => {
    setModalContent(books);
    setModalOpen(true);
  };

  const openSyllabusModal = () => {
    setSyllabusModalOpen(true);
  };

  return (
    <div className="cse-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Computer Science & Engineering Labs</h1>
          <p className="hero-subtitle">
            Explore advanced Virtual Labs in Computer Science & Engineering.
          </p>
        </div>
      </div>

      {/* Labs Grid Section */}
      <div className="labs-section">
        <h2 className="section-title">Explore Our Labs</h2>
        <div className="lab-grid">
          {labs.map((lab, index) => (
            <div key={index} className="lab-card">
              <div className="lab-card-inner">
                {/* Front Side */}
                <div className="lab-card-front">
                <h3 
                className={`lab-title ${lab.title === "Computer Organization Lab" ? "clickable" : ""}`} 
                onClick={() => lab.title === "Computer Organization Lab" && router.push("/cse")}
                >
                {lab.title}
                </h3>
                  <p className="lab-institute">{lab.institute}</p>
                  <div className="lab-buttons">
                    <button 
                      className="lab-btn" 
                      onClick={() => lab.books ? openReferenceModal(lab.books) : null}
                    >
                      Reference Books
                    </button>
                    <button 
                      className="lab-btn" 
                      onClick={openSyllabusModal}
                    >
                      Syllabus Mapping
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="lab-card-back"
                  style={{ backgroundImage: `url(${lab.logo})` }}
                >
                <h3 
                  className={`lab-title ${lab.title === "Computer Organization Lab" ? "clickable" : ""}`} 
                  onClick={() => lab.title === "Computer Organization Lab" && router.push("/cse")}
                  >
                {lab.title}
               </h3>
                  <p className="lab-institute">{lab.institute}</p>
                  <div className="lab-buttons">
                    <button 
                      className="lab-btn" 
                      onClick={() => lab.books ? openReferenceModal(lab.books) : null}
                    >
                      Reference Books
                    </button>
                    <button 
                      className="lab-btn" 
                      onClick={openSyllabusModal}
                    >
                      Syllabus Mapping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reference Books Modal */}
      <ReferenceBooksModal isOpen={modalOpen} onClose={() => setModalOpen(false)} books={modalContent} />

      {/* Syllabus Mapping Modal */}
      {syllabusModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-icon" onClick={() => setSyllabusModalOpen(false)}>✖</span>
            <h2 className="modal-title">Syllabus Mapping</h2>
            <p className="modal-text">IPU (UG)</p>
          </div>
        </div>
      )}

      <NptelLink />
      <LabAnnouncements />
    </div>
  );
};

export default CSEngineering;