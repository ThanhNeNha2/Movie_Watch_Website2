import axios from "axios";

const api = axios.create({
  baseURL: "https://ophim1.com/v1/api", // đổi thành API thật của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
