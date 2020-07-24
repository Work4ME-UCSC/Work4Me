import axios from "axios";

export default axios.create({
  baseURL: "http://dab4ce360fb5.ngrok.io", //update the link by runnig ngrok http port_no
});
