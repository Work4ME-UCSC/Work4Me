import axios from "axios";

export default axios.create({
  baseURL: "http://ac7fd2d1f1bf.ngrok.io", //update the link by runnig ngrok http port_no
});
