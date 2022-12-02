import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/css/reset.css"
import "@/assets/js/flexible.js"


Vue.config.productionTip = false

// 引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入表格生成
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
