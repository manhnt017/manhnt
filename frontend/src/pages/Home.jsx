import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const deals = [
    {
      title: "Deal Biển Nhỏ",
      description: "Quản lý thông tin các hợp đồng biển nhỏ.",
      path: "/deal/biennho",
      color: "primary",
    },
    {
      title: "Deal Tranh Điện",
      description: "Quản lý thông tin các hợp đồng tranh điện.",
      path: "/deal/tranhdien",
      color: "danger",
    },
    {
      title: "Deal Pano",
      description: "Quản lý thông tin các hợp đồng pano.",
      path: "/deal/pano",
      color: "success",
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">
        Trang Quản Lý Các Loại Deal
      </h1>

      <div className="row g-4">
        {deals.map((deal, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className={`card text-white bg-${deal.color} h-100 shadow`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{deal.title}</h5>
                <p className="card-text flex-grow-1">{deal.description}</p>
                <Link
                  to={deal.path}
                  className="btn btn-light mt-auto fw-semibold"
                >
                  Truy cập →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-light text-center text-muted py-3 fixed-bottom border-top">
  © {new Date().getFullYear()} Hệ thống quản lý Deal
</footer>

    </div>
  );
}
