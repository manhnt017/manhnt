import React, { useEffect, useState } from "react";
import API from "../api";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  // 🟢 Lấy danh sách khách hàng
  const fetchCustomers = async () => {
    try {
      const res = await API.get(`/customers?search=${search}`);
      console.log("Data:", res.data);
      setCustomers(res.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  // 🟡 Xóa khách hàng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    }
  };

  // 🟣 Khi bấm “Sửa”
  const handleEdit = (customer) => {
    setEditing(customer);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📋 Danh sách Deal biển</h1>

      {/* Thanh tìm kiếm + nút thêm */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Tìm theo tên, địa điểm hoặc số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary ms-3" onClick={() => setEditing({})}>
          ➕ Thêm khách hàng
        </button>
      </div>

      {/* Bảng danh sách */}
      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchCustomers={fetchCustomers}
      />

      {/* Form thêm/sửa khách hàng */}
      {editing && (
        <CustomerForm
          editing={editing}
          onClose={() => setEditing(null)}
          onSaved={fetchCustomers}
        />
      )}
    </div>
  );
}
