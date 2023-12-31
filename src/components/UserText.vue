<template>
  <div class="user-text">
    <h1>
      Olá, <span>{{ user?.name }}</span
      >!
    </h1>
    <h2>{{ user?.email }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';

const appStore = useAppStore();
const user = computed(() => appStore.getUser);
</script>

<style scoped>
.user-text {
  position: absolute;
  top: 12px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-text h1 {
  font-size: 1em;
  font-weight: 600;
}

.user-text h1 > span{
    color: var(--primary);
    font-weight: 700;
}

.user-text h2 {
  font-size: 0.85em;
  color: var(--gray-dark);
  font-weight: 500;
}
</style>
