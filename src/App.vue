<template>
  <NotificationsList></NotificationsList>
  <main>
    <RouterView name="root"></RouterView>
  </main>
</template>

<script setup lang="ts">
import NotificationsList from './components/NotificationsList.vue';
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--light-medium);
}
</style>
