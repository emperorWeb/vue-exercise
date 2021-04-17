import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/common/common.scss'

import './assets/ignoreRem/rem.scss'
import './plugins/axios.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
