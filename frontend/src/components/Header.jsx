import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        {/* Logo hoặc tiêu đề */}
        <Link className="navbar-brand" to="/">
          My Workspace
        </Link>

        {/* Nút toggle (hiện menu trên mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Các mục menu */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contacts">
                Danh bạ
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/notes">
                Ghi chú nhanh
              </Link>
            </li>

            {/* Dropdown "Công việc" */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="workDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Công việc
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="workDropdown">
                <li>
                  <Link className="dropdown-item" to="/deal/biennho">
                    Deal nhỏ
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/deal/pano">
                    Deal pano
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/deal/tranhdien">
                    Deal trang điện
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
