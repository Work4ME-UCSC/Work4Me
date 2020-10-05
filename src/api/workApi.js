import axios from "axios";

export default axios.create({
  baseURL: "http://49fa2a9ed1d2.ngrok.io", //update the link by runnig ngrok http port_no
});
