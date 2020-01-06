import Axios from 'axios';

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

Axios.defaults.baseURL = "http://localhost:8080"

export default Axios;