import axios from "axios";

export default axios.create({
  baseURL: "http://07298e4f5986.ngrok.io", //update the link by runnig ngrok http port_no
});
