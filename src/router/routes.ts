import { createRoute } from '@/ts/createRoute'
import { signInRoute } from './routes/loginRoutes'

const rootRoute = createRoute('/', 'root')
rootRoute.setRedirect('login')

const loginRoute = createRoute('/login', 'login')
loginRoute.setComponent(import('@/views/login/LoginView.vue'), 'root')
loginRoute.setRedirect('signIn')
loginRoute.setChildren([signInRoute.get()])

export const useRoutes = () => [rootRoute.get(), loginRoute.get()]
