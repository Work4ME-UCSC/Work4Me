import axios from "axios";

export default axios.create({
  baseURL: "http://7d02a4b2ee01.ngrok.io", //update the link by runnig ngrok http port_no
});
