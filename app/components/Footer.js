"use client";

import React, { useState, useRef } from "react";

const Footer = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome! How can I help you?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  let silenceTimeout = useRef(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput(""); // 🛠️ **Clear input field after sending**

    try {
      const response = await fetch("http://localhost:5001/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from chatbot.");
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, isBot: true },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error reaching server. Try again later.", isBot: true },
      ]);
    }
  };

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      console.log("Listening...");
    };

    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      console.log("Recognized:", speechResult);

      sendMessage(speechResult); // Send message automatically
      stopListening();
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      stopListening();
    };

    recognitionRef.current.onend = () => {
      stopListening();
    };

    recognitionRef.current.start();

    // Stop listening after 5 seconds if no speech is detected
    silenceTimeout.current = setTimeout(() => {
      stopListening();
    }, 5000);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    clearTimeout(silenceTimeout.current);
    setIsListening(false);
    console.log("Stopped listening.");
  };

  return (
    <div>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 relative">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About Us
              </h2>
              <ul className="text-gray-600 dark:text-gray-300">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Overview
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Mission & Vision
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Government Leadership
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Reports & Publications
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Citizen Services
              </h2>
              <ul className="text-gray-600 dark:text-gray-300">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Online Services
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Forms & Applications
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Feedback & Suggestions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Legal Information
              </h2>
              <ul className="text-gray-600 dark:text-gray-300">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Accessibility
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h2>
              <ul className="flex space-x-4">
                {/* Facebook */}
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.09 5.66 21.14 10.44 22V14.89H7.9v-2.82h2.54V9.79c0-2.5 1.5-3.87 3.79-3.87 1.1 0 2.25.19 2.25.19v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58v1.89h2.79l-.45 2.82h-2.34V22C18.34 21.14 22 17.09 22 12.07z" />
                    </svg>
                  </a>
                </li>

                {/* Twitter (X) */}
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                </li>

                {/* Instagram */}
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-500"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0-2A7.5 7.5 0 000 7.5v9A7.5 7.5 0 007.5 24h9A7.5 7.5 0 0024 16.5v-9A7.5 7.5 0 0016.5 0h-9zM12 6.5A5.5 5.5 0 106.5 12 5.5 5.5 0 0012 6.5zm0-2A7.5 7.5 0 104.5 12 7.5 7.5 0 0012 4.5zm5.5.5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5z" />
                    </svg>
                  </a>
                </li>

                {/* YouTube */}
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.5 6.5a3 3 0 00-2.1-2.1C19 4 12 4 12 4s-7 0-9.4.4a3 3 0 00-2.1 2.1A31 31 0 000 12a31 31 0 00.5 5.5 3 3 0 002.1 2.1C5 20 12 20 12 20s7 0 9.4-.4a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.5zM9.75 15.75v-7.5L16 12l-6.25 3.75z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © Created by Pickles 2025 with ❤️. All Rights Reserved. <br />
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>{" "}
              |
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl chatbot-button hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none"
      >
        💬
      </button>

      {showChatbot && (
        <div className="fixed bottom-16 right-6 w-96 h-[450px] chatbot-container shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-t-lg shadow-lg">
            <span className="font-semibold text-lg">Chat Support</span>
            <button
              onClick={toggleChatbot}
              className="text-xl hover:text-gray-300 transition transform hover:rotate-90"
            >
              ✖
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar chat-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`relative p-4 max-w-[75%] rounded-xl text-sm shadow-lg transition-opacity duration-300 ${
                  msg.isBot
                    ? "bg-blue-100 text-gray-900 bot-reply"
                    : "bg-blue-500 text-white self-end ml-auto user-message"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center p-3 border-t bg-gray-100 dark:bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
              placeholder="Type a message..."
            />
            <button
              onClick={() => sendMessage(input)}
              className="ml-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg send-button"
            >
              Send
            </button>
            <button
              onClick={startListening}
              className={`ml-2 p-3 rounded-full text-white transition-transform transform ${
                isListening ? "bg-red-500" : "bg-green-500"
              } hover:scale-110`}
            >
              🎤
            </button>
          </div>
        </div>
      )}
      <style jsx>
        {`
          /* Custom Scrollbar */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #e0e0e0;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            transition: background 0.3s ease-in-out;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.5);
          }

          /* Chatbot Container Background */
          .chatbot-container {
            backdrop-filter: blur(10px);
            background: url("https://source.unsplash.com/500x500/?technology,abstract");
            background-size: cover;
            background-position: center;
            border-radius: 15px;
            box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transition: transform 0.3s ease-in-out;
          }
          .chatbot-container:hover {
            transform: scale(1.02);
          }

          /* Chatbot Header */
          .chatbot-container .chatbot-header {
            background: linear-gradient(45deg, #2563eb, #1e40af);
            color: white;
            padding: 12px;
            font-weight: bold;
            text-align: center;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          /* Chatbot Button */
          .chatbot-button {
            transition: all 0.3s ease-in-out;
          }
          .chatbot-button:hover {
            transform: scale(1.1);
          }

          /* Bot Reply Styling */
          .bot-reply {
            background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
            background-size: cover;
            border-left: 5px solid #2563eb;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            animation: fadeIn 0.3s ease-in-out;
            padding: 10px;
            border-radius: 10px;
          }

          /* User Message Styling */
          .user-message {
            background-color: #007bff; /* Solid blue */
            color: white;
            font-weight: bold;
            padding: 12px;
            border-radius: 10px;
            border-right: 5px solid #4caf50;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.3s ease-in-out;

            max-width: 75%; /* Ensures bubble width does not exceed 75% of chat container */
            word-wrap: break-word; /* Wraps long words */
            white-space: normal; /* Allows text to wrap to the next line */
            overflow-wrap: break-word; /* Ensures breaking of long words */
          }

          /* Message Animation */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Send Button Animation */
          .send-button {
            transition: all 0.2s ease-in-out;
          }
          .send-button:hover {
            transform: scale(1.05);
            background: linear-gradient(45deg, #2563eb, #1e40af);
          }

          /* Input Field Styling */
          .chat-input {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 8px;
            padding: 10px;
            border: 1px solid #ccc;
            transition: all 0.2s ease-in-out;
          }
          .chat-input:focus {
            background: white;
            box-shadow: 0px 0px 5px rgba(0, 0, 255, 0.5);
          }

          /* Chatbox Area */
          .chatbox-area {
            background: rgba(255, 255, 255, 0.4);
            border-radius: 10px;
            padding: 12px;
            box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
            overflow-y: auto;
            max-height: 350px;
          }

          /* Typing Effect */
          .typing-indicator {
            display: flex;
            align-items: center;
          }
          .typing-indicator span {
            width: 8px;
            height: 8px;
            margin: 0 3px;
            background: #2563eb;
            border-radius: 50%;
            animation: typing 1.5s infinite ease-in-out;
          }
          .typing-indicator span:nth-child(1) {
            animation-delay: 0s;
          }
          .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes typing {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
          }

          /* Chatbot Close Button */
          .chatbot-close {
            background: red;
            color: white;
            border-radius: 50%;
            padding: 5px;
            font-size: 16px;
            transition: all 0.2s ease-in-out;
          }
          .chatbot-close:hover {
            transform: scale(1.2);
            background: darkred;
          }

          /* Dark Mode Enhancements */
          @media (prefers-color-scheme: dark) {
            .chatbot-container {
              background: rgba(30, 30, 30, 0.8);
              color: white;
            }
            .bot-reply {
              background-image: url("https://www.transparenttextures.com/patterns/brick-wall-dark.png");
            }
            .user-message {
              background-image: url("https://www.transparenttextures.com/patterns/always-grey.png");
            }
            .chat-input {
              background: rgba(50, 50, 50, 0.6);
              color: white;
            }
          }
          .chat-container {
            background-image: url("/chatbot_img.jpg"); /* Replace with your actual image path */
            background-size: cover; /* Ensures the image covers the full area */
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 100vh; /* Ensures it fills the entire screen */
            display: flex;
            flex-direction: column;
            padding: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
