export interface User {
  id: number;
  name: string;
  email: string;
  isOwner: boolean;
}

export interface GetMeResponse {
  data: User;
}

export interface SendActivationLinkRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}
