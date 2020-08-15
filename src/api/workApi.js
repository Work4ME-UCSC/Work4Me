import axios from "axios";

export default axios.create({
  baseURL: "http://30c5ac6f1eb7.ngrok.io", //update the link by runnig ngrok http port_no
});
