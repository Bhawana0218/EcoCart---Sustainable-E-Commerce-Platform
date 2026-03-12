import axios from "axios";

const api = axios.create({
  baseURL: "https://ecocart-sustainable-e-commerce-platform-1.onrender.com/api",
});

export default api;