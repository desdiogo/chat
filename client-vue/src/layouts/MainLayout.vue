<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn label="Chat" :to="{ name: Route.Home }" flat dense />
        <q-toolbar-title />
        <div class="row q-gutter-x-xs">
          <q-btn label="Signup" :to="{ name: Route.Signup }" flat dense />
          <q-btn label="Signin" :to="{ name: Route.Signin }" flat dense />
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
import { Route } from "@/enums";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore, useTokenStore, useUserStore } from "@/stores";
import { useApi, useToken } from "@/composables";

const router = useRouter();
const tokens = useTokenStore();
const { me } = useApi();
const useUser = useUserStore();
const auth = useAuthStore();
const { getTokens } = useToken();

async function getUser() {
  try {
    const user = await me();
    useUser.setUser(user);
  } catch {
    await router.push({ name: Route.Signin });
    useUser.setUserDefault();
    auth.isAuthenticatedFalsy();
  }
}

onMounted(() => {
  const { accessToken, refreshToken } = getTokens();

  if (accessToken && refreshToken) {
    tokens.getTokens(accessToken, refreshToken);
    getUser();
  }
});
</script>
