import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'

import router from './router'
import vuetify from './plugins/vuetify'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')
