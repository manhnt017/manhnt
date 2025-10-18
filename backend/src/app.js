import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

// ✅ CORS phải nằm trước mọi route
app.use(cors()); // Cho phép tất cả domain truy cập
app.use(express.json());


// ✅ Middleware để đọc JSON
app.use(express.json());

// ✅ Kết nối MongoDB
connectDB();

// ✅ Route test CORS
app.get("/", (req, res) => {
  res.json({ message: "Server OK & CORS enabled ✅" });
});

// ✅ API chính
app.use("/api/customers", customerRoutes);

// ✅ Lắng nghe cổng
const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
