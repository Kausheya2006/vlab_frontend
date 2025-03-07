import React, { useEffect, useState } from "react";
import "./ReferenceBooksModals.css";

const ReferenceBooksModal = ({ isOpen, onClose, books }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isOpen) return null; // Prevents SSR mismatches

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Reference Books</h2>
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferenceBooksModal;
