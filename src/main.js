import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";
import { store } from "./store";

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

const app = new Vue({
  router: Router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");
