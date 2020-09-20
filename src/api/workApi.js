import axios from "axios";

export default axios.create({
  baseURL: "http://de17c9480f5c.ngrok.io", //update the link by runnig ngrok http port_no
});
