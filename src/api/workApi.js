import axios from "axios";

export default axios.create({
  baseURL: "http://c192e33a9217.ngrok.io", //update the link by runnig ngrok http port_no
});
