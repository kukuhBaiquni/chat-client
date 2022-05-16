import axios from 'axios'
import Cookies from 'js-cookie'

// eslint-disable-next-line no-undef
const BASE_URL = import.meta.env.VITE_SERVER_URL
const token = Cookies.get('access_token')
console.log(BASE_URL)

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token,
  },
})

API.interceptors.response.use(
  (res) => res?.data || res,
  (err) => {
    if (err.response.status === 401) {
      if (window.location.pathname !== '/') {
        window.location.replace('/')
      }
    }
    return {
      ...(err.response?.data || {}),
      status: err.response?.status,
    }
  }
)

export default API
