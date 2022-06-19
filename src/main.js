import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css'
import './plugins/element.js'
// import 'element-ui/lib/theme-chalk/index.css'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
document.dispatchEvent(new Event('render-event'))