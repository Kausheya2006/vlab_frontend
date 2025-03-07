"use client";
import React, { useState } from "react";
import "./Testomonials.css"; // Import CSS file

const testimonials = [
  {
    quote:
      "One of the primary advantages associated with the utilization of Virtual Laboratory is the ability for students to engage in self-paced learning. This technology facilitates students in engaging in studying, preparing for, and doing laboratory experiments at their own convenience, regardless of time and location.",
    author: "Dr. Mohd Zubair Ansari",
    institution: "National Institute of Technology Srinagar",
  },
  {
    quote:
      "Virtual Labs are implemented in USAR, GGSIPU and are useful in understanding the theories and concepts of science or other subjects that cannot be studied alone only by textbooks. It has the great potential to enhance actual laboratory experiences.",
    author: "Dr. Khyati Chopra",
    institution: "USAR, GGSIPU",
  },
  {
    quote:
      "Virtual Labs is the knowledge seed for the students of the science and technology domain. Such an astonishing platform would enlighten the learning path of the students before they move to the real lab for the experiments.",
    author: "Dr. Pankaj K. Goswami",
    institution: "Amity University Uttar Pradesh, Lucknow",
  },
  {
    quote:
      "Virtual lab is a platform which provides an opportunity to understand the theoretical concept in a very easy way with the help of simulator. Pretest and post-test feature provided make the self-assessment part easy for the students.",
    author: "Radheshyam Acholia",
    institution: "Chameli Devi Group of Institution, Indore",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="my-12 px-8">
      <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-12 animate-title">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              {/* Front Side (Empty with Gradient) */}
              <div className="flip-card-front">
                <h3 className="text-2xl font-bold text-gray-900">Reveal</h3>
              </div>
              {/* Back Side (Shows Testimonial) */}
              <div className="flip-card-back">
                <p className="text-gray-800 italic">{testimonial.quote}</p>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-blue-600">{testimonial.author}</h3>
                  <p className="text-sm text-gray-600">{testimonial.institution}</p>
                </div>
                <div className="glow-border absolute inset-0 rounded-2xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
