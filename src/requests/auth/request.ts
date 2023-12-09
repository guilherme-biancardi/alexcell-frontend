import { useUtil } from '@/ts/utils'
import type { RequestFactory } from '..'
import type { LoginRequest, LoginResponse } from './types'

const { useRequest } = useUtil()
const { request } = useRequest()

export const loginRequest: RequestFactory<LoginRequest, LoginResponse> = (params) => ({
  execute: () => request.post('auth/login', params)
})
