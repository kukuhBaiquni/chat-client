<template>
  <div
    :class="[
      'w-full flex-col border-r border-b border-sky-200 overflow-hidden relative',
      idx === -1 ? 'sm:flex hidden' : 'sm:flex sm:h-full h-full ',
    ]"
  >
    <div
      :class="[
        'bg-sky-200 relative flex items-center',
        idx === -1 ? 'h-[58px]' : 'h-16',
      ]"
    >
      <button @click="back">
        <i
          class="bx bx-arrow-back text-gray-600 justify-self-center ml-3 text-2xl"
        ></i>
      </button>
      <div
        :class="[
          'bg-gray-400 -bottom-3 left-0 w-[80px] py-2 mx-auto shadow-md rounded',
          isLoading
            ? 'opacity-100 translate-y-[64px]'
            : 'opacity-0 translate-y-[32px]',
        ]"
      >
        <pulse-loader
          v-if="true"
          :loading="true"
          :color="loader.color"
          :size="loader.size"
          class="translate-y-1 text-center"
        ></pulse-loader>
      </div>
    </div>
    <div v-if="idx === -1" class="h-full w-full flex-center py-1 flex-col">
      <img src="@/assets/chat.png" class="h-[200px]" alt="chat" />
      <span class="text-gray-600 text-lg font-bold"
        >Start chat with new friends now!</span
      >
      <p class="text-xs text-gray-500">
        Click on available user, at left panel.
      </p>
    </div>
    <div
      :class="[
        'overflow-auto sm:h-full py-1 custom-scroll bg-gray-100 flex-col-reverse',
        idx === -1 ? 'hidden' : `flex h-[80%] pb-8`,
      ]"
      id="box"
    >
      <div
        v-for="chat in $store.state.chatList.data"
        :key="chat.id"
        ref="box"
        :class="[
          'p-2 pb-3 my-1 chat relative flex',
          chat.ownership === 1 ? 'me' : 'you',
        ]"
      >
        <span>
          {{ chat.text }}
        </span>
        <div class="text-[10px] translate-y-3 ml-2 self-end">
          {{ dateFormat(chat.createdAt) }}
        </div>
      </div>
    </div>
    <div
      v-if="idx !== -1"
      :class="[
        'h-16 bg-gray-300 mt-auto flex items-center justify-between px-2',
        'border border-gray-200 invisible sm:visible',
      ]"
    >
      <input
        type="text"
        v-model="text"
        v-on:keyup.enter="sendMessage"
        placeholder="Type message"
        class="w-[90%] p-1.5 rounded bg-gray-100 text-gray-600 focus:outline-none"
      />
      <button @click="sendMessage" class="bg-sky-100 py-1 px-5 rounded">
        <i class="bx bxs-send text-gray-500 text-base"></i>
      </button>
    </div>
    <div
      v-if="idx !== -1"
      :class="[
        'h-16 bg-gray-300 mt-auto flex items-center justify-between px-2',
        'border border-gray-200 visible sm:hidden absolute bottom-0 w-full',
      ]"
    >
      <input
        type="text"
        v-model="text"
        v-on:keyup.enter="sendMessage"
        placeholder="Type message"
        class="w-[90%] p-1.5 rounded bg-gray-100 text-gray-600 focus:outline-none"
      />
      <button @click="sendMessage" class="bg-sky-100 py-1 px-5 rounded">
        <i class="bx bxs-send text-gray-500 text-base"></i>
      </button>
    </div>
  </div>
</template>

<script>
import socket from '../helpers/socket'
import { EVENT } from '../constants/event'
import dayjs from 'dayjs'
import { getChat } from '../api/chat'
import Cookies from 'js-cookie'
import { debounce } from 'throttle-debounce'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  data() {
    return {
      text: '',
      isLoading: false,
      loader: {
        size: '10px',
        color: '#FFFFFF',
      },
      windowHeight: window.screen.height - 112,
    }
  },
  components: {
    PulseLoader,
  },
  props: {
    idx: Number,
    setIdx: Function,
  },
  mounted() {},
  computed: {
    dateFormat() {
      return (time) => dayjs(time).format('HH.mm')
    },
  },
  methods: {
    sendMessage() {
      socket.emit(EVENT.CHAT_FROM_CLIENT, {
        text: this.text,
        recipientId: this.$store.state.userList.data[this.$props.idx].id,
        senderId: this.$store.state.user.id,
      })
      this.text = ''
      const el = document.getElementById('box')
      if (el) {
        el.scrollTo(0, 0)
      }
    },
    async loadMoreChat() {
      const token = Cookies.get('access_token')
      const response = await getChat({
        senderId: this.$store.state.user.id,
        recipientId: this.$store.state.chatList.activeId,
        token,
        offset: this.$store.state.chatList.data.length,
      })

      if (response.success) {
        const mapOwnership = response.data.map((item) => {
          if (item.user_id === this.$store.state.user.id) {
            return {
              ...item,
              ownership: 1,
            }
          }
          return { ...item, ownership: 0 }
        })
        this.$store.dispatch('chatList/appendChat', mapOwnership)
      }
      this.isLoading = false
    },
    back() {
      this.$props.setIdx(-1)
    },
  },
  watch: {
    idx(newIdx, oldIdx) {
      if (newIdx !== oldIdx) {
        const el = document.getElementById('box')
        if (el) {
          el.scrollTo(0, 0)
          el.onscroll = () => {
            if (el.offsetHeight - el.scrollHeight === el.scrollTop) {
              const debounceFunc = debounce(1500, () => {
                this.isLoading = true
                this.loadMoreChat()
              })
              if (
                this.$store.state.chatList.totalData >
                this.$store.state.chatList.data.length
              ) {
                debounceFunc()
              }
              console.log('hehe')
            }
          }
        }
      }
    },
  },
  created() {
    socket.on(EVENT.CHAT_FROM_SERVER, (data) => {
      if (data.senderId === this.$store.state.user.id) {
        this.$store.dispatch('chatList/prependChat', [
          {
            ...data.data,
            ownership: 1,
          },
        ])
      } else {
        if (
          data.recipientId === this.$store.state.user.id &&
          data.senderId === this.$store.state.chatList.activeId
        ) {
          this.$store.dispatch('chatList/prependChat', [
            {
              ...data.data,
              ownership: 0,
            },
          ])
        }
      }
    })
  },
}
</script>
