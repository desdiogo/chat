<template>
  <q-page class="flex column justify-center items-center">
    <q-card q-card v-if="showMessage" class="q-pa-lg" style="width: 380px">
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
import { onMounted, ref } from "vue";
import { useJwtDecode } from "@/composables/useJwtDecode";
import { Message, Route } from "@/enums";
import { notify } from "@/services";
import { useApi } from "@/composables";
import type { ConfirmEmailResponseError } from "@/types";

const route = useRoute();
const { tokenIsValid } = useJwtDecode();
const router = useRouter();
const { useConfirmEmail } = useApi();

const token = ref("");
const showMessage = ref(false);

function onClickNo() {
  router.push({ name: Route.Signup });
}

onMounted(async () => {
  token.value = route.query.token as string;

  if (!token.value) {
    return router.push({ name: Route.Signup });
  }

  if (tokenIsValid(token.value)) {
    try {
      const { message } = await useConfirmEmail(token.value);
      notify.success(message);
      router.push({ name: Route.Signin });
    } catch (err) {
      const error = err as ConfirmEmailResponseError;

      if (!error?.message) {
        return notify.warning(Message.SystemError);
      }

      showMessage.value = true;
    }
  }
});
</script>

<style scoped lang="sass"></style>
