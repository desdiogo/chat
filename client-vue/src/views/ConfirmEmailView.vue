<template>
  <q-page class="flex column justify-center items-center">
    <q-card q-card class="q-pa-lg" style="width: 380px">
      <q-card-section>
        <p class="text-justify text-h6">
          Expired token, would you like to send a new confirmation email?
        </p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn padding="md" color="positive">Yes</q-btn>
        <q-btn padding="md" color="negative" @click="onClickNo">No</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useJwtDecode } from "@/composables/useJwtDecode";
import {Message, Route} from "@/enums";
import { notify } from "@/services";
import { useApi } from "@/composables";
import { capitalize } from "lodash";
import type { ConfirmEmailResponseError } from "@/types";

const route = useRoute();
const { tokenIsValid } = useJwtDecode();
const router = useRouter();
const { confirmEmail } = useApi();

function onClickNo() {
  router.push({ name: Route.Signup });
}

onMounted(async () => {
  const token = route.query.token as string;

  if (!token) {
    return router.push({ name: Route.Signup });
  }

  if (tokenIsValid(token)) {
    try {
      const { message } = await confirmEmail(token);
      notify.success(message);
      router.push({ name: Route.Signin });
    } catch (err) {
      const error = err as ConfirmEmailResponseError;

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

      router.push({ name: Route.Signin });
    }
  }
});
</script>

<style scoped lang="sass"></style>
