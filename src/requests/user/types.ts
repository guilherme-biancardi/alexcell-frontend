export interface GetMeResponse {
  data: {
    id: number
    name: string
    email: string
  }
}

export interface SendActivationLinkRequest {
  email: string
}

export interface ForgotPasswordRequest {
  email: string
}
