import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/banksimulator",
});
export default api;
