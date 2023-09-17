import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product.list',
    component: () => import('../views/products/List.vue')
  },
  {
    path: '/product/create',
    name: 'product.form',
    component: () => import('../views/products/Form.vue')
  },
  {
    path: '/product/edit/:id',
    name: 'product.edit',
    component: () => import('../views/products/Form.vue')
  },
  {
    path: '/user',
    name: 'user.list',
    component: () => import('../views/users/List.vue')
  },
  {
    path: '/user/create',
    name: 'user.form',
    component: () => import('../views/users/Form.vue')
  },
  {
    path: '/user/create/:id',
    name: 'user.edit',
    component: () => import('../views/users/Form.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.auth.token && (to.name.indexOf("edit") != -1 || to.name.indexOf("form") != -1)){
    // Reject if access edit and update, create feature but not login
    store.state.auth.message = "You must login first!"
    return next("/")
  } 
  if (from.name == "home") store.state.auth.message = ""
  return next()
})

export default router
