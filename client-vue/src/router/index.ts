import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { Route } from "@/enums";
import { useAuthStore } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requireAuth && !auth.isAuthenticated) {
    next({ name: Route.Signin });
  } else next();
});

export default router;
