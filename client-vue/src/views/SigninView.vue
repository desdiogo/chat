<template>
  <q-page class="flex column justify-center items-center">
    <q-card q-card class="q-pa-lg my-card" style="width: 380px">
      <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit">
        <q-input
          ref="emailRef"
          v-model="form.email"
          outlined
          label="Email"
          lazy-rules
          :rules="rules.email"
        />
        <q-input
          ref="passwordRef"
          v-model="form.password"
          outlined
          type="password"
          label="Password"
          lazy-rules
          :rules="rules.password"
        />
        <div class="row justify-end">
          <q-btn
            label="SignIn"
            type="submit"
            color="secondary"
            :disable="formHasError && buttonLoading"
            :loading="buttonLoading"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useApi } from "@/composables";
import { notify } from "@/services";
import { capitalize } from "lodash";
import { useRouter } from "vue-router";
import { Message, Route } from "@/enums";
import type { SigninResponseError } from "@/types";
import { useAuthStore, useTokenStore } from "@/stores";
import { useToken } from "@/composables";

interface InputValidation {
  validate: () => boolean;
  hasError: boolean;
}

const { useSignIn } = useApi();
const router = useRouter();
const auth = useAuthStore();
const tokens = useTokenStore();
const { setTokens } = useToken();

const form = ref({
  email: "",
  password: "",
});

const emailRef = ref<InputValidation | null>(null);
const passwordRef = ref<InputValidation | null>(null);

const buttonLoading = ref(false);

const rules = ref({
  email: [
    (val: string) => (val && val.length > 0) || "Email is mandatory",
    (val: string) => /.+@.+\..+/.test(val) || "Invalid email",
  ],
  password: [
    (val: string) => (val && val.length > 0) || "Password is mandatory",
  ],
});

const formHasError = computed(() => {
  return emailRef.value?.hasError || passwordRef.value?.hasError;
});

async function onSubmit() {
  try {
    buttonLoading.value = true;
    const { accessToken, refreshToken } = await useSignIn(form.value);
    auth.isAuthenticatedTruthy();
    tokens.setTokens(accessToken, refreshToken);
    setTokens(accessToken, refreshToken);
    await router.push({ name: Route.Home });
    notify.success("Login successful");
  } catch (err) {
    buttonLoading.value = false;
    const error = err as SigninResponseError;

    if (!error?.message) {
      return notify.warning(Message.SystemError);
    }

    if (typeof error.message === "string") {
      return notify.error(capitalize(error.message));
    } else {
      for (const message of error.message) {
        notify.error(capitalize(message));
      }
    }
  }
}
</script>

<style scoped></style>
