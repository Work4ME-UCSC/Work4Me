import axios from "axios";

export default axios.create({
  baseURL: "http://7f82938473c9.ngrok.io", //update the link by runnig ngrok http port_no
});
