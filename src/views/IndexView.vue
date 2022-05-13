<template>
  <main class="max-h-screen max-w-screen">
    <div
      class="max-w-[500px] h-[400px] bg-gray-100 m-auto mt-[150px] rounded-md flex-center flex-col"
    >
      <span class="text-2xl font-bold mb-5">Hello there, start chat now!</span>
      <div
        v-if="errorMessage"
        class="p-2 rounded w-[80%] text-center bg-red-200 border-red-500 border-solid border-[1px] text-red-500 mb-4"
      >
        {{ errorMessage }}
      </div>
      <InputText
        v-if="isRegister"
        v-model:value="form.name"
        placeholder="Type your name"
      />
      <InputText v-model:value="form.email" placeholder="Type your email" />
      <InputText
        v-model:value="form.password"
        placeholder="Type password"
        :isPassword="true"
        type="password"
      />
      <button
        @click="onSubmit"
        :disabled="isLoading"
        class="w-[80%] py-2 rounded bg-sky-500 mb-3 text-white"
      >
        <pulse-loader
          v-if="isLoading"
          :loading="true"
          :color="loader.color"
          :size="loader.size"
          class="translate-y-1"
        ></pulse-loader>
        {{ isLoading ? '' : isRegister ? 'Create Account' : 'Sign in' }}
      </button>
      <p v-if="isRegister">
        Have account?
        <span @click="toggleForm" class="cursor-pointer text-sky-500"
          >Login</span
        >
      </p>
      <p v-if="!isRegister">
        <span @click="toggleForm" class="cursor-pointer text-sky-500"
          >Register</span
        >
      </p>
    </div>
  </main>
</template>

<script>
import InputText from '../components/forms/input-text.vue'
import { login } from '../api/auth'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'IndexView',
  components: {
    InputText,
    PulseLoader,
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
      },
      isRegister: true,
      errorMessage: '',
      loader: {
        size: '12px',
        color: '#FFFFFF',
      },
      isLoading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      if (this.isRegister) {
        console.log('oo')
      } else {
        const response = await login({
          email: this.form.email,
          password: this.form.password,
        })
        if (response?.success) {
          console.log('lool')
        } else {
          setTimeout(() => {
            this.isLoading = false
          }, 1500)
          this.errorMessage = response.message
        }
      }
      // this.$router.push('/chat')
    },
    toggleForm() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.isRegister = !this.isRegister
    },
  },
  mounted() {
    console.log('PATH___', window.location.pathname)
  },
}
</script>
