import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import router from './route';


Vue.config.productionTip = false;

new Vue({
  store, router,
  render: function (h) { return h(App) }
}).$mount('#app');
