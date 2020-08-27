import axios from "axios";

export default axios.create({
  baseURL: "http://694cc945f0b9.ngrok.io", //update the link by runnig ngrok http port_no
});
