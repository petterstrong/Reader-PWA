import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/components/Home'
const Item = () => import('../pages/Viewer.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      root: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Home,
    meta: {
      root: true
    }
  },
  {
    path: '/item/:aid',
    name: 'item',
    component: Item
  }
]

const router = new Router({
  routes,
  linkExactActiveClass: 'router-active'
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
