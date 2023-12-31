import { adminMiddleware } from '@/middlewares/admin';
import { createRoute } from '@/ts/createRoute';

const adminRoute = createRoute('admin', 'admin');
adminRoute.setComponent(import('@/views/app/AdminView.vue'), 'app');
adminRoute.setBeforeEnter(adminMiddleware);

const devicesRoute = createRoute('devices', 'devices');
devicesRoute.setComponent(import('@/views/app/DevicesView.vue'), 'app');

export { adminRoute, devicesRoute };
