import Vue from 'vue'
import VueRouter from 'vue-router'
import Costs from '../views/Costs.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Costs',
    component: Costs
  }, {
    path: '/costs',
    name: 'CostsMain',
    component: Costs
  }, {
    path: '/about',
    name: 'About',
    component: About
  }, {
    path: '/add/:section/:category',
    component: Costs
  }, {
    path: '/add/:section',
    component: Costs
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
