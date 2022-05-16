<template>
  <div class="overflow-y-auto h-[calc(90%+3px)] custom-scroll p-2">
    <button
      v-for="(user, index) in $store.state.userList.data"
      :class="[
        'p-2 flex items-center mb-1 rounded w-full',
        idx === index ? 'bg-sky-300' : 'bg-gray-400',
      ]"
      :key="user.id"
      @click="getUserChat(index)"
    >
      <ImageStatus
        :name="user.name"
        :image="user.image"
        :lastSeen="user.last_seen"
        :isActive="idx === index"
        :border="idx === index ? 'border-sky-300' : 'border-gray-200'"
      />
    </button>
  </div>
</template>

<script>
import { getChat } from '../api/chat'
import Cookies from 'js-cookie'
import ImageStatus from './image-status.vue'

export default {
  props: {
    idx: Number,
    setIdx: Function,
  },
  components: {
    ImageStatus,
  },
  methods: {
    async getUserChat(index) {
      const token = Cookies.get('access_token')
      if (
        this.$store.state.chatList.activeId ===
        this.$store.state.userList.data[index].id
      ) {
        return
      }
      const response = await getChat({
        senderId: this.$store.state.user.id,
        recipientId: this.$store.state.userList.data[index].id,
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
        this.$store.dispatch(
          'chatList/setActiveId',
          this.$store.state.userList.data[index].id
        )
        this.$store.dispatch('chatList/setInitialChat', {
          data: mapOwnership,
          totalData: response.totalData,
        })
      } else {
        this.showErrorAlert = true
      }

      this.$props.setIdx(index)
    },
  },
}
</script>
