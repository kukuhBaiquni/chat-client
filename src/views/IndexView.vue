<template>
  <main class="max-h-screen max-w-screen">
    <div class="max-w-[500px] h-[400px] bg-gray-100 m-auto mt-[150px] rounded-md flex flex-col justify-center items-center">
      <span class="text-2xl font-bold mb-[50px]">Hello there, start chat now!</span>
      <InputText v-if="isRegister" v-model:value="form.name" placeholder="Type your name" />
      <InputText v-model:value="form.email" placeholder="Type your email" />
      <InputText v-model:value="form.password" placeholder="Type password" />
      <button 
        @click="onSubmit"
        class="w-[80%] py-2 rounded bg-sky-500 mb-3 text-white"
      >
        {{isRegister ? 'Create Account' : 'Sign in'}}
      </button>
      <p v-if="isRegister">Have account? 
        <span @click="toggleForm" class="cursor-pointer text-sky-500">Login</span>
      </p>
      <p v-if="!isRegister">
        <span @click="toggleForm" class="cursor-pointer text-sky-500">Register</span>
      </p>
    </div>
  </main>
</template>

<script>
  import InputText from '../components/forms/input-text.vue';

  export default {
    name: 'IndexView',
    components: {
      InputText,
    },
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: '',
        },
        isRegister: true
      }
    },
    methods: {
      setValue(name, value) {
        this[name] = value
      },
      onSubmit() {
        console.log(this.form)
        this.$router.push('/chat')
      },
      toggleForm() {
        this.isRegister = !this.isRegister
      }
    }
  }
</script>