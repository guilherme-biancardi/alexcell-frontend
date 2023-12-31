<template>
  <div class="app-content" :style="{ gap: `${gap}px` }">
    <div class="app-content-title">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
    </div>

    <div class="app-content-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AppContent {
  title: string;
  subtitle: string;
  gap?: number;
}

withDefaults(defineProps<AppContent>(), {
  gap: 0
});
</script>

<style scoped>
.app-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: clamp(16px, 3vh, 32px) clamp(16px, 1.5vw, 32px);
}

.app-content-title{
  display: flex;
  flex-direction: column;
  line-height: 20px;
  row-gap: 6px;
}

.app-content-title h1{
  font-weight: 700;
  font-size: 1.5em;
}

.app-content-title h2{
  font-size: 1em;
  font-weight: 500;
}

.app-content-slot {
  display: grid;
  place-items: center;
  flex-grow: 1;
}
</style>
