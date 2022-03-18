import { createWebHistory, createRouter } from "vue-router";
import Settings from "@/pages/Settings.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";
import { useStore } from '@/store';

const routes = [
  { name: 'login', path: "/login", exact: true, component: Login },
  { name: 'settings', path: "/me", exact: true, component: Settings, meta: { requiresAuth: true }},
  { name: 'logout', path: "/logout", exact: true, component: Logout },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  const { meta } = to;
  if (meta.requiresAuth) {
    const { session } = useStore();
    if (!session || !session.value.user) {
      return { name: 'login', query: { next: to.path }}
    }
  }
});

export default router;
