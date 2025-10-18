import React, { useState } from "react";
import axios from "axios";

export default function CustomerTable({ customers, onEdit, onDelete, fetchCustomers }) {
  const [selectedNote, setSelectedNote] = useState("");
  const [showModal, setShowModal] = useState(false);

  const statusOptions = ["OK", "50/50", "Chưa OK"];

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  // 🟢 Cập nhật trạng thái
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/customers/${id}`, { status: newStatus });
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err.response?.data || err);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "ok":
        return "badge bg-success";
      case "50/50":
        return "badge bg-warning text-dark";
      case "chưa ok":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const handleViewNote = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  return (
    <>
      {/* 📱 Responsive table wrapper */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Địa điểm</th>
              <th>Kích thước</th>
              <th>Deal</th>
              <th>Tình trạng</th>
              <th>SĐT</th>
              <th>Google Map</th>
              <th>Ghi chú</th>
              <th>Ngày làm</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.location}</td>
                  <td>{c.size}</td>
                  <td>{c.deal}</td>

                  {/* Dropdown tình trạng */}
                  <td>
                    <div className="dropdown">
                      <button
                        className={`btn btn-sm dropdown-toggle ${getStatusClass(c.status)}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {c.status || "Chưa chọn"}
                      </button>
                      <ul className="dropdown-menu">
                        {statusOptions.map((s) => (
                          <li key={s}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(c._id, s)}
                            >
                              {s}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  <td>{c.phone}</td>

                  <td>
                    {c.googleMap ? (
                      <a
                        href={c.googleMap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-decoration-none"
                      >
                        Xem bản đồ
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* 📝 Ghi chú có cắt chữ + modal chi tiết */}
                  <td
                    className="text-truncate"
                    style={{
                      maxWidth: "100px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => handleViewNote(c.note)}
                    title="Bấm để xem chi tiết"
                  >
                    {truncateText(c.note, 10)}
                  </td>

                  <td>{c.date ? new Date(c.date).toLocaleDateString("vi-VN") : "—"}</td>

                  <td className="text-nowrap">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(c)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(c._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center text-muted">
                  Không có dữ liệu khách hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔍 Modal hiển thị ghi chú chi tiết */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(3px)",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered px-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg rounded-3 border-0">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-semibold">Chi tiết ghi chú</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p
                  className="m-0 text-break"
                  style={{
                    wordWrap: "break-word",
                    fontSize: "0.95rem",
                  }}
                >
                  {selectedNote || "Không có ghi chú"}
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-secondary w-100 w-sm-auto"
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
