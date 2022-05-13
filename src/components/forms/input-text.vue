<template>
  <div class="w-full mb-5 flex-center">
    <div class="flex w-[80%] items-center justify-between rounded">
      <input
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        class="p-2 outline-none w-full rounded"
        :placeholder="placeholder"
        :type="setType"
      />
      <button
        @click="togglePassword"
        v-if="isPassword"
        :class="[
          'px-2 py-0.5 ml-2 rounded',
          isVisible ? 'bg-white' : 'bg-sky-500',
        ]"
      >
        <i
          :class="[
            'bx bx-low-vision text-2xl',
            isVisible ? 'text-sky-500' : 'text-gray-100',
          ]"
        ></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    }
  },
  props: {
    value: String,
    isPassword: Boolean,
    type: {
      default: 'text',
      type: String,
    },
    placeholder: String,
  },
  computed: {
    setType() {
      if (this.isPassword && !this.isVisible) {
        return 'password'
      }
      return 'text'
    },
  },
  methods: {
    togglePassword() {
      this.isVisible = !this.isVisible
    },
  },
  emits: ['update:value'],
}
</script>
