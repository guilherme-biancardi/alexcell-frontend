import { useUtil } from '@/ts/utils';
import type { RequestFactory } from '..';
import type { LoginRequest, LoginResponse, ResetPasswordRequest } from './types';
import { useAppStore } from '@/stores/appStore';

const { useRequest } = useUtil();
const { request } = useRequest();

export const loginRequest: RequestFactory<LoginRequest, LoginResponse> = (params) => ({
  execute: () => request.post('auth/login', params)
});

export const resetPasswordRequest: RequestFactory<ResetPasswordRequest> = (params) => ({
  execute: () => request.post('auth/reset-password', params)
});

export const logoutRequest: RequestFactory<null> = () => ({
  execute: () => {
    const appStore = useAppStore();
    const { request } = useRequest({
      Authorization: `Bearer ${appStore.getToken}`
    });

    return request.post('/auth/logout');
  }
});
