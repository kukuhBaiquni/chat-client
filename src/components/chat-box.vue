<template>
  <div class="w-full sm:flex flex-col hidden border-r border-b border-sky-200">
    <div :class="['bg-sky-200', idx === -1 ? 'h-[58px]' : 'h-16']"></div>
    <div
      v-if="idx === -1"
      class="h-full overflow-auto w-full flex-center py-1 flex-col"
    >
      <img src="@/assets/chat.png" class="h-[200px]" alt="chat" />
      <span class="text-gray-600 text-lg font-bold"
        >Start chat with new friends now!</span
      >
      <p class="text-xs text-gray-500">
        Click on available user, at left panel.
      </p>
    </div>
    <div
      v-else
      class="overflow-auto h-full py-1 custom-scroll flex flex-col justify-end"
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
        'h-16 bg-sky-300 mt-auto flex items-center justify-between px-2',
        'border border-sky-200',
      ]"
    >
      <input
        type="text"
        v-model="text"
        v-on:keyup.enter="sendMessage"
        placeholder="Type message"
        class="w-[90%] p-1.5 rounded bg-sky-100 text-gray-600 focus:outline-none"
      />
      <button @click="sendMessage" class="bg-sky-100 py-1 px-5 rounded">
        <i class="bx bxs-send text-sky-500 text-base"></i>
      </button>
    </div>
  </div>
</template>

<script>
import socket from '../helpers/socket'
import { EVENT } from '../constants/event'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      text: '',
      chats: [
        { ownership: 1, id: 1, text: 'lorem ipsum jancok latoz how are you?' },
        { ownership: 0, id: 2, text: 'cim seu ogah ogahan lah' },
        {
          ownership: 1,
          id: 3,
          text: 'kutang palang bong latoz dewa duck bear duit main? kutang palang bong latoz dewa duck bear duit main',
        },
        { ownership: 1, id: 4, text: 'kumsi ahh lieurr coy?' },
        {
          ownership: 0,
          id: 5,
          text: 'ngomong naoh sih wkwkwk piraku teu apal ai sia jancok queue?',
        },
        { ownership: 1, id: 6, text: 'sule prikitiw?' },
        {
          ownership: 1,
          id: 7,
          text: 'nonton bola, bawa kutang, jagolalalalalal tang wkwkwk, peribahasacokx',
        },
        { ownership: 0, id: 8, text: 'lorem ipsum jancok latoz how are you?' },
        { ownership: 0, id: 9, text: 'pongo?' },
        { ownership: 1, id: 10, text: 'lorem ipsum jancok latoz how are you?' },
      ],
    }
  },
  props: {
    idx: Number,
    conversationId: String,
  },
  mounted() {
    console.log('o|oo', this.$store.state.user)
  },
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
    },
    scrollToBottom() {
      const el = document.getElementById('box')
      if (el) {
        el.scrollTo(0, el.scrollHeight)
        el.onscroll = () => {
          console.log('ooo')
          if (el.scrollTop === 0) {
            console.log('hehe')
          }
        }
      }
    },
  },
  watch() {
    console.log('o|oo', this.$store.state.user)
  },
  created() {
    socket.on(EVENT.CHAT_FROM_SERVER, (data) => {
      console.log('RESPONSE CHAT', data)
      if (data.data.user_id === this.$store.state.user.id) {
        this.$store.dispatch('chatList/appendChat', [
          {
            ...data.data,
            ownership: 1,
          },
        ])
      } else {
        if (data.recipientId === this.$store.state.user.id) {
          this.$store.dispatch('chatList/appendChat', [
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
