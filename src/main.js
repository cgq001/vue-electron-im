import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import electron from 'electron'

// 引入极光推送 Im SDK
import JIM from './assets/js/jmessage-sdk-web.2.6.0.min'

Vue.prototype.JIM = new JIM({debug:true})

// import message from './nedb/message'

// Vue.prototype.$message = message


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vuescroll from 'vuescroll';

Vue.config.productionTip = false

Vue.prototype.$electron = electron



Vue.use(vuescroll); 
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
