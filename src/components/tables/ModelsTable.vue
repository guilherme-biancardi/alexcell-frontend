<template>
  <TableComponent :headers="MODEL_TABLE_HEADERS" :table-style="css.modelsTable">
    <template #scroll>
      <div class="table-scroll">
        <template v-for="(deviceModel, index) in modelsTable" :key="index">
          <ul class="table-body" :style="{ gridTemplateColumns: css.modelsTable }">
            <li>{{ deviceModel.brand }}</li>
            <li>{{ deviceModel.model }}</li>
            <li>{{ deviceModel.createdAt }}</li>
          </ul>
        </template>
      </div>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef, useCssModule, watch } from 'vue';
import TableComponent from '../utils/TableComponent.vue';
import type { GetModelsDeviceModelsResponse } from '@/requests/deviceModels/types';
import { getModelsDeviceModelsRequest } from '@/requests/deviceModels/request';
import { watchDebounced } from '@vueuse/core';

const css = useCssModule() as Record<'modelsTable', string>;

const MODEL_TABLE_HEADERS: string[] = ['marca', 'modelo', 'criação'] as const;
const modelsTable = shallowRef<GetModelsDeviceModelsResponse['data']>([]);

interface ModelTable {
  search: string;
  update: number;
}

const props = defineProps<ModelTable>();

const requestModel = () => {
  const getAllModels = getModelsDeviceModelsRequest({
    search: props.search,
  });

  getAllModels.execute().then((res) => {
    if (res.data) {
      modelsTable.value = res.data.data;
    }
  });
};

watch(
  computed(() => props.update),
  requestModel
);

watchDebounced(
  computed(() => props.search),
  requestModel,
  { debounce: 1000 }
);

onMounted(requestModel);
</script>

<style module>
:export {
  modelsTable: repeat(3, 1fr);
}
</style>

<style scoped></style>
