import axios from "axios";

export default axios.create({
  baseURL: "http://1981a54107ba.ngrok.io", //update the link by runnig ngrok http port_no
});
