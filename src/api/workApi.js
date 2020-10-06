import axios from "axios";

export default axios.create({
  baseURL: "http://41b93302bf7a.ngrok.io", //update the link by runnig ngrok http port_no
});
