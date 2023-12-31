<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal-backdrop" v-if="active">
        <div
          class="modal-content"
          :style="{ width: `${width}px` }"
          :class="{ 'full-modal': fullModal }"
        >
          <header>
            <h1>{{ title }}</h1>
            <button @click="emit('close')">
              <IconComponent :path="mdiWindowClose" :size="32"></IconComponent>
            </button>
          </header>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { mdiWindowClose } from '@mdi/js';
import IconComponent from './IconComponent.vue';
import { useMediaQuery } from '@vueuse/core';

interface Modal {
  title: string;
  active: boolean;
  width?: number;
}

const props = withDefaults(defineProps<Modal>(), {
  width: 524
});

const fullModal = useMediaQuery(`(max-width: ${props.width}px)`);

const emit = defineEmits<{
  (event: 'close'): void;
}>();
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  display: grid;
  place-items: center;
  inset: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.12);
  z-index: 1;
}

.modal-content {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  background-color: var(--light);
  padding: 20px;
  padding-top: 16px;
  border-radius: 8px;
  border: 1px solid var(--gray-lightness);
  box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.05);
}

.modal-content header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-content header > h1 {
  font-size: 1.4em;
  color: var(--primary-dark);
}

.modal-content header > button{
    color: var(--primary);
}

.full-modal {
  width: 100% !important;
  height: 100vh;
}
</style>
