import React from "react";
import Tasks from "./Pages/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dceefb, #f9f9f9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "950px",
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "20px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
          padding: "2.5rem",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Tasks />
      </div>

      {/* Optional fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
