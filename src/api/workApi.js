import axios from "axios";

export default axios.create({
  baseURL: "http://722ab8e27551.ngrok.io", //update the link by runnig ngrok http port_no
});
