import axios from "axios";

export default axios.create({
  baseURL: "http://6fbf9aecfb93.ngrok.io", //update the link by runnig ngrok http port_no
});
