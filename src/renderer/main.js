import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios;

import App from './App'
import router from './router'
import store from './store'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// vue-partickes
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
