import { createWebHistory, createRouter } from "vue-router";
import Settings from "@/pages/Settings.vue";
import Login from "@/pages/Login.vue";

const routes = [
  { path: "/login", exact: true, component: Login },
  { path: "/me", exact: true, component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
