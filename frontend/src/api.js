import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // đổi nếu BE của cháu chạy cổng khác
});

export default API;
