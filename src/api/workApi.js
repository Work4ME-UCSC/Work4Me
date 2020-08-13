import axios from "axios";

export default axios.create({
  baseURL: "http://be8749d1762a.ngrok.io", //update the link by runnig ngrok http port_no
});
