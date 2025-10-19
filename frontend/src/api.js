import axios from "axios";

const API = axios.create({
  baseURL: "https://manhnt-1-mtq4.onrender.com/api", // đổi nếu BE của cháu chạy cổng khác
});

export default API;
