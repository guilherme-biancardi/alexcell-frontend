<template>
  <article class="sign-in-content">
    <h1>Bem-vindo a <span>AlexCell</span></h1>
    <SignInForm></SignInForm>
  </article>
</template>

<script setup lang="ts">
import SignInForm from '@/components/forms/SignInForm.vue'
</script>

<style scoped>
.sign-in-content{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
}

.sign-in-content h1{
  font-size: 1.5em;
  font-weight: 500;
}

.sign-in-content h1 span{
  color: var(--primary-light);
  font-style: italic;
  font-weight: 700;
}
</style>
