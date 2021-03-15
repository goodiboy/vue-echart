import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import './assets/scss/global.scss'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = 'http://localhost:8080/api/'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
