import axios from "axios";

export default axios.create({
  baseURL: "http://fe7bb821b01b.ngrok.io", //update the link by runnig ngrok http port_no
});
