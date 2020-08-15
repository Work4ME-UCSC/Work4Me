import axios from "axios";

export default axios.create({
  baseURL: "http://d5819b347a66.ngrok.io", //update the link by runnig ngrok http port_no
});
