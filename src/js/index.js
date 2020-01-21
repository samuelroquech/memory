import '../css/style.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import router from './router.js'

console.log('[i] Starting client app')

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

