import axios from "axios";

export default class Axios {
  constructor(token) {
    this.token = token;
    axios.defaults.baseURL = 'http://localhost:4000';
    axios.defaults.headers.common['Authorization'] = this.Token();
    this.AxiosInterceptor();
  }
  Token() {
    const Bearer = "Bearer " + this.token;
    return Bearer;
  }
  AxiosInterceptor() {
    axios.interceptors.request.use((request) => {
/*       console.log("cambiando headerss");
      console.log(request); */
      return request;
    });
  }
  All(url) {
    const datos = axios({
      url: url,
      method: "GET",
      //headers: { Authorization: "Bearer " + this.token },
    });
    return datos;
  }
  toRegister(url, data) {
    const regis = axios({
      url: url,
      data: data,
      method: "POST",
    });
    return regis;
  }
  AllOne(id, url) {
    const all = axios({
      url: url + `/${id}`,
      method: "GET",
    });
    return all;
  }
  RegisterImage(url, data) {
    const regis = axios({
      url: url,
      method: "POST",
      data: data,
    });
    return regis;
  }
  Delete(url, id) {
    const elim = axios({
      url: url + `/${id}`, method: "DELETE",
    });
    return elim;
  }
  UpdatePut(url, data) {
    const put = axios({
      url: url,
      method: "PUT",
      data: data,
    });
    return put;
  }
  UpdatePatch(url, data) {
    const patch = axios({
      url: url,
      method: "PATCH",
      data: data,
    });
    return patch;
  }
}
