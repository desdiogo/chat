<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn label="Chat" :to="{ name: Route.Home }" flat dense />
        <q-toolbar-title />
        <div v-if="!auth.isAuthenticated" class="row q-gutter-x-xs">
          <q-btn label="Signup" :to="{ name: Route.Signup }" flat dense />
          <q-btn label="SignIn" :to="{ name: Route.Signin }" flat dense />
        </div>
        <div v-else class="row q-gutter-x-xs">
          <q-btn label="Logout" flat dense @click="logout" />
        </div>
        <DarkModeToggle />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Message, Route } from "@/enums";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import { useAuthStore, useTokenStore } from "@/stores";
import { useApi, useToken } from "@/composables";
import { notify } from "@/services";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const { useLogout } = useApi();
const tokens = useTokenStore();
const { setTokens } = useToken();

async function logout() {
  try {
    await useLogout();
    auth.isAuthenticatedFalsy();
    tokens.setTokens("", "");
    setTokens("", "");
    await router.push({ name: Route.Signin });
    notify.success(Message.LogoutSuccess);
  } catch {
    auth.isAuthenticatedFalsy();
    tokens.setTokens("", "");
    setTokens("", "");
    await router.push({ name: Route.Signin });
    notify.success(Message.LogoutSuccess);
  }
}
</script>
