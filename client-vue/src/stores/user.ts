import { defineStore } from "pinia";

interface IUserStore {
  id: string;
  email: string;
  name: string;
  emailVerifiedAt: Date | null;
}

export const useUserStore = defineStore("user", {
  state: (): IUserStore => ({
    id: "",
    email: "",
    name: "",
    emailVerifiedAt: null,
  }),
  actions: {
    setUser(user: IUserStore) {
      this.id = user.id;
      this.email = user.email;
      this.name = user.name;
      this.emailVerifiedAt = user.emailVerifiedAt;
    },
    setUserDefault() {
      this.id = "";
      this.email = "";
      this.name = "";
      this.emailVerifiedAt = null;
    },
  },
});
