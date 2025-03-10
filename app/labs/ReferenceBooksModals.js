"use client"

import { useEffect, useState } from "react"
import "./ReferenceBooksModals.css"

const ReferenceBooksModal = ({ isOpen, onClose, books }) => {
  const [isClient, setIsClient] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Add event listener for escape key
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => {
    setAnimateOut(true)
    setTimeout(() => {
      setAnimateOut(false)
      onClose()
    }, 300)
  }

  if (!isClient || !isOpen) return null

  return (
    <div className={`modal-overlay ${animateOut ? "fade-out" : ""}`} onClick={handleClose}>
      <div className={`modal-content ${animateOut ? "scale-down" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Reference Books</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <ul className="books-list">
            {books.map((book, index) => (
              <li key={index} className="book-item">
                <div className="book-icon">📚</div>
                <span>{book}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <button className="modal-action-btn" onClick={handleClose}>
            Close
          </button>
        </div>

        <div className="modal-decoration top-left"></div>
        <div className="modal-decoration top-right"></div>
        <div className="modal-decoration bottom-left"></div>
        <div className="modal-decoration bottom-right"></div>
      </div>
    </div>
  )
}

export default ReferenceBooksModal

