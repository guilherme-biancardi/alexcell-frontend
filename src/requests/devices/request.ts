import { useUtil } from '@/ts/utils';
import type { RequestFactory } from '..';
import { useAppStore } from '@/stores/appStore';
import { pinia } from '@/stores';
import type { CreateDeviceRequest } from './types';

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
