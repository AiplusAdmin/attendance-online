import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import AttendenceList from '@/views/AttendenceList'
import Journal from '@/views/Journal'
import Statistic from '@/views/Statistic'
import AllJournal from '@/views/AllJournal'

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
  },
  {
	path: '/journal',
	name: 'Journal',
	component: Journal
  },
  {
	path: '/statistics',
	name: 'Statistic',
	component: Statistic
  },
  {
	path: '/journals',
	name: 'AllJournal',
	component: AllJournal
  }
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
