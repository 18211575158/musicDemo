import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuex from "vuex"
import 'swiper/dist/css/swiper.css' 
import axios from 'axios'
import VueAxios from 'vue-axios'
import directive from "./plugins/directives.js"
import {storeObj} from "./vuex/index"
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./static/img/error.png',
    loading:'./static/img/loading.gif'
})
Vue.use(directive)
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.config.productionTip = false
const store = new Vuex.Store(storeObj);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
