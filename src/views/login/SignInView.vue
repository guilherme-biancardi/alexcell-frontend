<template>
  <article class="sign-in-content">
    <div class="sign-in-text">
      <h1>Bem-vindo a <span>AlexCell</span></h1>
      <h2>Gerencie celulares e acessórios com facilidade!</h2>
    </div>
    <SignInForm></SignInForm>
  </article>
</template>

<script setup lang="ts">
import SignInForm from '@/components/forms/SignInForm.vue';
</script>

<style scoped>
.sign-in-content,
.sign-in-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sign-in-content {
  row-gap: 16px;
}

.sign-in-text {
  margin-bottom: 14px;
}

.sign-in-text h1 {
  font-size: 1.5em;
  font-weight: 500;
}

.sign-in-text h1 span {
  color: var(--primary-light);
  font-style: italic;
  font-weight: 700;
}

.sign-in-text h2 {
  font-weight: 400;
  font-size: 1em;
  color: var(--gray-dark);
}
</style>
