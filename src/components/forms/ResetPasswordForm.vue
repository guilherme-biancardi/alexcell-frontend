<template>
  <form class="reset-password-form" @submit.prevent="onSubmit">
    <template v-for="(input, index) in state.inputs" :key="index">
      <InputComponent :="input" @select-value="(val) => (input.value = val)"></InputComponent>
    </template>
    <ButtonFilledComponent :="submitButton">{{ submitButton.text }}</ButtonFilledComponent>
  </form>
</template>

<script setup lang="ts">
import { useUtil, type Input } from '@/ts/utils';
import { mdiAt, mdiLockCheckOutline, mdiLockPlus, mdiLockPlusOutline } from '@mdi/js';
import { computed, reactive } from 'vue';
import InputComponent from '../utils/InputComponent.vue';
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue';
import { forgotPasswordRequest } from '@/requests/user/request';
import { useAppStore } from '@/stores/appStore';
import { useRoute, useRouter } from 'vue-router';
import type { ApiError } from '@/requests';
import { resetPasswordRequest } from '@/requests/auth/request';

const { useButton, useInput } = useUtil();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

type RouteParams = {
  token: string;
};

interface ForgotPasswordForm {
  inputs: Input[];
}

const inputsComputed = computed(() => {
  const email = useInput('email', 'email');
  email.setIcon({ path: mdiAt });
  email.setAttributes({ placeholder: 'E-mail:', required: true });

  const password = useInput('password', 'password');
  password.setAttributes({ placeholder: 'Nova Senha:', required: true });
  password.setIcon({ path: mdiLockPlusOutline });

  const passwordConfirmation = useInput('passwordConfirmation', 'password');
  passwordConfirmation.setAttributes({ placeholder: 'Confirmação de Senha:', required: true });
  passwordConfirmation.setIcon({ path: mdiLockCheckOutline });

  return [email.get(), password.get(), passwordConfirmation.get()];
});

const submitButton = computed(() => {
  const button = useButton('submit', 'Enviar');

  return button.get();
});

const state = reactive<ForgotPasswordForm>({
  inputs: inputsComputed.value
});

const onSubmit = () => {
  const [email, password, passwordConfirmation] = state.inputs;

  const routeParams = route.params as RouteParams;

  const request = resetPasswordRequest({
    email: email.value as string,
    password: password.value as string,
    password_confirmation: passwordConfirmation.value as string,
    token: routeParams.token
  });

  request
    .execute()
    .then((res) => {
      if (res.data) {
        appStore.notify({ message: res.data.message, type: 'success' });
        router.push({ name: 'signIn' });
      }
    })
    .catch((res) => {
      const error = res as ApiError;

      if (error.response) {
        appStore.notify({ message: error.response.data.message, type: 'error' });
      }
    });
};
</script>

<style scoped>
.reset-password-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
