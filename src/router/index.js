import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PageNotFound from '../views/PageNotFound.vue'
import LoginPage from "../views/Login.vue"
import UserProfile from "../views/UserProfile.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
    },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: "*",
    name: "404 Not Found",
    component: PageNotFound
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/userprofile',
    name: 'Profile Page',
    component: UserProfile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
