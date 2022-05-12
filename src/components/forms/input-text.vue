<template>
  <div class="w-full flex items-center justify-center mb-5">
    <input 
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      class="p-2 outline-none w-[80%] rounded" 
      :placeholder="placeholder"
      type="email"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    type: {
      default: 'text',
      type: String
    },
    placeholder: String,
  },
  emits: ['update:value']
}
</script>