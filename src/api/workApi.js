import axios from "axios";

export default axios.create({
  baseURL: "http://670efb82dc7f.ngrok.io", //update the link by runnig ngrok http port_no
});
