import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import { quasarConfig } from "@/plugins";

const pinia = createPinia();

import App from "./App.vue";
import router from "./router";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Quasar, quasarConfig);

app.mount("#app");
