import { io } from 'socket.io-client'
import Cookies from 'js-cookie'

const token = Cookies.get('access_token')

export default io(import.meta.env.VITE_SERVER_URL, {
  extraHeaders: {
    token,
  },
})
