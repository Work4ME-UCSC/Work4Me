import axios from "axios";

export default axios.create({
  baseURL: "http://5f51e2ceb9c5.ngrok.io", //update the link by runnig ngrok http port_no
});
