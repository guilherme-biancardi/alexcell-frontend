import { useUtil } from '@/ts/utils';
import type { RequestFactory } from '..';
import { useAppStore } from '@/stores/appStore';
import { pinia } from '@/stores';
import type { CreateDeviceRequest, DeleteDeviceRequest, GetDevicesCountRequest } from './types';

const { useRequest } = useUtil();
const appStore = useAppStore(pinia);

export const createDeviceRequest: RequestFactory<CreateDeviceRequest> = (params) => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  });

  return {
    execute: () => request.post('devices/create', params)
  };
};

export const getDeviceCountRequest: RequestFactory<null, GetDevicesCountRequest> = () => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  });

  return {
    execute: () => request.get('devices/count')
  };
};

export const deleteDeviceRequest: RequestFactory<DeleteDeviceRequest> = (params) => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  });

  return {
    execute: () =>
      request.delete(`devices/delete`, {
        data: params
      })
  };
};
