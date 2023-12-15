<template>
  <NotificationsList></NotificationsList>

  <Transition name="fade">
    <Suspense>
      <main>
        <RouterView name="root"></RouterView>
      </main>
    </Suspense>
  </Transition>
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
