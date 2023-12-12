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

export interface ResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}