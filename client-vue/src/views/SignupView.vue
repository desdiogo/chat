<template>
  <q-page class="flex column justify-center items-center">
    <q-card q-card class="q-pa-lg my-card" style="width: 380px">
      <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit">
        <q-input
          ref="nameRef"
          v-model="form.name"
          outlined
          label="Route"
          lazy-rules
          :rules="rules.name"
        />
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
        <q-input
          ref="passwordConfirmationRef"
          v-model="form.passwordConfirmation"
          outlined
          type="password"
          label="Confirm Password"
          lazy-rules
          :rules="rules.passwordConfirmation"
        />

        <div class="row justify-end">
          <q-btn
            label="Signup"
            type="submit"
            color="secondary"
            :disable="formHasError"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useApi } from "@/composables";
import type { SignupResponseError } from "@/types";
import { notify } from "@/services";
import { capitalize } from "lodash";
import { useRouter } from "vue-router";
import { Route } from "@/enums";

interface InputValidation {
  validate: () => boolean;
  hasError: boolean;
}

const { signup } = useApi();
const router = useRouter();

const form = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const nameRef = ref<InputValidation | null>(null);
const emailRef = ref<InputValidation | null>(null);
const passwordRef = ref<InputValidation | null>(null);
const passwordConfirmationRef = ref<InputValidation | null>(null);

const rules = ref({
  name: [(val: string) => (val && val.length > 0) || "Email is mandatory"],
  email: [
    (val: string) => (val && val.length > 0) || "Email is mandatory",
    (val: string) => /.+@.+\..+/.test(val) || "Invalid email",
  ],
  password: [
    (val: string) => (val && val.length > 0) || "Password is mandatory",
  ],
  passwordConfirmation: [
    (val: string) =>
      (val && val.length > 0) || "Confirmation password is mandatory",
    (val: string) => val === form.value.password || "Passwords do not match",
  ],
});

const formHasError = computed(() => {
  return (
    nameRef.value?.hasError ||
    emailRef.value?.hasError ||
    passwordRef.value?.hasError ||
    passwordConfirmationRef.value?.hasError
  );
});

async function onSubmit() {
  try {
    const response = await signup(form.value);
    await router.push({ name: Route.Signin });
    notify.success(response.message);
  } catch (err) {
    const error = err as SignupResponseError;

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
