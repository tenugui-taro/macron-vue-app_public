import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "signIn" */ '@/views/SignIn.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/not-found',
    name: 'not-found',
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@/views/NotFound.vue'),
  },
  {
    path: '/error',
    name: 'error',
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/Error.vue'),
  },
  {
    path: '/*',
    redirect: '/not-found',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // ログインが必要なページへの遷移
    next('/sign-in');
  } else {
    // ログインが必要なければそのまま遷移
    next();
  }
});

export default router;
