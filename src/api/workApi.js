import axios from "axios";

export default axios.create({
  baseURL: "http://34a9198d4161.ngrok.io", //update the link by runnig ngrok http port_no
});
