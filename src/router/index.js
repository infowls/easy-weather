import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Details from '../views/Details.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
