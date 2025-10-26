import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  const links = [
    { name: "Deal Biển Nhỏ 🌊", path: "/deal/biennho", color: "#0dcaf0" },
    { name: "Deal Tranh Điên 🎨", path: "/deal/tranhdien", color: "#d63384" },
    { name: "Deal Pano 📸", path: "/deal/pano", color: "#6610f2" },
  ];

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{
        background: "radial-gradient(circle at 20% 20%, #050510, #000)",
        color: "#fff",
        fontFamily: "'Orbitron', 'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      <h1
        className="fw-bold mb-5"
        style={{
          textShadow: "0 0 20px #0dcaf0, 0 0 40px #007bff",
        }}
      >
        ✦ Chọn Chuyên Mục ✦
      </h1>

      <div className="d-flex flex-column gap-4">
        {links.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="btn btn-lg fw-bold px-5 py-3 border-0"
            style={{
              borderRadius: "50px",
              background: item.color,
              color: "#fff",
              textShadow: "0 0 10px rgba(255,255,255,0.6)",
              boxShadow: `0 0 20px ${item.color}`,
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = `0 0 40px ${item.color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 0 20px ${item.color}`;
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <footer className="position-absolute bottom-0 mb-3 small text-secondary">
        © {new Date().getFullYear()} Cosmic Deals ✦
      </footer>
    </div>
  );
}
