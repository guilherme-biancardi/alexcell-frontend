<template>
  <LoginContent :gap="24">
    <div class="reset-password-text">
      <span>
        <h1>Nova Senha</h1>
        <IconComponent :path="mdiLockOutline" :size="28"></IconComponent>
      </span>
      <h2>Defina uma nova senha para sua conta</h2>
    </div>

    <ResetPasswordForm></ResetPasswordForm>
  </LoginContent>
</template>

<script setup lang="ts">
import LoginContent from '@/components/contents/LoginContent.vue';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue';
import IconComponent from '@/components/utils/IconComponent.vue';
import { mdiLockOutline } from '@mdi/js';
</script>

<style scoped>
.reset-password-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.reset-password-text span {
  display: flex;
  align-items: center;
  column-gap: 4px;
  color: var(--primary-dark);
}

.reset-password-text span h1 {
  font-size: 1.2em;
}

.reset-password-text h2 {
  font-size: 0.95em;
  color: var(--gray-dark);
  font-weight: 500;
}
</style>
