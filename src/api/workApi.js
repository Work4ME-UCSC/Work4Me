import axios from "axios";

export default axios.create({
  baseURL: "http://94e829df5af5.ngrok.io", //update the link by runnig ngrok http port_no
});
