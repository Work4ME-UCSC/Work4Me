import axios from "axios";

export default axios.create({
  baseURL: "http://cc82e9439997.ngrok.io", //update the link by runnig ngrok http port_no
});
