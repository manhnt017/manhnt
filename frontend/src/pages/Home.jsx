import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [animated, setAnimated] = useState(false);
  const [progress, setProgress] = useState(
    Array(6).fill(0) // 6 kỹ năng
  );

  const skills = [
    { name: "HTML / CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 88 },
    { name: "Node.js / Express", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "UI / UX", level: 75 },
  ];

  const stats = [
    { label: "Dự án đã hoàn thành", value: 24 },
    { label: "Năm kinh nghiệm", value: 3 },
    { label: "Khách hàng hài lòng", value: 15 },
    { label: "Ý tưởng sáng tạo", value: 120 },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Khởi đầu hành trình",
      desc: "Tôi bắt đầu học lập trình, khám phá HTML, CSS và logic web cơ bản.",
    },
    {
      year: "2023",
      title: "Tự xây dựng sản phẩm đầu tiên",
      desc: "Học React, Node.js và triển khai ứng dụng CRUD đầu tay.",
    },
    {
      year: "2024",
      title: "Phát triển kỹ năng UI/UX",
      desc: "Bắt đầu quan tâm đến trải nghiệm người dùng, hiệu ứng và giao diện chuyên nghiệp.",
    },
    {
      year: "2025",
      title: "Xây dựng thương hiệu cá nhân",
      desc: "Phát triển website Portfolio này – dấu ấn của sự sáng tạo và nỗ lực.",
    },
  ];

  const projects = [
    {
      title: "Cosmic Vision",
      description: "Ứng dụng AI dự đoán xu hướng công nghệ tương lai.",
      path: "/project/cosmicvision",
    },
    {
      title: "Nebula UI",
      description: "Thư viện giao diện vũ trụ với hiệu ứng ánh sáng độc đáo.",
      path: "/project/nebula",
    },
    {
      title: "Dark Motion",
      description: "Thế giới hiệu ứng động ảo diệu kết hợp React + GSAP.",
      path: "/project/darkmotion",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById("skills");
      if (!skillsSection) return;
      const rect = skillsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && !animated) {
        setAnimated(true);
        skills.forEach((skill, i) => {
          let count = 0;
          const interval = setInterval(() => {
            if (count >= skill.level) clearInterval(interval);
            setProgress((prev) => {
              const updated = [...prev];
              updated[i] = Math.min(count, skill.level);
              return updated;
            });
            count += 2;
          }, 30);
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animated, skills]);

  return (
    <div
      className="min-vh-100 d-flex flex-column position-relative"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #050510, #000 70%)",
        color: "#fff",
        fontFamily: "'Orbitron', 'Poppins', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Hiệu ứng sao */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/stardust.png')",
          opacity: 0.25,
          animation: "moveStars 200s linear infinite",
          zIndex: 0,
        }}
      />

      {/* ==== HERO ==== */}
      <header className="text-center py-5 position-relative" data-aos="fade-down">
        <h1
          className="fw-bold display-4 mb-3 text-light"
          style={{
            textShadow: "0 0 20px #007bff, 0 0 40px #0dcaf0",
          }}
        >
          ✦ Mạnh Lạc — Cosmic Portfolio ✦
        </h1>
        <p className="lead text-info mb-0">
          Developer • Dreamer • Designer • Cosmic Thinker
        </p>
      </header>

      {/* ==== STATS ==== */}
      <section className="text-center py-5 container" data-aos="fade-up">
        <div className="row justify-content-center g-4">
          {stats.map((s, i) => (
            <div className="col-6 col-md-3" key={i}>
              <h2
                className="fw-bold text-info mb-2"
                style={{
                  fontSize: "2.5rem",
                  textShadow: "0 0 10px #0dcaf0",
                }}
              >
                {animated ? s.value : "0"}+
              </h2>
              <p className="text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==== SKILLS ==== */}
      <section id="skills" className="container py-5" data-aos="fade-up">
        <h2 className="text-center fw-bold text-light mb-5">Kỹ Năng Chính</h2>
        {skills.map((skill, i) => (
          <div key={i} className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span>{skill.name}</span>
              <span className="text-info">{progress[i]}%</span>
            </div>
            <div
              className="progress bg-dark"
              style={{
                height: "10px",
                borderRadius: "20px",
                boxShadow: "0 0 10px rgba(0,123,255,0.5)",
              }}
            >
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{
                  width: `${progress[i]}%`,
                  transition: "width 0.5s ease-in-out",
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* ==== TIMELINE ==== */}
      <section className="container py-5" data-aos="fade-up">
        <h2 className="text-center fw-bold text-light mb-5">Hành Trình</h2>
        {timeline.map((item, index) => (
          <div key={index} className="mb-4 ps-3 border-start border-info">
            <h5 className="fw-bold text-info">
              {item.year} — {item.title}
            </h5>
            <p className="text-secondary">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ==== PROJECTS ==== */}
      <section className="container py-5" data-aos="fade-up">
        <h2 className="text-center fw-bold text-light mb-5">Dự Án Nổi Bật</h2>
        <div className="row justify-content-center g-4">
          {projects.map((item, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <div
                className="card border-0 text-center h-100"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(10,10,20,0.9), rgba(25,25,40,0.9))",
                  borderRadius: "20px",
                  boxShadow: "0 0 25px rgba(0,123,255,0.2)",
                  transition: "0.4s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body">
                  <h4 className="fw-bold text-info mb-3">{item.title}</h4>
                  <p className="text-secondary">{item.description}</p>
                  <Link
                    to={item.path}
                    className="btn btn-outline-info rounded-pill mt-3"
                  >
                    Xem chi tiết ✦
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==== FOOTER ==== */}
      <footer
        className="text-center py-5 border-top border-secondary"
        style={{ backgroundColor: "#000010" }}
      >
        <div className="container">
          <div className="d-flex justify-content-center gap-4 mb-4 fs-4">
            <FaGithub />
            <FaLinkedin />
            <FaEnvelope />
            <FaPhone />
          </div>
          <p className="text-secondary small mb-0">
            © {new Date().getFullYear()} Mạnh Lạc — Cosmic Portfolio ✦
          </p>
        </div>
      </footer>

      {/* CSS Animation */}
      <style>
        {`
        @keyframes moveStars {
          from { background-position: 0 0; }
          to { background-position: 10000px 10000px; }
        }
        `}
      </style>
    </div>
  );
}
