
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import Change from '@/views/Change'
import AttendenceList from '@/views/AttendenceList'
import Journal from '@/views/Journal'
import Statistic from '@/views/Statistic'
import AllJournal from '@/views/AllJournal'
import PersonalTest from '@/views/PersonalTest'
import AdminBot from '@/views/AdminBot'
import AdminTeachers from '@/views/admin/AdminTeachers'
import AdminStudents from '@/views/admin/AdminStudents'
import AdminTopics from '@/views/admin/AdminTopics'
import AdminSchools from '@/views/admin/AdminSchools'
import AdminRooms from '@/views/admin/AdminRooms'
import AdminSubjects from '@/views/admin/AdminSubjects'

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
	props: true,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/change',
    name: 'Change',
	component: Change,
	props: true,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/group',
	name: 'AttendenceList',
	component: AttendenceList,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/journal',
	name: 'Journal',
	component: Journal,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/statistics',
	name: 'Statistic',
	component: Statistic,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/journals',
	name: 'AllJournal',
	component: AllJournal,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/tests',
	name: 'PersonalTest',
	component: PersonalTest,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/telegram',
	name: 'AdminBot',
	component: AdminBot,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/admin/teachers',
	name: 'AdminTeachers',
	component: AdminTeachers,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/admin/students',
	name: 'AdminStudents',
	component: AdminStudents,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/admin/topics',
	name: 'AdminTopics',
	component: AdminTopics,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/admin/schools',
	name: 'AdminSchools',
	component: AdminSchools,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/admin/rooms',
	name: 'AdminRooms',
	component: AdminRooms,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  },
  {
	path: '/admin/subjects',
	name: 'AdminSubjects',
	component: AdminSubjects,
	beforeEnter(to,from,next){
		var currentUser  = JSON.parse(window.localStorage.currentUser);
		if(currentUser && currentUser.exp > Date.now()){
			next();
		} else {
			window.localStorage.currentUser = JSON.stringify({});
			next("/");
		}
	}
  }
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
