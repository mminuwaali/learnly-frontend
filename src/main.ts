import App from "./App.vue";
import stores from "./stores";
import router from "./router";
import { createApp } from "vue";

const app = createApp(App);

app.use(router);
app.use(stores);

app.mount("#app");
