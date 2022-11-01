import { createApp } from "vue";
import App from "./APPw.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import i18n from "./plugins/i18n";
import "../src/assets/scss/custom.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(i18n)

  .mount("#app");
