import Customer from "../models/Customer.js";

// 🟢 Tạo mới khách hàng
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔵 Lấy danh sách khách hàng (có search + phân trang)
export const getCustomers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      $or: [
        { name: new RegExp(search, "i") },
        { location: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
      ],
    };

    const total = await Customer.countDocuments(query);
    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ data: customers, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟠 Lấy 1 khách hàng
export const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (err) {
    res.status(404).json({ error: "Không tìm thấy khách hàng" });
  }
};

// 🟣 Cập nhật khách hàng
export const updateCustomer = async (req, res) => {
    try {
        const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
};

// 🔴 Xóa khách hàng
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
