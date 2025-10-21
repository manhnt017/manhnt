import React, { useEffect, useState } from "react";
import API from "../api";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchCustomers = async (page = 1, searchText = "") => {
    try {
      const res = await API.get(
        `/customers?search=${searchText}&page=${page}&limit=${itemsPerPage}`
      );
      console.log("Response:", res.data);
      setCustomers(res.data.data || []);
      setTotalPages(
        res.data.totalPages ||
          Math.ceil((res.data.total || 0) / itemsPerPage)
      );
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ✅ Chỉ có 1 useEffect
  useEffect(() => {
    fetchCustomers(currentPage, search);
  }, [currentPage, search]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      await API.delete(`/customers/${id}`);
      fetchCustomers(currentPage, search);
    }
  };

  const handleEdit = (customer) => {
    setEditing(customer);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // ✅ chỉ reset về trang đầu khi search thay đổi
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📋 Danh sách Deal biển</h1>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Tìm theo tên, địa điểm hoặc số điện thoại..."
          value={search}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary ms-3" onClick={() => setEditing({})}>
          ➕ Thêm khách hàng
        </button>
      </div>

      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchCustomers={fetchCustomers}
      />

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                ← Trang trước
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Trang sau →
              </button>
            </li>
          </ul>

          <p className="text-center text-muted mt-2">
            Trang {currentPage}/{totalPages}
          </p>
        </nav>
      )}

      {editing && (
        <CustomerForm
          editing={editing}
          onClose={() => setEditing(null)}
          onSaved={() => fetchCustomers(currentPage, search)}
        />
      )}
    </div>
  );
}
