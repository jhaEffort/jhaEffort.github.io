import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import './style/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'





Vue.use(ElementUI)
Vue.use(Vant)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')