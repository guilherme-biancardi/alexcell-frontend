<template>
  <form @submit.prevent="submit">
    <template v-for="(input, index) in inputs" :key="index">
      <InputComponent :="input" @select-value="(val) => (input.value = val)"></InputComponent>
    </template>
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
import { computed, ref } from 'vue';
import InputComponent from '../utils/InputComponent.vue';
import { type Input, useUtil } from '@/ts/utils';
import ButtonFilledComponent from '../utils/ButtonFilledComponent.vue';
import { useAppStore } from '@/stores/appStore';
import { mdiCellphoneSettings, mdiDomain } from '@mdi/js';
import { createDeviceModelRequest } from '@/requests/deviceModels/request';
import type { ApiError } from '@/requests';

const appStore = useAppStore();

const { useInput } = useUtil();

const emit = defineEmits<{
  (event: 'updateDeviceView'): void;
}>();

const inputsComputed = computed(() => {
  const model = useInput('brand');
  model.setAttributes({
    placeholder: 'Modelo:',
    required: true,
    autocomplete: 'off'
  });
  model.setIcon({ path: mdiCellphoneSettings });

  const brand = useInput('model');
  brand.setAttributes({
    placeholder: 'Marca:',
    required: true,
    autocomplete: 'off'
  });
  brand.setIcon({ path: mdiDomain });

  return [model.get(), brand.get()];
});

const inputs = ref<Input[]>(inputsComputed.value);

const disableSubmit = computed(() => inputs.value.some((input) => !input.value));

const submit = () => {
  const [model, brand] = inputs.value.map((input) => input.value) as string[];

  const createModel = createDeviceModelRequest({
    brand,
    model
  });

  createModel
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
</style>
