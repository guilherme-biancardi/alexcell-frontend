import { createRoute } from '@/ts/createRoute'

const signInRoute = createRoute('signIn', 'signIn')
signInRoute.setComponent(import('@/views/login/SignInView.vue'), 'login')

export { signInRoute }
