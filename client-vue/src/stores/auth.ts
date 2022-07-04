import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    isAuthenticatedTruthy() {
      this.isAuthenticated = true;
    },
    isAuthenticatedFalsy() {
      this.isAuthenticated = false;
    },
  },
});
