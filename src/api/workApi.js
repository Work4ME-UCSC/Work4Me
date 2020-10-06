import axios from "axios";

export default axios.create({
  baseURL: "http://d40043bf5665.ngrok.io", //update the link by runnig ngrok http port_no
});
