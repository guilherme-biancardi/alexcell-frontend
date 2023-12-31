<template>
  <LoginContent :gap="24">
    <div class="resend-activation-link-text">
      <span>
        <h1>Reenviar e-mail de ativação</h1>
        <IconComponent :path="mdiEmailFastOutline" :size="36"></IconComponent>
      </span>
      <h2>informe seu e-mail para o envio do link de ativação</h2>
    </div>

    <ResendActivationLinkForm></ResendActivationLinkForm>
  </LoginContent>
</template>

<script setup lang="ts">
import LoginContent from '@/components/contents/LoginContent.vue';
import ResendActivationLinkForm from '@/components/forms/ResendActivationLinkForm.vue';
import IconComponent from '@/components/utils/IconComponent.vue';
import { mdiEmailFastOutline } from '@mdi/js';
</script>

<style scoped>
.resend-activation-link-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.resend-activation-link-text span {
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: var(--primary-dark);
}

.resend-activation-link-text span h1 {
  font-size: 1.2em;
}

.resend-activation-link-text h2 {
  font-size: 0.95em;
  color: var(--gray-dark);
  font-weight: 500;
}
</style>
