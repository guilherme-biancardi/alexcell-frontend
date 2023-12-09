import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface Request<Res> {
  execute: () => Promise<AxiosResponse<Res>>
}

export type ApiError = AxiosError<{ message: string }>

export type RequestFactory<Req, Res> = (params: Req, options?: AxiosRequestConfig) => Request<Res>
