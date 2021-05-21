// @flow

import { Tag } from "main.core";
import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";
import Vuex from "vuex";
import { store } from "./store";

Vue.use(Vuex);
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

type Tutorials2Options = {
  name: string,
};

export class Tutorials2 {
  name: string;

  constructor(options: Tutorials2Options = { name: "Tutorials2" }) {
    this.name = options.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  render(): HTMLElement {
    return Tag.render`
			<div class="ui-example">
				<span class="ui-example-name">${this.getName()}</span>
			</div>
		`;
  }

  mount() {
    new Vue({
      router: Router,
      store,
      render: (h) => h(App),
    }).$mount("#example-application");
  }
}
