import axios from "axios";

export default axios.create({
  baseURL: "http://28283372421e.ngrok.io", //update the link by runnig ngrok http port_no
});
