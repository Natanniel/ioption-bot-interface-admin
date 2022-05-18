import axios from "axios";
//import Cookies from "js-cookie";

//var token = Cookies.get("apollo");
var host = "http://localhost:3000";

const api = axios.create({
  baseURL: host,
  headers: { "Content-Type": "application/json"}
});

export default api;