import axios from "axios";

export default axios.create({
  baseURL: "http://58e86c392087.ngrok.io", //update the link by runnig ngrok http port_no
});
