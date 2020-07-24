import axios from "axios";

export default axios.create({
  baseURL: "http://e05d7a28957a.ngrok.io", //update the link by runnig ngrok http port_no
});
