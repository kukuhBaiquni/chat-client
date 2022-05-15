import { createStore } from 'vuex'
import UserModule from './user.module.js'
import UserListModule from './user-list.module.js'
import ChatModule from './chat.module'

export default createStore({
  modules: {
    user: UserModule,
    userList: UserListModule,
    chatList: ChatModule,
  },
})
