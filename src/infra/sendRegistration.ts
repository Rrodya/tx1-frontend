import axios from "axios";
import {PORT, HOST} from "../enums";
export default function sendRegistration(payload: any) {
  console.log("req");
  axios.post(`http://${HOST}:${PORT}`, payload)
}
