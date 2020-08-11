import axios from "axios";

export default axios.create({
  baseURL: "http://18c2c90becc8.ngrok.io", //update the link by runnig ngrok http port_no
});
