<template>
  <section class="root-content" :style="styles">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

interface RootContent {
  width: number
}

const props = defineProps<RootContent>()

const styles = computed<StyleValue>(() => ({
  width: `${props.width}px`
}))
</script>

<style scoped>
.root-content {
  display: grid;
  place-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--light);
  border: 1px solid var(--gray);
  z-index: 1;
}
</style>
