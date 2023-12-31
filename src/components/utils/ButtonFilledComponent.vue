<template>
  <button
    class="button-filled"
    :class="{ 'filled-hover': hover }"
    :type="type"
    :style="style as string"
    :="attributes"
    @click="click"
  >
    <span><slot></slot></span>
    <IconComponent v-if="icon" :="icon"></IconComponent>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconComponent from '../utils/IconComponent.vue';
import type { Button } from '@/ts/utils';

const props = withDefaults(defineProps<Button>(), {
  buttonStyle() {
    return { backgroundColor: 'var(--primary)', color: '#fff' };
  },
  type: 'button'
});

const style = computed(() => {
  const styles = props.buttonStyle;

  Object.assign(styles, {
    maxWidth: `${props.maxWidth}px` ?? '100%',
    flexDirection: props.invertIcon ? 'row-reverse' : 'row',
    '--hover-background': props.hover?.backgroundColor,
    '--hover-color': props.hover?.color
  });

  return styles;
});
</script>

<style scoped>
.button-filled {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  font-size: 1em;
  font-weight: 600;
  color: #fff;
}

.button-filled:disabled {
  cursor: no-drop;
  background-color: var(--gray-light) !important;
}

.button-filled:not(.filled-hover, :disabled):hover {
  background-color: var(--primary-light) !important;
}

.filled-hover {
  --hover-background: var(--primary);
  --hover-color: #fff;
}

.filled-hover:hover:not(:disabled) {
  background-color: var(--hover-background) !important;
  color: var(--hover-color) !important;
}
</style>
