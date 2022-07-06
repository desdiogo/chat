import { useAuthStore, useUserStore } from "@/stores";
import { useApi } from "@/composables/useApi";

export function useAuth() {
  const { useMe } = useApi();
  const useUser = useUserStore();
  const auth = useAuthStore();

  async function getUser() {
    try {
      const user = await useMe();
      useUser.setUser(user);
      auth.isAuthenticatedTruthy();
    } catch {
      useUser.setUserDefault();
      auth.isAuthenticatedFalsy();
    }
  }
  return {
    getUser,
  };
}
