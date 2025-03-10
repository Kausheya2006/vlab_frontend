"use client"

import { useEffect, useState } from "react"
import io from "socket.io-client"
import { FaPaperPlane } from "react-icons/fa" // Importing the send icon from react-icons

const SOCKET_URL = `${process.env.NEXT_PUBLIC_API_URL}` // ✅ Change this if backend is on a different domain

const LiveComments = () => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [username, setUsername] = useState("") // ✅ Add state for username

  const [isOpen, setIsOpen] = useState(false);

const toggleComments = () => {
  setIsOpen(!isOpen);
};

  useEffect(() => {
    // Fetch existing comments on component mount (initial page load)
    const fetchComments = async () => {
      try {
        const res = await fetch(`${SOCKET_URL}/api/comments`)
        const existingComments = await res.json()
        setComments(existingComments)
      } catch (err) {
        console.error("❌ Error fetching comments:", err)
      }
    }

    fetchComments() // Fetch comments on page load

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"], // ✅ Ensures direct WebSocket connection
      reconnectionAttempts: 5, // ✅ Retry connection up to 5 times
      reconnectionDelay: 1000, // ✅ Wait 1 second before retrying
    })

    console.log("🛜 Connected to WebSocket:", SOCKET_URL)

    newSocket.on("connect", () => {
      console.log("✅ WebSocket Connected:", newSocket.id)
    })

    newSocket.on("newComment", (comment) => {
      console.log("📡 WebSocket Received Comment:", comment)
      setComments((prev) => [comment, ...prev]) // Only update state when comment is received via WebSocket
    })

    newSocket.on("disconnect", (reason) => {
      console.log("❌ WebSocket Disconnected:", reason)
    })

    return () => {
      newSocket.disconnect()
    }
  }, []) // Empty dependency array ensures this effect runs once when the component mounts

  // ✅ Handle comment submission
  const submitComment = async () => {
    if (!newComment.trim()) return

    const commentData = { text: newComment, user: username || "Anonymous" } // Use username if provided, otherwise default to "Anonymous"

    // Clear the input after sending
    setNewComment("")

    try {
      const res = await fetch(`${SOCKET_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      })

      if (!res.ok) throw new Error("Failed to send comment")
    } catch (err) {
      console.error("❌ Error submitting comment:", err)
    }
  }

  // Handle Enter key press in textarea
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submitComment()
    }
  }

  return (<>
    <div 
      className="live-comments-hamburger" 
      onClick={toggleComments}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
    
    {/* Overlay when comments are open */}
    <div 
      className={`comments-overlay ${isOpen ? 'active' : ''}`} 
      onClick={toggleComments}
    ></div>
    <div className={`live-comments-container ${isOpen ? 'active' : ''}`}>
      <button className="close-comments" onClick={toggleComments}>×</button>
      <h2 className="live-comments-title">Live Comments</h2>

      {/* Username Input */}
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="username-input"
        />
      </div>

      {/* Comment Input and Submit Button */}
      <div className="comment-input-container">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your comment..."
          className="comment-textarea"
        />

        <button onClick={submitComment} className="submit-button">
          <FaPaperPlane className="send-icon" /> Send
        </button>
      </div>

      {/* Comments List */}
      <ul className="comments-list">
        {comments.slice(0, 7).map((comment, index) => (
          <li key={index} className="comment-item">
            <strong className="comment-username">{comment.user}:</strong>
            <span className="comment-text">{comment.text}</span>
          </li>
        ))}
      </ul>
    </div>
  </>)
}

export default LiveComments

