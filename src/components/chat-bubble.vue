<template>
  <div class="max-w-[70%] bg-purple-400 mb-3 p-3">
    {{num}}
  </div>
</template>

<script>
  export default {
    props: {
      num: Number,
    }
  }
</script>