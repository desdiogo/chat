import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { LocalStorage, Route } from "@/enums";
import {useAuthStore, useTokenStore} from "@/stores";
import { useAuth } from "@/composables/useAuth";
import { LocalStorage as Storage } from "quasar";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  const { getUser } = useAuth();
  const tokens = useTokenStore();

  if (!auth.isAuthenticated) {
    const accessToken: string | null = Storage.getItem(
      LocalStorage.AccessToken
    );
    const refreshToken: string | null = Storage.getItem(
      LocalStorage.RefreshToken
    );

    if (accessToken && refreshToken) {
      await tokens.setTokens(accessToken, refreshToken);
      await getUser();
    }
  }

  if (auth.isAuthenticated && !to.meta.requireAuth) {
    next({ name: Route.Home });
  } else if (to.meta.requireAuth && !auth.isAuthenticated) {
    next({ name: Route.Signin });
  } else next();
});

export default router;
