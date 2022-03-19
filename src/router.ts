import { createWebHistory, createRouter } from "vue-router";
import Settings from "@/pages/Settings.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";

const routes = [
  { name: 'login', path: "/login", exact: true, component: Login },
  { name: 'settings', path: "/me", exact: true, component: Settings},
  { name: 'logout', path: "/logout", exact: true, component: Logout },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
