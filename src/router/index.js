import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '../views/Home.vue'
import PageAuth from '../views/PageAuth.vue'

const checkAuth = (to, from, next) =>{
  let isAuth = false;
  onAuthStateChanged(getAuth(), (user) =>{
    if(user && !isAuth){
      isAuth = true;
      next()
    } else if(!user && !isAuth){
      isAuth = true;
      next('/')
    }
  })
}

const routes = [
  {
    path: '/',
    name: 'auth',
    component: PageAuth
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: checkAuth
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router