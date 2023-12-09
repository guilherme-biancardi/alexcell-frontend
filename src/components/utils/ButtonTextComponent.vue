<template>
  <button
    class="button-text"
    :class="{ 'text-hover': hover }"
    :type="type"
    :style="style as string"
    :="attributes"
    @click="click"
  >
    <span><slot></slot></span>
    <IconComponent v-if="icon" :path="icon?.path" :size="icon?.size"></IconComponent>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconComponent from '../utils/IconComponent.vue'
import type { Button } from '@/ts/utils'

const props = withDefaults(defineProps<Button>(), {
  type: 'button',
  visible: true
})

const style = computed(() => {
  const styles = props.buttonStyle ?? {}

  Object.assign(styles, {
    maxWidth: `${props.maxWidth}px` ?? '100%',
    flexDirection: props.invertIcon ? 'row-reverse' : 'row',
    '--hover-background': props.hover?.backgroundColor,
    '--hover-color': props.hover?.color
  })

  return styles
})
</script>

<style scoped>
.button-text {
  padding: 6px 0;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  font-size: 1em;
  font-weight: 600;
  color: var(--primary);
}

.button-text:disabled {
  color: #888;
}

.button-text:enabled:not(.text-hover):hover {
  background-color: var(--primary);
  color: #fff;
  padding: 6px 16px;
}

.text-hover {
  --hover-background: var(--primary);
  --hover-color: #fff;
}

.text-hover:enabled:hover {
  background-color: var(--hover-background) !important;
  color: var(--hover-color) !important;
}

span {
  display: flex;
  align-items: center;
}
</style>
