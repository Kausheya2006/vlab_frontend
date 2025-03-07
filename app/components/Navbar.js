"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; // For mobile menu

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate Loader Animation
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleScrollToInstitutes = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      document
        .querySelector("#institutes-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#institutes-section");
    }
  };

  return (
    <>
      {/* Loader Animation */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-sky-600 animate-loader z-50"></div>
      )}

      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] md:w-[85%] lg:w-[80%] px-6 py-4 rounded-2xl z-50 transition-all duration-500 flex items-center justify-between 
          bg-white bg-opacity-95 shadow-md backdrop-blur-xl ${
            isScrolled ? "shadow-lg" : ""
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 md:space-x-4">
          <Image
            src="/vlead_icon.jpg"
            alt="Virtual Labs Logo"
            width={42} // Reduced size for better spacing
            height={42}
            className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 hover:scale-110 hover:rotate-6"
          />
          <div className="text-sm md:text-base">
            <h1 className="text-xl md:text-2xl font-bold text-sky-700">
              Virtual Labs
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              An MoE Govt of India Initiative
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 text-sm md:text-base font-medium">
          <li>
            <Link href="/labs" className="nav-link">
              Labs
            </Link>
          </li>
          <li className="group relative">
            <Link href="/outreach" className="nav-link">
              Outreach Portal
            </Link>
            {/* Dropdown */}
            <div className="absolute left-0 mt-1 w-48 md:w-52 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-10">
              <ul className="py-2 text-gray-700">
                <li>
                  <Link href="/webinars" className="dropdown-item">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="dropdown-item">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#" onClick={handleScrollToInstitutes} className="nav-link">
              Participating Institutes
            </a>
          </li>
          <li>
            <Link
              href="https://www.indiascienceandtechnology.gov.in/st-visions/national-mission/national-mission-education-through-ict-nmeict"
              className="nav-link"
            >
              NMEICT
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-sky-700 hover:text-sky-500 transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-4 space-y-3 rounded-b-lg z-40">
            <Link href="/labs" className="mobile-nav-link">
              Labs
            </Link>
            <Link href="/outreach"  onMouseOver={() => setDropdownOpen(!dropdownOpen) } onMouseOverCapture={() => setDropdownOpen(!dropdownOpen)}
              className="mobile-nav-link w-full ">
              Outreach Portal
            </Link>
           
            {dropdownOpen && (
              <div className="w-full bg-white text-center shadow-lg mt-2 rounded-lg" style={{color: "black"}}>
                <Link href="/webinars" className="dropdown-item">
                  Webinars
                </Link>
                <Link href="/events" className="dropdown-item">
                  Events
                </Link>
              </div>
            )}
            <a
              href="#"
              onClick={handleScrollToInstitutes}
              className="mobile-nav-link"
            >
              Participating Institutes
            </a>
            <Link
              href="https://www.indiascienceandtechnology.gov.in/st-visions/national-mission/national-mission-education-through-ict-nmeict"
              className="mobile-nav-link"
            >
              NMEICT
            </Link>
            <Link href="/contact" className="mobile-nav-link">
              Contact Us
            </Link>
            <Link href="/about" className="mobile-nav-link">
              About Us
            </Link>
          </div>
        )}
      </nav>

      {/* Loader Animation & Styling */}
      <style>
        {`
          @keyframes loader {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-loader {
            animation: loader 1.5s ease-in-out infinite alternate;
          }

          .nav-link {
            position: relative;
            color: #1E3A8A;
            transition: color 0.3s ease-in-out;
            font-size: 0.9rem;
          }
          .nav-link::after {
            content: "";
            display: block;
            width: 0;
            height: 1.5px;
            background: #3B82F6;
            transition: width 0.3s ease-in-out;
          }
          .nav-link:hover {
            color: #3B82F6;
          }
          .nav-link:hover::after {
            width: 100%;
          }

          .dropdown-item {
            display: block;
            padding: 10px;
            transition: background 0.3s;
          }
          .dropdown-item:hover {
            background: #EFF6FF;
          }

          .mobile-nav-link {
            display: block;
            padding: 10px;
            text-align: center;
            color: #3B82F6;
            width: 100%;
          }

          @media (max-width: 1024px) {
            nav { padding: 12px 20px; }
            .nav-link { font-size: 0.85rem; }
            .mobile-nav-link { font-size: 1rem; }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
