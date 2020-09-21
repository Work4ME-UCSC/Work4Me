import axios from "axios";

export default axios.create({
  baseURL: "http://ea8f659119a8.ngrok.io", //update the link by runnig ngrok http port_no
});
