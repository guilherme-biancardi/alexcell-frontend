<template>
  <div class="input-content" :style="{ '--padding-right': `${icon?.size ? icon.size * 2 : 12}px` }">
    <label :for="name" v-if="label">{{ label }}</label>
    <input
      :type="type"
      :="attributes"
      v-model="state.value"
      v-maska:[maskOptions]
      :data-maska="mask"
      :data-maska-tokens="maskTokens"
      :id="name"
      :style="inputStyle"
    />
    <IconComponent :="icon" class="input-icon" v-if="icon"></IconComponent>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import IconComponent from '../utils/IconComponent.vue';
import { vMaska } from 'maska';
import type { Input } from '@/ts/utils';

const emit = defineEmits<{
  (event: 'selectValue', val: Input['value']): void;
}>();

const props = defineProps<Input>();

type InputState = {
  value: Input['value'];
};

const state = reactive<InputState>({
  value: props.value
});

watch(
  computed(() => state.value),
  (value) => emit('selectValue', value)
);
</script>

<style scoped>
.input-content {
  --padding-right: 12px;

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-content input {
  width: 100%;
  padding: 12px;
  padding-right: var(--padding-right);
  background-color: var(--light-lightness);
  border-radius: 8px;
  border: 1px solid var(--gray-light);
  font-size: 0.95em;
  transition: all 0.2s ease;
}
.input-content input:focus-within {
  border-color: var(--primary);
}

.input-icon {
  position: absolute;
  right: 12px;
  color: var(--primary);
}
</style>
