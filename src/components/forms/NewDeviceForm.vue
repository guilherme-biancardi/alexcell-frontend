<template>
  <form @submit.prevent="submit">
    <SelectComponent
      :options="selectDevicesModels"
      label="Modelo de Celular:"
      @set-value="(val) => (state.modelSelected = val)"
    ></SelectComponent>
    <div class="device-measure">
      <label for="device-storage">Armazenamento:</label>
      <fieldset name="device-storage">
        <InputComponent
          :="storageInput"
          @select-value="(val) => (storageInput.value = val)"
        ></InputComponent>
        <SelectComponent
          :default-value="false"
          :current-value="state.measureSelected"
          :options="state.measureOptions"
          @set-value="(val) => (state.measureSelected = val)"
          :select-style="{
            padding: '12px'
          }"
        ></SelectComponent>
      </fieldset>
    </div>

    <InputComponent :="quantityInput" @select-value="(val) => (quantityInput.value = val)"
      >></InputComponent
    >

    <ButtonFilledComponent
      type="submit"
      :attributes="{
        disabled: disableSubmit
      }"
      >Adicionar
    </ButtonFilledComponent>
  </form>
</template>

<script setup lang="ts">
import type { GetModelsDeviceModelsResponse } from '@/requests/deviceModels/types';
import { computed, onMounted, ref, shallowReactive, shallowRef } from 'vue';
import type { OptionSelect } from '../utils/SelectComponent.vue';
import SelectComponent from '../utils/SelectComponent.vue';
import { getModelsDeviceModelsRequest } from '@/requests/deviceModels/request';
import InputComponent from '../utils/InputComponent.vue';
import { type Input, useUtil } from '@/ts/utils';
import { mdiNumeric } from '@mdi/js';
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue';
import type { CreateDeviceRequest } from '@/requests/devices/types';
import { createDeviceRequest } from '@/requests/devices/request';
import { useAppStore } from '@/stores/appStore';
import type { ApiError } from '@/requests';

const appStore = useAppStore();

const { useInput } = useUtil();
const emit = defineEmits<{
  (event: 'updateDeviceView'): void;
}>();

const deviceModels = shallowRef<GetModelsDeviceModelsResponse['data']>([]);
const selectDevicesModels = computed<OptionSelect[]>(
  () =>
    deviceModels.value?.map(({ brand, model, id }) => ({
      text: `${brand} - ${model}`,
      value: id
    }))
);

const storageInputComputed = computed(() => {
  const input = useInput('storage');
  input.setAttributes({
    maxlength: 3,
    required: true,
    autocomplete: 'off',
    placeholder: 'ex: 32, 64, 128'
  });
  input.setMask('###');
  input.setStyle({
    maxWidth: '20ch'
  });
  return input.get();
});

const quantityInputComputed = computed(() => {
  const input = useInput('storage', 'text', '');
  input.setAttributes({
    maxlength: 8,
    required: true,
    placeholder: 'Quantidade',
    autocomplete: 'off'
  });
  input.setIcon({ path: mdiNumeric });
  input.setMaskOptions({
    preProcess: (value) => value.replace(/[^0-9]/g, ''),
    postProcess: (value) => {
      if (value === '') return value;
      return (+value).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    }
  });
  input.setStyle({
    maxWidth: '20ch'
  });

  return input.get();
});

const quantityInput = ref<Input>(quantityInputComputed.value);
const storageInput = ref<Input>(storageInputComputed.value);

const disableSubmit = computed(() =>
  [quantityInput.value.value, storageInput.value.value, state.modelSelected].some((value) => !value)
);

interface NewDeviceFormState {
  measureOptions: OptionSelect[];
  modelSelected: CreateDeviceRequest['device_model_id'];
  measureSelected: CreateDeviceRequest['storage_measure'];
}

const state = shallowReactive<NewDeviceFormState>({
  measureOptions: [
    {
      text: 'GB',
      value: 'GB'
    },
    {
      text: 'TB',
      value: 'TB'
    }
  ],
  modelSelected: -1,
  measureSelected: 'GB'
});

const submit = () => {
  const createDevice = createDeviceRequest({
    device_model_id: state.modelSelected,
    quantity: Number(quantityInput.value.value?.toString().replace(/[^0-9]/g, '')) || 0,
    storage: Number(storageInput.value.value?.toString().replace(/[^0-9]/g, '')) || 0,
    storage_measure: state.measureSelected
  });

  createDevice
    .execute()
    .then((res) => {
      if (res.data) {
        appStore.notify({ message: res.data.message, type: 'success' });
        emit('updateDeviceView');
      }
    })
    .catch((res) => {
      const error = res as ApiError;

      if (error.response) {
        appStore.notify({ message: error.response.data.message, type: 'error' });
      }
    });
};

onMounted(() => {
  const getDeviceModels = getModelsDeviceModelsRequest({
    search: ''
  });

  getDeviceModels.execute().then((res) => {
    if (res.data) {
      deviceModels.value = res.data.data;
    }
  });
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

form > button {
  margin-top: 8px;
}

.device-measure {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.device-measure label{
  font-size: 0.95em;
  color: var(--gray-dark);
}

.device-measure fieldset{
  border: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 12px;
}
</style>
