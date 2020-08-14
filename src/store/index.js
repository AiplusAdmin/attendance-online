import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	currentUser : {},
	currentTeacher : {},
	subTeacher: {},
	currentGroup : {},
	groupStudents: [],
	timesFrom : ['08:00','08:45','09:15','09:30','10:15','10:45','11:00','11:45','12:15','12:30','13:30','13:45','14:30','15:00','15:15','16:00','16:45','17:30','18:15','19:00','19:45'],
	timesTo : ['00:00'],
	offices : [],
	homeworks : ['0','1','2','3','4'],
	tests : [0,1,2,3,4,5,6,7,8,9,10,11,12],
},
  mutations: {
		SET_CURRENT_USER(state,user){
			state.currentUser = user;
			window.localStorage.currentUser = JSON.stringify(user);
		},
		SET_CURRENT_GROUP(state,group){
			state.currentGroup = group;
		},
		SET_GROUP_STUDENTS(state,students){
			state.groupStudents = students;
		},
		SET_CURRENT_TEACHER(state,teacher){
			state.offices = teacher.Offices;
			state.currentTeacher = teacher;
		},
		SET_SUBTEACHER(state,teacher){
			state.subTeacher = teacher[0];
		},
		SET_TIMES_TO(state, timeFrom){
			state.timesTo = [];
			var time = timeFrom.split(':');
			var seconds = parseInt(time[0])*60+parseInt(time[1]);
			seconds+=45;
			var mm = parseInt(seconds/60);
			var ss = seconds%60==0 ? '00' : seconds%60;
			var halfLesson = mm<10? '0'+mm+':'+ss:mm+':'+ss;
			seconds+=45;
			mm = parseInt(seconds/60);
			ss = seconds%60==0 ? '00' : seconds%60;
			var fullLesson = mm<10? '0'+mm+':'+ss:mm+':'+ss;
			state.timesTo.push(halfLesson);
			state.timesTo.push(fullLesson);
		},
		SET_GROUP_DETAILS(state,params){
			state.currentGroup.isStudentAdd = params.isStudentAdd;
			state.currentGroup.isOperator = params.isOperator;
		},
		ADD_STUDENT_GROUP(state, student){
			state.groupStudents.push(student);
		},
		RESET_GROUP(state){
			state.currentGroup = {};
		},
		RESET_CURRENT_USER(state){
			state.currentUser = {};
			window.localStorage.currentUser = JSON.stringify({});
			state.currentTeacher = {};
		},
		RESET(){
		}
  },
  actions: {
	changeTimesTo({commit},timeFrom){
		commit('SET_TIMES_TO',timeFrom);
	},
	LogOut({commit}){
		commit('RESET_CURRENT_USER');
	},
	async LogIn({commit},login){
		try{
			var response  = await Api().post('/login', login);
			var user = response.data;

			commit('SET_CURRENT_USER',user);
			return user;
		}catch{
			return {error: "Ошибка"};
		}
	},
	async GetTeacherById({commit},teacherId){
		try{
			var response = await Api().post('/teachers', {teacherId});
			var teacher = response.data[0];
			commit('SET_CURRENT_TEACHER',teacher);
		}catch{
			return {error: "Ошибка"};
		}
	},
	async GetGroup({commit}, params){
		try{
			var teacherId = params.params.change ? params.subTeacher.teacherId:params.params.teacherId;
			var response = await Api().post('/groups', {params:params.params,teacherId:teacherId});
			if(response.data.status){
				var group = response.data.group;
				group.date = params.params.date;
				group.change = params.params.change;

				commit('SET_CURRENT_GROUP', group);
				return {status: true};
			} else {
				return {status: false};
			}
		}catch{
			return {error: "Ошибка"};
		}
	},
	async GetStudents({commit}, params){
		try{
			var response = await Api().post('/groupstudents', params);
			var students = response.data;

			commit('SET_GROUP_STUDENTS', students);

			return {status: true};
		}catch{
			return {error: "Ошибка"};
		}
	},
	async SetAttendence({commit}, params){
		try{
			var response = await Api().post('/registeramount',{teacherId: params.teacherId, groupId:params.group.Id,lessonDate: params.group.date});
			if(response.data){
				var pass_response = await Api().post('/setpasses',{date: params.group.date, groupId: params.group.Id, students: params.students});
				if(pass_response.status == 200 && pass_response.statusText === 'OK'){
					Api().post('/setattendence',{date: params.group.date,groupId: params.group.Id,students: params.students});
				}
			}
			commit('RESET_GROUP');

			return {status: true};
		}catch{
			return {error: "Ошибка"};
		}
	},
	async SearchTeacher({commit}, name){
		try{
			var response = await Api().get('/searchteacher', {params: {value: name}});
			commit('RESET');
			return response.data;
		}catch{
			return {error: "Ошибка"};
		}
	},
	AddStudentGroup({commit},params){
		try{
			params.students.map(async function(student){
				var result = await Api().get('/student',{params:student});
				if(result.data){
					var response = await Api().post('/addtogroup',{group: params.group, clientId: result.data});
					if(response.data.error){
						commit('ADD_STUDENT_GROUP',{attendence: true, clientid: result.data, name: student.value, status: false});
						commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: false});
					} else {
						commit('ADD_STUDENT_GROUP',{attendence: true, clientid: result.data, name: student.value, status: true});
						commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: true});
					}
				}else{
					commit('ADD_STUDENT_GROUP',{attendence: true, clientid: -1, name: student.value, status: true});
					commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: true});
				}
			});
			return {status: true};
		}catch{
			return {error: "Ошибка"};
		}
	},
	async GetTeacherByTeacherId({commit},teacherId){
		try{
			var response = await Api().get(`/teacher/${teacherId}`);
			commit('RESET');
			return response.data[0];
		}catch{
			return {error: "Ошибка"};
		}
	}
  },
  modules: {
  }
})
