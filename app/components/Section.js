'use client';
import "./Section.css"

const broadAreas = [
  {
    title: "Civil Engineering",
    description: "Explore the foundations of infrastructure and structural design",
    icon: "🏗️",
  },
  {
    title: "Biotechnology",
    description: "Dive into the world of biological sciences and genetic engineering",
    icon: "🧬",
  },
  { title: "Physical Sciences", description: "Understand the fundamentals of physics and chemistry", icon: "⚛️" },
  {
    title: "Electronics & Communications",
    description: "Innovate with circuits and communication systems",
    icon: "📡",
  },
  { title: "Computer Science", description: "Unleash your potential in programming and algorithms", icon: "💻" },
  { title: "Mechanical Engineering", description: "Design and analyze mechanical systems and processes", icon: "⚙️" },
  { title: "Chemical Engineering", description: "Transform raw materials into valuable products", icon: "🧪" },
  { title: "Electrical Engineering", description: "Harness electrical energy for various applications", icon: "⚡" },
]

const BroadAreasSection = () => {
  return (
    <section className="broad-areas-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Explore Our Disciplines</div>
          <h2 className="section-title">Broad Areas of Virtual Labs</h2>
          <p className="section-subtitle">
            Comprehensive virtual laboratory experiences across engineering and science disciplines
          </p>
        </div>

        <div className="areas-grid">
          {broadAreas.map((area, index) => (
            <div key={index} className="area-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="area-icon">{area.icon}</div>
              <h3 className="area-title">{area.title}</h3>
              <p className="area-description">{area.description}</p>
              <div className="area-overlay"></div>
              <button className="area-button">Explore Labs</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .broad-areas-section {
          padding: 5rem 0;
          background-color: white;
          position: relative;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-badge {
          display: inline-flex;
          align-items: center;
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #334155;
          margin-bottom: 1rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .area-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid #e2e8f0;
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
          position: relative;
          overflow: hidden;
        }
        
        .area-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }
        
        .area-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .area-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .area-description {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.6;
          flex-grow: 1;
        }
        
        .area-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .area-card:hover .area-overlay {
          opacity: 1;
        }
        
        .area-button {
          background-color: #1a73e8;
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
          margin-top: 1.5rem;
        }
        
        .area-button:hover {
          background-color: #0d47a1;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .areas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default BroadAreasSection

