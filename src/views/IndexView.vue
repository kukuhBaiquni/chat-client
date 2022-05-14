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
      <div
        v-if="successMessage"
        class="p-2 rounded w-[80%] text-center bg-green-200 border-green-500 border-solid border-[1px] text-green-500 mb-4"
      >
        {{ successMessage }}
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
import { login, register } from '../api/auth'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Cookies from 'js-cookie'

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
      successMessage: '',
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
        const response = await register({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        })
        if (response?.success) {
          this.successMessage = response.message
          this.errorMessage = ''
          this.form.name = ''
          this.form.email = ''
          this.form.password = ''
        } else {
          this.errorMessage = response.message
          this.successMessage = ''
        }
      } else {
        const response = await login({
          email: this.form.email,
          password: this.form.password,
        })
        if (response?.success) {
          Cookies.set('access_token', response.token)
          this.$router.push('/chat')
        } else {
          this.errorMessage = response.message
          this.successMessage = ''
        }
      }
      this.isLoading = false
    },
    toggleForm() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.isRegister = !this.isRegister
      this.errorMessage = ''
      this.successMessage = ''
      this.isLoading = false
    },
  },
  mounted() {
    console.log('PATH___', window.location.pathname)
  },
}
</script>
