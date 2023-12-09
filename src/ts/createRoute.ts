import type { RouteRecordRaw } from 'vue-router'

type RouterKeys = keyof RouteRecordRaw

type LoginRoutes = 'login' | 'signIn'
type AppRoutes = 'app'
type Routes = 'root' | LoginRoutes | AppRoutes

type RouterViews = 'root' | 'login'

export const createRoute = (path: string, name: Routes) => {
  const route: Map<RouterKeys, RouteRecordRaw[RouterKeys]> = new Map()

  route.set('path', path)
  route.set('name', name)

  const setComponent = (component: Promise<unknown>, routerView: RouterViews) => {
    route.set('components', {
      [routerView]: () => component
    })
  }

  const setRedirect = (name: Routes) => route.set('redirect', { name })

  const setBeforeEnter = (callback: RouteRecordRaw['beforeEnter']) =>
    route.set('beforeEnter', callback)

  const setChildren = (children: RouteRecordRaw['children'] = []) => route.set('children', children)

  return {
    setComponent,
    setRedirect,
    setBeforeEnter,
    setChildren,
    get: () => Object.fromEntries(route) as unknown as RouteRecordRaw
  }
}
