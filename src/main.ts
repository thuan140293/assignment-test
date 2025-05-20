import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from '@/App.vue'
import router from "@/router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css';
import '@/styles/global.scss'
import { useAuthMiddleware } from '@/middleware/auth';


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

useAuthMiddleware(router);
app.use(createPinia());
app.use(router);
app.mount("#app");