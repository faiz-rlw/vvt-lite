import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import 'virtual:windi.css'

import 'ant-design-vue/dist/antd.css';

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' 
dayjs.locale('zh-cn') 

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
