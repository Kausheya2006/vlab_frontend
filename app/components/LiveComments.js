import { useEffect, useState } from "react";
import io from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa"; // Importing the send icon from react-icons

const SOCKET_URL = `${process.env.NEXT_PUBLIC_API_URL}`; // ✅ Change this if backend is on a different domain

const LiveComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState(""); // ✅ Add state for username

  useEffect(() => {
    // Fetch existing comments on component mount (initial page load)
    const fetchComments = async () => {
      try {
        const res = await fetch(`${SOCKET_URL}/api/comments`);
        const existingComments = await res.json();
        setComments(existingComments);
      } catch (err) {
        console.error("❌ Error fetching comments:", err);
      }
    };

    fetchComments(); // Fetch comments on page load

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"], // ✅ Ensures direct WebSocket connection
      reconnectionAttempts: 5, // ✅ Retry connection up to 5 times
      reconnectionDelay: 1000, // ✅ Wait 1 second before retrying
    });

    console.log("🛜 Connected to WebSocket:", SOCKET_URL);

    newSocket.on("connect", () => {
      console.log("✅ WebSocket Connected:", newSocket.id);
    });

    newSocket.on("newComment", (comment) => {
      console.log("📡 WebSocket Received Comment:", comment);
      setComments((prev) => [comment, ...prev]); // Only update state when comment is received via WebSocket
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ WebSocket Disconnected:", reason);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // ✅ Handle comment submission
  const submitComment = async () => {
    if (!newComment.trim()) return;

    const commentData = { text: newComment, user: username || "Anonymous" }; // Use username if provided, otherwise default to "Anonymous"

    // Clear the input after sending
    setNewComment("");

    try {
      const res = await fetch(`${SOCKET_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) throw new Error("Failed to send comment");
    } catch (err) {
      console.error("❌ Error submitting comment:", err);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "100px auto 0 auto", color: "#f5f5f5", fontFamily: "Arial, sans-serif", background: "#2c2c2c", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px", color: "#f5f5f5" }}>Live Comments</h2>

      {/* Username Input */}
      <div style={{ marginBottom: "10px" }}> {/* Reduced margin */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "12px", // Smooth rounded corners
            border: "1px solid #555", // Slightly darker border for depth
            width: "100%",
            backgroundColor: "#2c2c2c", // Dark background
            color: "#f5f5f5", // Light text color
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            outline: "none",
            transition: "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid #007BFF"; // Highlight border on focus
            e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)"; // Add glow effect on focus
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #555"; // Reset border color
            e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)"; // Reset shadow
          }}
        />
      </div>

      {/* Comment Input and Submit Button */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}> {/* Reduced gap */}
      <textarea
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  placeholder="Type your comment..."
  style={{
    padding: "8px 10px", // Reduced top and bottom padding
    fontSize: "16px",
    borderRadius: "12px", // Smooth rounded corners
    border: "1px solid #555", // Slightly darker border
    backgroundColor: "#2c2c2c", // Dark background for the input
    color: "#f5f5f5", // Light text color
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    outline: "none",
    resize: "none", // Disable resizing
    maxHeight: "100px", // Set max height to prevent input field from growing infinitely
    overflowY: "auto", // Enable vertical scrolling if content overflows
    transition: "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out", // Smooth transition
  }}
  onFocus={(e) => {
    e.target.style.border = "1px solid #007BFF"; // Highlight border on focus
    e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)"; // Add glow effect on focus
    e.target.style.backgroundColor = "#333"; // Change background color on focus
  }}
  onBlur={(e) => {
    e.target.style.border = "1px solid #555"; // Reset border color
    e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)"; // Reset shadow
    e.target.style.backgroundColor = "#2c2c2c"; // Reset background color
  }}
/>

        <button
          onClick={submitComment}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
            transition: "background-color 0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaPaperPlane style={{ marginRight: "8px" }} /> Send {/* Added React Icon */}
        </button>
      </div>

      {/* Comments List (Scrollable with only 7 visible) */}
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          marginTop: "20px",
          maxWidth: "220px", // Set a lower maxWidth for each comment
          maxHeight: "300px", // ✅ Limit height to display only 7 comments
          overflowY: "auto",  // ✅ Allow vertical scrolling
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {comments.slice(0, 7).map((comment, index) => ( // ✅ Show only the first 7 comments
          <li
            key={index}
            style={{
              padding: "15px",
              marginBottom: "10px", // Reduced margin between comments
              backgroundColor: "#333", // Slightly darker background for each comment
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
              color: "#f5f5f5", // Light text color
              transition: "background-color 0.3s ease-in-out",
              maxHeight: "100px", // Set a max height for each comment
              overflowY: "auto",  // Enable scrolling if the content exceeds maxHeight
            }}
          >
            <strong style={{ color: "#007BFF" }}>{comment.user}:</strong>
            <span>{comment.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveComments;
