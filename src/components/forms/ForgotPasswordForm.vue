<template>
  <form class="forgot-password-form" @submit.prevent="onSubmit">
    <template v-for="(input, index) in state.inputs" :key="index">
      <InputComponent :="input" @select-value="(val) => (input.value = val)"></InputComponent>
    </template>
    <ButtonFilledComponent :="submitButton">{{ submitButton.text }}</ButtonFilledComponent>
  </form>
</template>

<script setup lang="ts">
import { useUtil, type Input } from '@/ts/utils'
import { mdiAt } from '@mdi/js'
import { computed, reactive } from 'vue'
import InputComponent from '../utils/InputComponent.vue'
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue'
import { forgotPasswordRequest } from '@/requests/user/request'
import { useAppStore } from '@/stores/appStore'
import { useRouter } from 'vue-router'
import type { ApiError } from '@/requests'

const { useButton, useInput } = useUtil()
const appStore = useAppStore()
const router = useRouter()

interface ForgotPasswordForm {
  inputs: Input[]
}

const inputsComputed = computed(() => {
  const email = useInput('email', 'email')
  email.setIcon({ path: mdiAt })
  email.setAttributes({ placeholder: 'E-mail:', required: true })

  return [email.get()]
})

const submitButton = computed(() => {
  const button = useButton('submit', 'Enviar')

  return button.get()
})

const state = reactive<ForgotPasswordForm>({
  inputs: inputsComputed.value
})

const onSubmit = () => {
  const [email] = state.inputs

  const request = forgotPasswordRequest({
    email: email.value as string
  })

  request
    .execute()
    .then((res) => {
      if (res.data) {
        appStore.notify({ message: res.data.message, type: 'success' })
        router.push({ name: 'signIn' })
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
.forgot-password-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
