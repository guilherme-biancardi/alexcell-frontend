<template>
  <AppContent title="Dispositivos e Acessórios" subtitle="Estoque de Dispositivos e Acessórios">
    <div class="device-content">
      <header class="device-header">
        <h1>{{ getPage.title }}</h1>
        <ul class="device-buttons">
          <li v-for="(button, index) in state.pages.length" :key="index">
            <button
              @click="state.currentPage = index"
              :class="{ 'page-selected': state.currentPage === index }"
            >
              <IconComponent :path="mdiCircle" :size="22"></IconComponent>
            </button>
          </li>
        </ul>
      </header>

      <div class="device-search">
        <InputComponent
          :="searchInput"
          :attributes="{
            placeholder: getPage.placeholder
          }"
          @select-value="(val) => (searchInput.value = val)"
        ></InputComponent>
        <ButtonFilledComponent :="addNewButton">{{ addNewButton.text }}</ButtonFilledComponent>
      </div>

      <Transition name="fade">
        <Suspense>
          <Transition name="slide-x" mode="out-in">
            <KeepAlive>
              <component
                :is="getPage.component"
                :search="searchInput.value"
                :update="updateTables"
              ></component>
            </KeepAlive>
          </Transition>

          <template #fallback> loading... </template>
        </Suspense>
      </Transition>

      <ModalComponent
        :title="getPage.modal.title"
        @close="closeModal"
        :active="active"
        :width="410"
      >
        <Transition name="fade" mode="out-in">
          <component
            :is="getPage.modal.component"
            @update-device-view="updateDeviceView"
          ></component>
        </Transition>
      </ModalComponent>
    </div>
  </AppContent>
</template>

<script setup lang="ts">
import AppContent from '@/components/contents/AppContent.vue';
import ButtonFilledComponent from '@/components/utils/ButtonFilledComponent.vue';
import IconComponent from '@/components/utils/IconComponent.vue';
import InputComponent from '@/components/utils/InputComponent.vue';
import ModalComponent from '@/components/utils/ModalComponent.vue';
import { useModal } from '@/ts/modal';
import { useUtil, type Input } from '@/ts/utils';
import { mdiCircle, mdiMagnify, mdiPlus } from '@mdi/js';
import { useCssVar } from '@vueuse/core';
import { shallowReactive, type Component, markRaw, defineAsyncComponent, computed, ref } from 'vue';

const { useInput, useButton } = useUtil();
const { closeModal, showModal, active } = useModal();

const addNewButton = computed(() => {
  const button = useButton('button', 'Adicionar');
  button.setIcon({ path: mdiPlus, size: 28 });
  button.setClick(showModal);
  button.invertIcon();

  return button.get();
});

const searchInputComputed = computed(() => {
  const search = useInput('search-device');
  search.setIcon({ path: mdiMagnify });
  search.setStyle({
    backgroundColor: useCssVar('--light').value,
    maxWidth: '400px'
  });

  return search.get();
});

const searchInput = ref<Input>(searchInputComputed.value);
const updateTables = ref<number>(0);

interface DeviceViewState {
  pages: {
    title: string;
    placeholder: string;
    modal: {
      title: string;
      component: Component;
    };
    component: Component;
  }[];
  currentPage: number;
}

const state = shallowReactive<DeviceViewState>({
  pages: [
    {
      title: 'Dispositivos',
      placeholder: 'Pesquise pelo modelo ou marca',
      component: markRaw(
        defineAsyncComponent(() => import('@/components/tables/DevicesTable.vue'))
      ),
      modal: {
        title: 'Adicionar Dispositivo',
        component: markRaw(
          defineAsyncComponent(() => import('@/components/forms/NewDeviceForm.vue'))
        )
      }
    },
    {
      title: 'Modelos',
      placeholder: 'Pesquise pelo modelo ou marca',
      component: markRaw(defineAsyncComponent(() => import('@/components/tables/ModelsTable.vue'))),
      modal: {
        title: 'Adicionar Modelo',
        component: markRaw(
          defineAsyncComponent(() => import('@/components/forms/NewDeviceModelForm.vue'))
        )
      }
    }
  ],
  currentPage: 0
});

const getPage = computed(() => state.pages[state.currentPage]);

const updateDeviceView = () => {
  closeModal();
  updateTables.value++;
};
</script>

<style scoped>
.device-content {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;
}

.device-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.device-header h1 {
  font-size: 1.3em;
  font-weight: 700;
  color: var(--primary-dark);
}

.device-buttons {
  display: flex;
  align-items: center;
  column-gap: 4px;
}

.device-buttons button {
  cursor: pointer;
  transition: all 0.2s ease;
}

.device-buttons button:not(.page-selected):hover {
  color: var(--primary-light);
}

.device-buttons button:not(.page-selected) {
  color: var(--gray-lightness);
}

.page-selected {
  color: var(--primary);
}

.device-search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 12px;
}

.device-search button {
  min-width: 160px;
  font-size: 0.95em;
  padding: 8px;
}
</style>
