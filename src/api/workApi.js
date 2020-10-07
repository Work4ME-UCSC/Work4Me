import axios from "axios";

export default axios.create({
  baseURL: "http://8fa1306abeb6.ngrok.io", //update the link by runnig ngrok http port_no
});
