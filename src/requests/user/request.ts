import { useUtil } from '@/ts/utils'
import type { RequestFactory } from '..'
import type { ForgotPasswordRequest, GetMeResponse, SendActivationLinkRequest } from './types'
import { useAppStore } from '@/stores/appStore'
import { pinia } from '@/stores'

const { useRequest } = useUtil()
const appStore = useAppStore(pinia)

export const getMeRequest: RequestFactory<null, GetMeResponse> = () => {
  const { request } = useRequest({
    Authorization: `Bearer ${appStore.getToken}`
  })

  return {
    execute: () => request.get('user/me')
  }
}

export const sendActivationLinkRequest: RequestFactory<SendActivationLinkRequest> = (params) => {
  const { request } = useRequest()

  return {
    execute: () => request.post('user/send-activation-link', params)
  }
}

export const forgotPasswordRequest: RequestFactory<ForgotPasswordRequest> = (params) => {
  const { request } = useRequest()

  return {
    execute: () => request.post('user/forgot-password', params)
  }
}
