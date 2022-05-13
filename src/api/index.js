import axios from 'axios'

// eslint-disable-next-line no-undef
const BASE_URL = import.meta.env.VITE_SERVER_URL
console.log(BASE_URL)

const API = axios.create({
  baseURL: BASE_URL,
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
