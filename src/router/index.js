import Vue from 'vue'
import Router from 'vue-router'
import Music from "../views/music"
import More from "../views/more"


Vue.use(Router)

export default new Router({
  routes: [
		{ path: '/music',name: 'music',component: Music},
		{ path: '/more',name: 'more',component: More},
		{ path:'*',redirect:'/music'}
  ]
})
