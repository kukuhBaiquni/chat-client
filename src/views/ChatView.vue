<template>
  <ChatUI />
</template>

<script>
import ChatUI from '../components/chat-ui.vue'

export default {
  data() {
    return {
      user: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  components: {
    ChatUI,
  },
}
</script>
