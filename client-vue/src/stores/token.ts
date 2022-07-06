import { defineStore } from "pinia";
import { useToken } from "@/composables/useToken";

interface ITokenStore {
  accessToken: string | null;
  refreshToken: string | null;
}


export const useTokenStore = defineStore("token", {
  state: (): ITokenStore => ({
    accessToken: "",
    refreshToken: "",
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    getTokens(accessToken: string | null, refreshToken: string | null) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
  },
});
