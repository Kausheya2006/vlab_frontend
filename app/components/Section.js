import React from "react";
import './Section.css';

const broadAreas = [
  { title: "Civil Engineering", description: "Explore the foundations of infrastructure." },
  { title: "Biotechnology", description: "Dive into the world of biological sciences." },
  { title: "Physical Sciences", description: "Understand the fundamentals of physics and chemistry." },
  { title: "Electronics and Communications", description: "Innovate with circuits and communication systems." },
  { title: "Computer Science", description: "Unleash your potential in programming and algorithms." },
  { title: "Mechanical Engineering", description: "Design and analyze mechanical systems." },
  { title: "Chemical Engineering", description: "Transform raw materials into valuable products." },
  { title: "Electrical Engineering", description: "Harness electrical energy for various applications." },
];

const BroadAreasSection = () => {
  return (
    <div className="mt-32 my-12">
      <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-8 animate-fade-in">
        Broad Areas of Virtual Labs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {broadAreas.map((area, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-70 rounded-lg"></div>
            <h3 className="text-xl font-semibold text-white relative z-10 mb-2">{area.title}</h3>
            <p className="text-gray-200 relative z-10">{area.description}</p>
            <div className="absolute bottom-0 left-0 right-0 h-full bg-blue-600 opacity-30 rounded-lg transform translate-y-full transition-transform duration-300 hover:translate-y-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BroadAreasSection;
