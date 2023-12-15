<template>
  <LoginContent :gap="24">
    <div class="forgot-password-text">
      <span>
        <h1>Recuperação de Senha</h1>
        <IconComponent :path="mdiFormTextboxPassword" :size="32"></IconComponent>
      </span>
      <h2>Informe seu e-mail para redefinir sua senha.</h2>
    </div>

    <ForgotPasswordForm></ForgotPasswordForm>
  </LoginContent>
</template>

<script setup lang="ts">
import LoginContent from '@/components/contents/LoginContent.vue';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue';
import IconComponent from '@/components/utils/IconComponent.vue';
import { mdiFormTextboxPassword } from '@mdi/js';
</script>

<style scoped>
.forgot-password-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.forgot-password-text span {
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: var(--primary-dark);
}

.forgot-password-text span h1 {
  font-size: 1.2em;
}

.forgot-password-text h2 {
  font-size: 0.95em;
  color: var(--gray-dark);
  font-weight: 500;
}
</style>
