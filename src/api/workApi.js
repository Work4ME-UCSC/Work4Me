import axios from "axios";

export default axios.create({
  baseURL: "http://195f3972b34a.ngrok.io", //update the link by runnig ngrok http port_no
});
