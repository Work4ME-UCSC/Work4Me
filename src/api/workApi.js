import axios from "axios";

export default axios.create({
  baseURL: "http://e81053a6e93d.ngrok.io", //update the link by runnig ngrok http port_no
});
