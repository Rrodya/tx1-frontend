import axios from "axios";

const PORT = "3030";
export const URL = `http://localhost:${PORT}/api/`;
export default function sendRequest(url: string, payload: any = null, method: string = "GET") {
  const config: {
    url: string,
    method: string,
    data?: any,
    headers?: Record<string, string>
  } = {
    url: URL + url,
    method: method,
  };


  if(localStorage.tx1_token) {
    console.log(localStorage.tx1_token);
    config.headers = {
      'Authorization': `Bearer ${localStorage.tx1_token}`,
    }
  }

  console.log(config);

  if(payload) {
    config.data = payload;
    console.log('download pahload');
  }

  console.log(URL + url);

  return axios(config);
}
