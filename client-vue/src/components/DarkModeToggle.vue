<template>
  <q-toggle
    v-model="isDarkMode"
    checked-icon="dark_mode"
    color="dark"
    unchecked-icon="light_mode"
    size="lg"
    @update:model-value="toggleDarkMode"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { LocalStorage } from "@/enums";

const $q = useQuasar();

const isDarkMode = ref(false);

function toggleDarkMode() {
  $q.dark.toggle();
  $q.localStorage.set(LocalStorage.IsDarkMode, isDarkMode.value);
}

onMounted(() => {
  const isDarkModeFromStorage = $q.localStorage.getItem(
    LocalStorage.IsDarkMode
  );
  if (isDarkModeFromStorage !== null) {
    isDarkMode.value = isDarkModeFromStorage as boolean;
    $q.dark.set(isDarkMode.value);
  }
});
</script>
