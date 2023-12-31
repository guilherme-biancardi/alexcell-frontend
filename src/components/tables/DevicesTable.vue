<template>
  <TableComponent :headers="DEVICE_TABLE_HEADERS" :table-style="css.driversTable">
    <template v-for="(deviceModel, index) in devicesTable" :key="index">
      <ul
        class="table-body"
        v-for="(device, deviceIndex) in deviceModel.devices"
        :key="deviceIndex"
        :style="{ gridTemplateColumns: css.driversTable }"
      >
        <li>{{ deviceModel.brand }}</li>
        <li>{{ deviceModel.model }}</li>
        <li>{{ device.storage }}{{ device.storageMeasure }}</li>
        <li>{{ device.quantity.toLocaleString('pt-BR') }}</li>
      </ul>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef, useCssModule, watch } from 'vue';
import TableComponent from '../utils/TableComponent.vue';
import type { GetDevicesDeviceModelsResponse } from '@/requests/deviceModels/types';
import { getDevicesDeviceModelsRequest } from '@/requests/deviceModels/request';
import { watchDebounced } from '@vueuse/core';

interface DeviceTable {
  search: string;
  update: number;
}

const props = defineProps<DeviceTable>();

const css = useCssModule() as Record<'driversTable', string>;
const DEVICE_TABLE_HEADERS: string[] = ['marca', 'modelo', 'armazenamento', 'quantidade'] as const;

const devicesTable = shallowRef<GetDevicesDeviceModelsResponse['data']>([]);

const requestDevice = () => {
  const getAllDevices = getDevicesDeviceModelsRequest({
    search: props.search
  });

  getAllDevices.execute().then((res) => {
    if (res.data) {
      devicesTable.value = res.data.data;
    }
  });
};

watch(
  computed(() => props.update),
  requestDevice
);

watchDebounced(
  computed(() => props.search),
  requestDevice,
  { debounce: 1000 }
);

onMounted(requestDevice);
</script>

<style module>
:export {
  driversTable: repeat(4, 1fr);
}
</style>

<style scoped></style>
