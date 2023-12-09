<template>
  <form class="sign-in-form" @submit.prevent="onSubmit">
    <template v-for="(input, index) in state.inputs" :key="index">
      <InputComponent :="input" @select-value="(val) => (input.value = val)"></InputComponent>
    </template>
    <ButtonFilledComponent :="submitButton">{{ submitButton.text }}</ButtonFilledComponent>
  </form>
</template>

<script setup lang="ts">
import { useUtil } from '@/ts/utils'
import { mdiAt, mdiFormTextboxPassword } from '@mdi/js'
import { computed, reactive } from 'vue'
import InputComponent from '../utils/InputComponent.vue'
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue'
import { loginRequest } from '@/requests/auth/request'
import { useAppStore } from '@/stores/appStore'
import { useRouter } from 'vue-router'
import type { AxiosError } from 'node_modules/axios/index.cjs'
import type { ApiError } from '@/requests'

const { useInput, useButton } = useUtil()
const appStore = useAppStore()
const router = useRouter()

const inputsComputed = computed(() => {
  const email = useInput('email', 'email')
  email.setAttributes({ placeholder: 'E-mail:', required: true })
  email.setIcon({ path: mdiAt })

  const password = useInput('password', 'password')
  password.setAttributes({ placeholder: 'Senha:', autocomplete: 'on', required: true })
  password.setIcon({ path: mdiFormTextboxPassword })

  return [email.get(), password.get()]
})

const submitButton = computed(() => {
  const button = useButton('submit', 'Entrar')

  return button.get()
})

const state = reactive({
  inputs: inputsComputed.value
})

const onSubmit = () => {
  const [email, password] = state.inputs

  const request = loginRequest({
    email: email.value as string,
    password: password.value as string
  })

  request
    .execute()
    .then((res) => {
      if (res.data) {
        const { data, message } = res.data
        appStore.setToken(data.token)
        router.replace({ name: 'app' })

        appStore.notify({ message, type: 'success' })
      }
    })
    .catch((res) => {
      const error = res as ApiError

      if (error.response) {
        appStore.notify({ message: error.response.data.message, type: 'error' })
      }
    })
}
</script>

<style scoped>
.sign-in-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
</style>
