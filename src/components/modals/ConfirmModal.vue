<template>
  <div class="confirm-content">
    <h2 v-if="title">{{ title }}</h2>

    <ul class="confirm-buttons">
      <li v-for="({ text, ...button }, index) in buttons" :key="index">
        <ButtonFilledComponent :="button">{{ text }}</ButtonFilledComponent>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUtil } from '@/ts/utils';
import { useCssVar } from '@vueuse/core';
import { computed } from 'vue';
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue';

const { useButton } = useUtil();

interface Confirm {
  title: string;
  cancelText?: string;
  confirmText?: string;
}

const props = withDefaults(defineProps<Confirm>(), {
  cancelText: 'Cancelar',
  confirmText: 'Confirmar'
});

const emit = defineEmits<{
  (event: 'confirm'): void;
  (event: 'cancel'): void;
}>();

const buttons = computed(() => {
  const cancel = useButton('button', props.cancelText);
  cancel.setStyle({
    backgroundColor: useCssVar('--gray-light').value,
    color: useCssVar('--gray-dark').value
  });
  cancel.setHover({
    backgroundColor: useCssVar('--gray-lightness').value,
    color: useCssVar('--gray-dark').value
  });
  cancel.setClick(() => emit('cancel'))

  const confirm = useButton('button', props.confirmText);
  confirm.setClick(() => emit('confirm'))

  return [cancel.get(), confirm.get()];
});
</script>

<style scoped>
.confirm-content {
  display: flex;
  flex-direction: column;
  row-gap: 28px;
}

.confirm-content h2 {
  margin-top: -12px;
  font-size: 1em;
  font-weight: 500;
}

.confirm-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.confirm-buttons button {
  padding: 10px;
  min-width: 140px;
}
</style>
