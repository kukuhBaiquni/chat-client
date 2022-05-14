<template>
  <main class="max-h-screen max-w-screen">
    <div
      :class="[
        'bg-gray-100 m-auto mt-[250px] rounded-md flex-center',
        'flex-col transition-all',
        'max-w-[300px] h-[200px]',
      ]"
    >
      <div class="flex-center flex-col w-[80%]">
        <template v-if="isLoading">
          <span class="text-lg mb-3">Please wait!</span>
          <pulse-loader
            v-if="true"
            :loading="true"
            :color="loader.color"
            :size="loader.size"
          ></pulse-loader>
        </template>
        <template v-else>
          <i
            v-if="isSuccess"
            class="bx bxs-check-circle text-green-600 text-6xl"
          ></i>
          <i v-else class="bx bxs-x-circle text-red-600 text-6xl"></i>
          <span class="text-center my-2">
            {{ responseMessage }}
          </span>
          <router-link
            to="/"
            class="w-[80%] py-2 rounded bg-sky-500 mb-3 text-white text-center"
          >
            Login now
          </router-link>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import { verify } from '../api/auth'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'IndexView',
  components: {
    PulseLoader,
    RouterLink,
  },
  data() {
    return {
      isSuccess: false,
      responseMessage: '',
      loader: {
        size: '12px',
        color: 'rgb(14 165 233)',
      },
      isLoading: true,
    }
  },
  methods: {
    async verifyEmail() {
      const token = this.$route.query?.token
      const response = await verify(token)
      this.responseMessage = response.message
      if (response.success) {
        this.isSuccess = true
      } else {
        this.isSuccess = false
      }
      this.isLoading = false
    },
  },
  mounted() {
    this.verifyEmail()
  },
}
</script>
