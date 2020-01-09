import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:8080"


const UNPROTECT_PATHS = [
  'loginUser',
  'registerUser'
]

const isUnProtectedPath = (url) => {
  for (let path of UNPROTECT_PATHS) {
    if (url.includes(path)) {
      return true
    }
    return false
  }
}

Axios.interceptors.request.use(
  async config => {
    if (isUnProtectedPath(config.url)) {
      return config
    }

    let token = localStorage.getItem('ACCESS_TOKEN')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  async error => {
    throw error;
  }
)

Axios.interceptors.response.use(
  async config => {
    return config;
  },
  async error => {
    if (error.request === undefined) throw error;

    let url = error.request.responseURL;
    if (error.request.status === 401 && isUnProtectedPath(url)) {
      throw error;
    }

    if (error.request.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN")
      console.log("Session expire, redirect to login");
      alert("Session expire, redirect to login");
      window.location.href = "/home"
    }

    throw error;
  },
);

Axios.defaults.baseURL = "http://localhost:8080"

export default Axios;