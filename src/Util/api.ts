import axios from "axios";

const api = axios.create({
  baseURL: "https://ophim1.com", // đổi thành API thật của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
