import axios from "axios";

export default axios.create({
  baseURL: "http://8bf43521661d.ngrok.io", //update the link by runnig ngrok http port_no
});
