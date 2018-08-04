import axios from "axios";

export function demo() {
  return axios.get("/user/getUserInfo");
}
