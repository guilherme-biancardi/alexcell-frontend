import { createRoute } from '@/ts/createRoute'

const signInRoute = createRoute('sign-in', 'signIn')
signInRoute.setComponent(import('@/views/login/SignInView.vue'), 'login')

const forgotPasswordRoute = createRoute('forgot-password', 'forgotPassword')
forgotPasswordRoute.setComponent(import('@/views/login/ForgotPasswordView.vue'), 'login')

const resendActivationLinkRoute = createRoute('resend-activation-link', 'resendActivationLink')
resendActivationLinkRoute.setComponent(
  import('@/views/login/ResendActivationLinkView.vue'),
  'login'
)

const resetPasswordRoute = createRoute('reset-password/:token', 'resetPasword')
resetPasswordRoute.setComponent(import('@/views/login/ResetPasswordView.vue'), 'login')

export { signInRoute, forgotPasswordRoute, resendActivationLinkRoute, resetPasswordRoute }
