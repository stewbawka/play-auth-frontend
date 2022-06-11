import { createWebHistory, createRouter } from "vue-router";
import { useAuth } from '@/modules/auth'
import Settings from "@/pages/Settings.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";

const routes = [
  { name: 'login', path: "/login", exact: true, component: Login },
  { name: 'settings', path: "/me", exact: true, component: Settings, meta: { requiresAuth: true } },
  { name: 'logout', path: "/logout", exact: true, component: Logout },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { isAuthenticating, user } = useAuth();

  if ( isAuthenticating.value === false && to.meta.requiresAuth === true && !user?.value ) {
    next({ name: 'login' });

  }
  else {
    next();
  }
});

export default router;
