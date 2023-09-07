import Vue from 'vue'
import App from './App.vue'
import router from './router'
import directive from './directives'
import './index.css'

Vue.config.productionTip = false
const values = Object.values(directive).map(item => item)
Object.keys(directive).forEach((item, index) => {
  Vue.directive(item + '', values[index])
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
