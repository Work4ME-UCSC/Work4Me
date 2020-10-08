import axios from "axios";

export default axios.create({
  baseURL: "http://c0fbfaec2e25.ngrok.io", //update the link by runnig ngrok http port_no
});
