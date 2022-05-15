import { io } from 'socket.io-client'
import Cookies from 'js-cookie'

const token = Cookies.get('access_token')

export default io('http://192.168.1.7:8081', {
  extraHeaders: {
    token,
  },
})
