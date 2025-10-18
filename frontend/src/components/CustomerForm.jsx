import React, { useEffect, useState } from "react";
import API from "../api";

export default function CustomerForm({ editing, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    size: "",
    deal: "",
    status: "",
    phone: "",
    googleMap: "",
    note: "",
    date: "",
  });

  // Khi mở form sửa thì nạp lại dữ liệu
  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        // Nếu có ngày thì chỉ lấy phần YYYY-MM-DD cho input date hiểu
        date: editing.date
          ? new Date(editing.date).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nếu không có ngày → tự động lấy ngày hiện tại ở VN
    let dateToSave = form.date;
    if (!dateToSave) {
      const vnNow = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
      dateToSave = new Date(vnNow).toISOString().slice(0, 10);
    }

    const payload = { ...form, date: dateToSave };

    if (form._id) {
      await API.put(`/customers/${form._id}`, payload);
    } else {
      await API.post("/customers", payload);
    }

    onSaved();
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {form._id ? "✏️ Sửa khách hàng" : "➕ Thêm khách hàng"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body row g-3">
              {[
                "name",
                "location",
                "size",
                "deal",
                "status",
                "phone",
                "googleMap",
                "note",
              ].map((field) => (
                <div key={field} className="col-md-6">
                  <label className="form-label fw-bold">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    className="form-control"
                    value={form[field] || ""}
                    onChange={handleChange}
                    placeholder={`Nhập ${field}`}
                  />
                </div>
              ))}

              {/* Ngày làm */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Ngày làm</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={form.date || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
