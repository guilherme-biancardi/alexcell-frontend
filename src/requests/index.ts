import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface Request<Res> {
  execute: () => Promise<AxiosResponse<Res>>
}

export type ApiError = AxiosError<{ message: string }>

type ApiResponseDefault = { message: string }

export type RequestFactory<Req, Res = ApiResponseDefault> = (
  params: Req,
  options?: AxiosRequestConfig
) => Request<Res>
