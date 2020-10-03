import axios from "axios";

export default axios.create({
  baseURL: "http://8c161c66c850.ngrok.io", //update the link by runnig ngrok http port_no
});
