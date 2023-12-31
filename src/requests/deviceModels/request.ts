import { useUtil } from '@/ts/utils';
import type { RequestFactory } from '..';
import { useAppStore } from '@/stores/appStore';
import { pinia } from '@/stores';
import type {
  CreateDeviceModelRequest,
  GetDeviceModelsRequest,
  GetDevicesDeviceModelsResponse,
  GetModelsDeviceModelsResponse
} from './types';

const { useRequest } = useUtil();
const appStore = useAppStore(pinia);

export const getDevicesDeviceModelsRequest: RequestFactory<
  GetDeviceModelsRequest,
  GetDevicesDeviceModelsResponse
> = (params) => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  });

  return {
    execute: () => request.get('device-models/devices', { params })
  };
};

export const getModelsDeviceModelsRequest: RequestFactory<
  GetDeviceModelsRequest,
  GetModelsDeviceModelsResponse
> = (params) => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  });

  return {
    execute: () => request.get('device-models/models', { params })
  };
};

export const createDeviceModelRequest: RequestFactory<CreateDeviceModelRequest> = (params) => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  });

  return {
    execute: () => request.post('device-models/create', params)
  };
};
