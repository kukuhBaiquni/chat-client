<template>
  <main class="h-screen w-screen text">
    <div
      class="max-w-screen h-screen xl:h-[95%] z-10 xl:max-w-screen-lg centering flex"
    >
      <div
        :class="[
          'w-full sm:w-[60%] md:w-[40%] bg-gray-300 h-full border-r border-sky-200',
          activeChatIndex !== -1 && 'hidden sm:block',
        ]"
      >
        <div class="bg-sky-200 h-[52px] px-2 flex items-center">
          <div class="relative w-[50px]">
            <img
              :src="$store.state.user.image"
              class="h-[40px] w-[40px] rounded-full"
            />
            <div
              :class="[
                'absolute h-3 w-3 rounded-full z-10 border-2 border-sky-200',
                'bg-green-500 bottom-0 -right-1',
              ]"
            />
          </div>
          <div class="ml-3 flex items-center justify-between w-full">
            <div>
              <span class="font-bold">{{ $store.state.user.name }}</span>
              <p class="text-xs text-gray-600">Online</p>
            </div>
            <div class="flex">
              <button
                type="button"
                title="Search User"
                class="px-1 rounded flex-center bg-sky-500 mr-1"
                @click="showSearchPanel = true"
              >
                <i class="bx bx-search-alt text-xl text-white"></i>
              </button>
              <button
                type="button"
                title="Logout"
                @click="logout"
                class="px-1 rounded flex-center bg-sky-500"
              >
                <i class="bx bx-power-off text-xl text-white"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="false"
          :class="[
            'h-[52px] bg-sky-200 flex-center px-2 border-b border-sky-200 relative',
            'transition-all',
            showSearchPanel
              ? 'translate-y-0 opacity-1 z-10'
              : '-translate-y-[35px] opacity-0 -z-10',
          ]"
        >
          <div class="w-full flex items-center bg-sky-100 rounded">
            <i class="bx bx-search-alt mx-2 text-lg text-gray-600"></i>
            <input
              type="text"
              placeholder="Search User"
              v-model="query"
              class="w-full p-1.5 rounded text-gray-600 bg-sky-100 focus:outline-none placeholder-gray-400"
            />
          </div>
          <button @click="showSearchPanel = false">
            <i class="bx bx-x text-2xl text-gray-600"></i>
          </button>
        </div>
        <UserCard :idx="activeChatIndex" :setIdx="setActiveChatIndex" />
      </div>
      <ChatBox :idx="activeChatIndex" :setIdx="setActiveChatIndex" />
    </div>
  </main>
</template>

<script>
import ChatBox from '../components/chat-box.vue'
import { getExistUser, getUserByToken, getSpecificUser } from '../api/user'
import Cookies from 'js-cookie'
import socket from '../helpers/socket'
import { EVENT } from '../constants/event'
import UserCard from '../components/user-card.vue'
import { debounce } from 'throttle-debounce'

export default {
  data() {
    return {
      showErrorAlert: false,
      showSearchPanel: false,
      page: 1,
      activeChatIndex: -1,
      query: '',
    }
  },
  components: {
    ChatBox,
    UserCard,
  },
  computed: {
    target() {
      console.log(this.activeChatIndex)
      return this.$store.state.userList[this.activeChatIndex]
    },
  },
  created() {
    const token = Cookies.get('access_token')
    if (token) {
      if (!this.$store.state.user.id) {
        this.getSelf()
      } else {
        this.getOtherUser(1)
        this.page++
      }
    } else {
      this.router.replace('/')
    }
    window.onbeforeunload = () => {
      socket.emit(EVENT.USER_DISCONNECTED)
    }

    socket.emit(EVENT.USER_CONNECTED)

    socket.on('connect', () => {})

    // Change user list status to online
    socket.on(EVENT.USER_CONNECTED, (data) => {
      console.log(this.$store.state.user)
      console.log(data)
      this.$store.dispatch('userList/changeStatus', data)
      if (
        this.$store.state.userList.data
          .map((user) => user.id)
          .indexOf(data.id) === -1 &&
        this.$store.state.user.id !== data.id
      ) {
        this.$store.dispatch('userList/prependUser', data)
      }
    })

    // Change user list status to offline
    socket.on(EVENT.USER_DISCONNECTED, (data) => {
      this.$store.dispatch('userList/changeStatus', data)
    })
  },
  methods: {
    async getSelf() {
      const response = await getUserByToken()
      if (response.success) {
        this.$store.dispatch('user/setUser', response.data)
        this.getOtherUser(1)
        this.page++
      } else {
        this.showErrorAlert = true
      }
    },
    async getOtherUser(page) {
      const response = await getExistUser({
        id: this.$store.state.user.id,
        page,
      })
      this.$store.dispatch('userList/setUsers', response.data)
    },
    async logout() {
      Cookies.remove('access_token')
      this.$router.replace('/')
    },
    setActiveChatIndex(index) {
      this.activeChatIndex = index
    },
    async filterUser() {
      const debounceFunc = debounce(500, async () => {
        const response = await getSpecificUser({ name: this.query })
        console.log(response)
      })
      debounceFunc()
    },
  },
  beforeUnmount() {
    socket.emit(EVENT.USER_DISCONNECTED)
  },
  beforeMount() {
    const token = Cookies.get('access_token')
    if (!token) {
      this.$router.replace('/')
    }
  },
}
</script>
