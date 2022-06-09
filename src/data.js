import axios from "axios";
//import Cookies from "js-cookie";

//var token = Cookies.get("apollo");
var host = "http://143.198.244.180:3000";

const api = axios.create({
  baseURL: host,
  headers: { "Content-Type": "application/json"}
});

export default api;