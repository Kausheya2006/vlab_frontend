import React, { useState } from "react";

const Chatbot = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Welcome! How can I help you?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    try {
      console.log("🔄 Sending request to chatbot...");
      const response = await fetch("http://localhost:5001/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

      const data = await response.json();
      console.log("✅ Response received:", data);

      setMessages((prev) => [...prev, { text: data.response, isBot: true }]);
    } catch (error) {
      console.error("❌ Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error reaching server. Try again later.", isBot: true },
      ]);
    }

    setInput("");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 right-6 w-80 h-96 bg-white dark:bg-gray-900 shadow-lg border rounded-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
        <span>Chat Support</span>
        <button onClick={onClose} className="text-lg">✖</button>
      </div>

      {/* Messages */}
      <div className="p-4 flex-1 overflow-y-auto space-y-2 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.isBot
                ? "bg-gray-200 text-gray-800 self-start"
                : "bg-blue-500 text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center p-2 border-t bg-white dark:bg-gray-900">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
