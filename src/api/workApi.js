import axios from "axios";

export default axios.create({
  baseURL: "http://3dd2299fa977.ngrok.io", //update the link by runnig ngrok http port_no
});
