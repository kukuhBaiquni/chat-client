<template>
  <div class="flex items-center">
    <div class="relative">
      <img
        :src="image"
        alt="addr"
        class="h-[40px] w-[40px] object-cover rounded-full"
      />
      <div
        :class="[
          'absolute h-3 w-3 rounded-full z-10 border-2',
          lastSeen ? 'bg-gray-500' : 'bg-green-500',
          'bottom-0 -right-1',
          border,
        ]"
      />
    </div>
    <div class="ml-2">
      <span :class="['font-bold']">{{ name }}</span>
      <p :class="['text-xs -translate-y-1 text-left']">
        {{ lastSeen ? formatTime(lastSeen) : 'Online' }}
      </p>
    </div>
  </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'

const timeAgo = new TimeAgo('en-US')
export default {
  props: {
    image: String,
    name: String,
    lastSeen: String,
    border: String,
    isActive: Boolean,
  },
  computed: {
    formatTime() {
      return (time) => timeAgo.format(new Date(time))
    },
  },
}
</script>
