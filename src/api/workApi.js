import axios from "axios";

export default axios.create({
  baseURL: "http://23ccac12b50b.ngrok.io", //update the link by runnig ngrok http port_no
});
