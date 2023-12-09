export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  data: {
    token: string
  }
  message: string
}
