import axios from "axios";

export default axios.create({
  baseURL: "http://31d4319ffc0a.ngrok.io", //update the link by runnig ngrok http port_no
});
