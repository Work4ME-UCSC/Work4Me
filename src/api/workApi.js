import axios from "axios";

export default axios.create({
  baseURL: "http://7246ef7ff282.ngrok.io", //update the link by runnig ngrok http port_no
});
