import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token"),
  },
});