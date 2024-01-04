<template>
  <div v-if="isLoading">
    <TableComponent
      :headers="DEVICE_TABLE_HEADERS"
      :table-style="css.devicesTable"
      v-if="devicesCount"
    >
      <template v-for="(deviceModel, index) in devicesTable" :key="index">
        <ul
          class="table-body"
          v-for="(device, deviceIndex) in deviceModel.devices"
          :key="deviceIndex"
          :style="{ gridTemplateColumns: css.devicesTable }"
        >
          <li>{{ deviceModel.brand }}</li>
          <li>{{ deviceModel.model }}</li>
          <li>{{ device.storage }}{{ device.storageMeasure }}</li>
          <li>{{ device.quantity.toLocaleString('pt-BR') }}</li>
          <ul class="device-actions">
            <li
              v-for="(button, buttonIndex) in deviceButtons(deviceModel, device)"
              :key="buttonIndex"
            >
              <ButtonTextComponent :="button"></ButtonTextComponent>
            </li>
          </ul>
        </ul>
      </template>

      <ModalComponent
        :active="removeDeviceConfirm.active.value"
        title="Excluir Dispositivo?"
        @close="removeDeviceConfirm.closeModal"
        :width="480"
      >
        <ConfirmModal
          confirm-text="Excluir"
          title="O dispositivo será excluído permanentemente."
          @cancel="removeDeviceConfirm.closeModal"
          @confirm="deleteDevice"
        ></ConfirmModal>
      </ModalComponent>
    </TableComponent>
    
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef, useCssModule, watch, onMounted, ref } from 'vue';
import TableComponent from '../utils/TableComponent.vue';
import type {
  Device,
  DeviceModel,
  GetDevicesDeviceModelsResponse
} from '@/requests/deviceModels/types';
import { getDevicesDeviceModelsRequest } from '@/requests/deviceModels/request';
import { useCssVar, watchDebounced } from '@vueuse/core';
import { useUtil } from '@/ts/utils';
import ButtonTextComponent from '../utils/ButtonTextComponent.vue';
import { mdiPencilOutline, mdiTrashCanOutline } from '@mdi/js';
import ModalComponent from '../utils/ModalComponent.vue';
import ConfirmModal from '../modals/ConfirmModal.vue';
import { useModal } from '@/ts/modal';
import { useAppStore } from '@/stores/appStore';
import type { ApiError } from '@/requests';
import { deleteDeviceRequest, getDeviceCountRequest } from '@/requests/devices/request';
import DeviceEmptySvg from '../svg/DeviceEmptySvg.vue';

const { useButton } = useUtil();
const appStore = useAppStore();

const removeDeviceConfirm = useModal();

interface DeviceTable {
  search: string;
  update: number;
}

const props = defineProps<DeviceTable>();

const css = useCssModule() as Record<'devicesTable', string>;
const DEVICE_TABLE_HEADERS: string[] = ['marca', 'modelo', 'armazenamento', 'quantidade'] as const;

const devicesTable = shallowRef<GetDevicesDeviceModelsResponse['data']>([]);
const deviceSelected = shallowRef<number | null>(null);
const devicesCount = ref<number>(0);
const isLoading = shallowRef<boolean>(false);

const requestDevicesCount = () => {
  const getDevicesCount = getDeviceCountRequest(null);

  getDevicesCount.execute().then((res) => {
    isLoading.value = true;
    devicesCount.value = res.data.data.devicesCount;
  });
};

const requestDevice = () => {
  const getAllDevices = getDevicesDeviceModelsRequest({
    search: props.search
  });

  getAllDevices.execute().then((res) => (devicesTable.value = res.data.data));
};

const deleteDevice = () => {
  if (deviceSelected.value) {
    const deleteDevice = deleteDeviceRequest({
      id: deviceSelected.value
    });

    deleteDevice
      .execute()
      .then((res) => {
        appStore.notify({
          message: res.data.message,
          type: 'success'
        });
        devicesCount.value--;
        removeDeviceConfirm.closeModal();
      })
      .catch((err) => {
        const error = err as ApiError;

        if (error.response) {
          appStore.notify({
            message: error.response.data.message,
            type: 'error'
          });
        }
      });
  }
};

const deviceButtons = computed(() => (model: DeviceModel, device: Device) => {
  const edit = useButton('button');
  edit.setIcon({ path: mdiPencilOutline, size: 22 });
  edit.setStyle({
    padding: 0
  });
  edit.setHover({ backgroundColor: 'transparent', color: useCssVar('--primary-light').value });
  edit.setAttributes({
    title: `Editar ${model.model} - ${device.storage}${device.storageMeasure}`
  });

  const remove = useButton('button');
  remove.setIcon({ path: mdiTrashCanOutline, size: 22 });
  remove.setStyle({
    padding: 0
  });
  remove.setHover({ backgroundColor: 'transparent', color: useCssVar('--primary-light').value });
  remove.setAttributes({
    title: `Excluir ${model.model} - ${device.storage}${device.storageMeasure}`
  });
  remove.setClick(() => {
    deviceSelected.value = device.id;
    removeDeviceConfirm.showModal();
  });

  return [edit.get(), remove.get()];
});

watch(
  computed(() => props.update),
  requestDevicesCount
);

watch(devicesCount, (count) => {
  if (count > 0) requestDevice();
});

watchDebounced(
  computed(() => props.search),
  requestDevice,
  { debounce: 1000 }
);

onMounted(requestDevicesCount);
</script>

<style module>
:export {
  devicesTable: repeat(2, 1.3fr) repeat(2, 1fr) 0.4fr;
}
</style>

<style scoped>
.device-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
}

.teste {
  width: clamp(0px, 100%, 450px);
  height: 100%;
}
</style>
