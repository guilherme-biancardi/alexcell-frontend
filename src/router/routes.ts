import { createRoute } from '@/ts/createRoute'
import { forgotPasswordRoute, resendActivationLinkRoute, resetPasswordRoute, signInRoute } from './routes/loginRoutes'
import { authenticatedMiddleware } from '@/middlewares/authenticated'

const rootRoute = createRoute('/', 'root')
rootRoute.setRedirect('app')

const appRoute = createRoute('/app', 'app')
appRoute.setComponent(import('@/views/app/AppView.vue'), 'root')
appRoute.setBeforeEnter(authenticatedMiddleware)

const loginRoute = createRoute('/login', 'login')
loginRoute.setComponent(import('@/views/login/LoginView.vue'), 'root')
loginRoute.setRedirect('signIn')
loginRoute.setChildren([
  signInRoute.get(),
  forgotPasswordRoute.get(),
  resendActivationLinkRoute.get(),
  resetPasswordRoute.get()
])
loginRoute.setBeforeEnter(authenticatedMiddleware)

export const useRoutes = () => [rootRoute.get(), loginRoute.get(), appRoute.get()]
