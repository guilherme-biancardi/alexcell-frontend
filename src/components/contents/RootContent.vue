<template>
  <section class="root-content" :style="styles" :class="{ full: fullContent }">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { computed, type StyleValue } from 'vue';

interface RootContent {
  width: number;
}

const props = defineProps<RootContent>();

const fullContent = useMediaQuery(`(max-width: ${props.width}px)`);

const styles = computed<StyleValue>(() => ({
  width: fullContent.value ? '100vw' : `${props.width}px`
}));
</script>

<style scoped>
.root-content {
  display: grid;
  place-items: center;
  padding: 24px;
  border-radius: 8px;
  background-color: var(--light);
  border: 1px solid var(--gray-light);
  z-index: 1;
  box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.05);
}

.full {
  height: 100vh;
  border-radius: 0;
}
</style>
