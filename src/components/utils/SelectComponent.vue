<template>
  <div class="select-content">
    <label for="select" v-if="label?.length">{{ label }}</label>

    <select
      v-model="state.value"
      :style="{ backgroundImage: backgroudIcon, ...selectStyle }"
      id="select"
    >
      <option :value="null" :disabled="defaultDisabled" v-if="defaultValue">
        {{ defaultLabel }}
      </option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, type CSSProperties } from 'vue';
import { useCssVar } from '@vueuse/core';
import { mdiMenuDown } from '@mdi/js';
import type { Icon } from './IconComponent.vue';

export type OptionSelect = {
  text: string;
  value: string | number | undefined;
};

export interface Select {
  options: OptionSelect[];
  currentValue?: string | number | null;
  icon?: Icon;
  defaultValue?: boolean;
  defaultLabel?: string;
  defaultDisabled?: boolean;
  label?: string;
  selectStyle?: CSSProperties;
}

const color = computed(() => {
  const cssVar = useCssVar('--primary');

  return cssVar.value.replace('#', '%23');
});

const props = withDefaults(defineProps<Select>(), {
  currentValue: null,
  defaultValue: true,
  defaultLabel: 'Selecione:',
  defaultDisabled: true,
  icon() {
    return { path: mdiMenuDown, size: 28 };
  }
});
const emit = defineEmits(['setValue']);

const backgroudIcon = computed(() => {
  if (props.icon) {
    return `url("data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' width='${
      props.icon.size || 24
    }' height='${props.icon.size}' xmlns='http://www.w3.org/2000/svg'><g><path d='${
      props.icon.path
    }' fill='${color.value}'/></g></svg>")`;
  }

  return '';
});

const state = reactive({
  value: props.currentValue
});

watch(
  computed(() => state.value),
  (val) => emit('setValue', val)
);

watch(
  computed(() => props.currentValue),
  (val) => (state.value = val)
);
</script>

<style scoped>
.select-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 8px;
}

.select-content > label {
  font-size: 0.95em;
  font-weight: 500;
  color: var(--gray-dark);
}

.select-content select {
  all: unset;
  background-color: var(--light-lightness);
  padding: 8px 12px;
  padding-right: 32px;
  min-width: 16ch;
  border-radius: 8px;
  border: 1px solid var(--light-darkness);
  font-size: 0.95em;
  background-repeat: no-repeat;
  background-position: calc(100% - 8px);
}
</style>
