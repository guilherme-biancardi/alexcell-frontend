<template>
  <form class="sign-in-form" @submit.prevent="onSubmit">
    <template v-for="(input, index) in state.inputs" :key="index">
      <InputComponent :="input" @select-value="(val) => (input.value = val)"></InputComponent>
    </template>
    <div class="sign-in-links">
      <RouterLink v-for="(link, index) in state.links" :key="index" :to="{ name: link.to }">
        {{ link.label }}
      </RouterLink>
    </div>
    <ButtonFilledComponent :="submitButton">{{ submitButton.text }}</ButtonFilledComponent>
  </form>
</template>

<script setup lang="ts">
import { useUtil, type Input } from '@/ts/utils';
import { mdiAt, mdiFormTextboxPassword } from '@mdi/js';
import { computed, reactive } from 'vue';
import InputComponent from '../utils/InputComponent.vue';
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue';
import { loginRequest } from '@/requests/auth/request';
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';
import type { ApiError } from '@/requests';
import type { Routes } from '@/ts/createRoute';

const { useInput, useButton } = useUtil();
const appStore = useAppStore();
const router = useRouter();

const inputsComputed = computed(() => {
  const email = useInput('email', 'email');
  email.setAttributes({ placeholder: 'E-mail:', required: true });
  email.setIcon({ path: mdiAt });

  const password = useInput('password', 'password');
  password.setAttributes({ placeholder: 'Senha:', autocomplete: 'on', required: true });
  password.setIcon({ path: mdiFormTextboxPassword });

  return [email.get(), password.get()];
});

const submitButton = computed(() => {
  const button = useButton('submit', 'Entrar');

  return button.get();
});

type SignInLink = {
  label: string;
  to: Routes;
};

interface SignInForm {
  inputs: Input[];
  links: SignInLink[];
}

const state = reactive<SignInForm>({
  inputs: inputsComputed.value,
  links: [
    {
      label: 'Esqueceu sua senha?',
      to: 'forgotPassword'
    },
    {
      label: 'Reenviar link de ativação',
      to: 'resendActivationLink'
    }
  ]
});

const onSubmit = () => {
  const [email, password] = state.inputs;

  const request = loginRequest({
    email: email.value as string,
    password: password.value as string
  });

  request
    .execute()
    .then((res) => {
      if (res.data) {
        const { data, message } = res.data;
        appStore.setToken(data.token);
        router.replace({ name: 'app' });

        appStore.notify({ message, type: 'success' });
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
.sign-in-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.sign-in-links {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.sign-in-links a {
  font-size: 0.85em;
  color: var(--primary-light);
  font-weight: 500;
}
</style>
