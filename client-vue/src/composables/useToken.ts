import { useQuasar } from "quasar";
import { LocalStorage } from "@/enums";

export function useToken() {
  const $q = useQuasar();

  function setTokens(token: string, rToken: string) {
    $q.localStorage.set(LocalStorage.AccessToken, token);
    $q.localStorage.set(LocalStorage.RefreshToken, rToken);
  }

  function getTokens() {
    const accessToken: string | null = $q.localStorage.getItem(
      LocalStorage.AccessToken
    );
    const refreshToken: string | null = $q.localStorage.getItem(
      LocalStorage.RefreshToken
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  function refreshToken() {
    const { accessToken, refreshToken } = getTokens();
    if (!accessToken || !refreshToken) {
      return;
    }
    setTokens(accessToken, refreshToken);
  }

  return {
    setTokens,
    getTokens,
  };
}
