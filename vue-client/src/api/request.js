import axios from "axios"
import router from "../router"
import store from "../store"

// Axios
const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

// Authen header
request.defaults.headers.common['Authorization'] = localStorage.getItem("token")

// Exception
request.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
        store.state.auth.message = "Session expired. please login again!"
        router.push({name: "home"})
        return error.response
    } else {
      return Promise.reject(error);
    }
    
  });

export default request