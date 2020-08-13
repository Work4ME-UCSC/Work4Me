import axios from "axios";

export default axios.create({
  baseURL: "http://1c5c11b32201.ngrok.io", //update the link by runnig ngrok http port_no
});
