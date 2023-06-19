import { createApp } from 'vue'
import './style.css'
import App from './views/App.vue'
import router from './router'
import { store } from "./store";
import VueTheMask from "vue-the-mask"
import vuesax from "vuesax-alpha";
import vClickOutside from "click-outside-vue3";
const app = createApp(App);

import 'vuesax-alpha/dist/index.css'
// vuesax darkmode
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'

app.use(router);
app.use(store);
app.use(VueTheMask);
app.use(vuesax);
app.use(vClickOutside);
app.mount("#app");
