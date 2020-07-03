import axios from "axios";

export default axios.create({
  baseURL: "http://c372f4cdca95.ngrok.io", //update the link by runnig ngrok http port_no
});
