import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import AttendenceList from '@/views/AttendenceList'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teacher/:teacherId',
    name: 'About',
	component: About,
	props: true
  },
  {
	path: '/group',
	name: 'AttendenceList',
	component: AttendenceList
  }
]

const router = new VueRouter({
  routes
})

export default router
