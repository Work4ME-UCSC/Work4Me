import axios from "axios";

export default axios.create({
  baseURL: "http://43fec7b6ed2a.ngrok.io", //update the link by runnig ngrok http port_no
});
