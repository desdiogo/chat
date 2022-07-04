<template>
  <q-page></q-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useApi, useToken } from "@/composables";
import { useAuthStore, useTokenStore } from "@/stores";
import { useRouter } from "vue-router";
import { Route, Time } from "@/enums";

const token = useTokenStore();
const auth = useAuthStore();
const { postRefreshToken } = useApi();
const { setTokens } = useToken();
const router = useRouter();

onMounted(() => {
  setInterval(async () => {
    try {
      const { accessToken, refreshToken } = await postRefreshToken();
      token.setTokens(accessToken, refreshToken);
      setTokens(accessToken, refreshToken);
    } catch {
      token.setTokens("", "");
      setTokens("", "");
      auth.isAuthenticatedFalsy();
      router.push({ name: Route.Signin });
    }
  }, Time.Hour);
});
</script>
