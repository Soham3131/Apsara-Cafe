// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true,
});
API.interceptors.request.use((req) => {
  // Check if user info (with the token) exists in local storage
  if (localStorage.getItem('userInfo')) {
    // If it exists, add the 'Authorization' header to the request
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  // Return the request so it can be sent on to the server
  return req;
});

export default API;
