import { useUtil } from '@/ts/utils'
import type { RequestFactory } from '..'
import type { GetMeResponse } from './types'
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
