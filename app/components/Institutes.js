"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import Link from "next/link"; // Import Link
import { FiExternalLink } from "react-icons/fi"; // Import React Icon

const Institutes = () => {
  const institutes = [
    { name: "IIIT Hyderabad", logo: "iiitH.png", fact: "Pioneers in AI & Blockchain." },
    { name: "IIT Bombay", logo: "iitbombay.png", fact: "Home to Asia's largest Techfest." },
    { name: "IIT Roorkee", logo: "roorkee.png", fact: "One of the oldest tech institutes in Asia." },
    { name: "IIT Kanpur", logo: "kanpur.png", fact: "Known for cutting-edge robotics research." },
    { name: "NITK Surathkal", logo: "nitk.png", fact: "Only NIT with a private beach!" },
    { name: "IIT Guwahati", logo: "iitguwahati.png", fact: "India's most beautiful campus!" },
    { name: "IIT Kharagpur", logo: "iitkgp.png", fact: "Has its own railway station inside the campus." },
    { name: "COEP Technological University Pune", logo: "coep.png", fact: "Oldest engineering college in India." },
    { name: "IIT Delhi", logo: "delhi.png", fact: "Produces the highest number of startup founders." },
    { name: "Dayalbagh Educational Institute", logo: "dayalbagh.png", fact: "Focuses on holistic education & sustainability." },
    { name: "Amrita Vishwa Vidyapeetham", logo: "amritha.png", fact: "Leads in humanitarian robotics projects." },
  ];

  const [confettiTriggered, setConfettiTriggered] = useState(false);

  const triggerConfetti = () => {
    if (!confettiTriggered) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#a78bfa", "#f472b6"],
      });
      setConfettiTriggered(true);
      setTimeout(() => setConfettiTriggered(false), 2000);
    }
  };

  return (
    <div id="institutes-section" className="py-6 px-12 relative bg-gray-50 mb-12">
      {/* View All Button */}
      <div className="absolute top-8 right-6">
        <Link href="/institute/all">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
            View All <FiExternalLink className="text-lg" />
          </button>
        </Link>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-700 tracking-tight text-center mb-8">
        Participating Institutes
      </h2>

      <div className="overflow-hidden py-12 relative">
        <div className="scrolling-container">
          {[...institutes, ...institutes].map((institute, index) => (
            <Link href={`/institute/${institute.name.replace(/\s+/g, "-").toLowerCase()}`} key={index}>
              <div className="card group" onClick={triggerConfetti}>
                <div className="card-inner">
                  <div className="card-front">
                    <img src={institute.logo} alt={institute.name} className="w-32 h-32 object-contain" />
                    <p className="text-center text-xl font-semibold text-gray-700 mt-4 px-4">
                      {institute.name}
                    </p>
                  </div>
                  <div className="card-back">
                    <p className="text-center text-lg whitespace-normal break-words">{institute.fact}</p>
                  </div>
                </div>
                <div className="glow-effect"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      {/* Floating & Scroll Animations */}
      <style>
        {`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .floating {
          animation: floating 1.9119623154534549s ease-in-out infinite;

        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .scrolling-container {
          display: flex;
          gap: 2.5rem;
          width: max-content;
          animation: scroll 20s linear infinite;
          white-space: nowrap;
        }

        .card {
          width: 18rem;
          height: 12rem;
          perspective: 1000px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s;
        }

        .card:hover .card-inner {
          transform: rotateY(180deg);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

        }

        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: box-shadow 0.3s ease-in-out;
        }

        .card-front {
          background: white;
        }

        .card-back {
          background: rgba(255, 255, 255, 0.2); 
          color: black;
          transform: rotateY(180deg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: background 0.3s ease-in-out;
        }

        .glow-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          filter: blur(15px);
        }

        .card:hover .glow-effect {
          opacity: 1;
        }
        `}
      </style>
    </div>
  );
};

export default Institutes;
