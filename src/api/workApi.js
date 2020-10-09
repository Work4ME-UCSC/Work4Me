import axios from "axios";
import url from "../constants/url";

export default axios.create({
  baseURL: url.baseUrl, //update the link by runnig ngrok http port_no (constants/url)
});
