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
	homeworks : [
			{
				text:'0',
				value: 0
			},
			{
				text: '1',
				value: 1
			},
			{
				text: '2',
				value: 2
			},
			{
				text: '3',
				value: 3
			},
			{
				text: '4',
				value: 4
			},
			{
				text: '5',
				value: 5
			},
			{
				text: '6',
				value: 6
			},
			{
				text: '7',
				value: 7
			},
			{
				text: '8',
				value: 8
			},
			{
				text: '9',
				value: 9
			},
			{
				text: '10',
				value: 10
			},
			{
				text:'Не задовали',
				value: 11
			}
		],
	tests : [{
				text:'0',
				value: 0
			},
			{
				text: '1',
				value: 1
			},
			{
				text: '2',
				value: 2
			},
			{
				text: '3',
				value: 3
			},
			{
				text: '4',
				value: 4
			},
			{
				text: '5',
				value: 5
			},
			{
				text: '6',
				value: 6
			},
			{
				text: '7',
				value: 7
			},
			{
				text: '8',
				value: 8
			},
			{
				text: '9',
				value: 9
			},
			{
				text: '10',
				value: 10
			},
			{
				text:'Не писал',
				value: 11
			},
			{
				text: 'Не писала группа',
				value: 12
			}
	],
	currentRegister: []
},
  mutations: {
		SET_CURRENT_USER(state,user){
			state.currentUser = user;
			window.localStorage.currentUser = JSON.stringify(user);
		},
		SET_CURRENT_GROUP(state,group){
			state.currentGroup = group;
			window.localStorage.currentGroup = JSON.stringify(group);
		},
		SET_GROUP_STUDENTS(state,students){
			state.groupStudents = students;
			window.localStorage.groupStudents = JSON.stringify(students);
		},
		SET_CURRENT_TEACHER(state,teacher){
			state.offices = teacher.Offices;
			state.currentTeacher = teacher;
			window.localStorage.currentTeacher = JSON.stringify(teacher);
		},
		SET_SUBTEACHER(state,teacher){
			state.subTeacher = teacher;
			window.localStorage.subTeacher = JSON.stringify(teacher);
		},
		SET_CURRENT_REGISTER(state,register){
			state.currentRegister = register;
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
			window.localStorage.officeName = "";
			window.localStorage.timeFrom = "";
			window.localStorage.timeTo = "";
			window.localStorage.groupStudents = JSON.stringify([]);
			window.localStorage.currentGroup = JSON.stringify({});
		},
		RESET_CURRENT_USER(state){
			state.currentUser = {};
			state.currentTeacher = {};
			window.localStorage.currentUser = JSON.stringify({});
			window.localStorage.officeName = "";
			window.localStorage.timeFrom = "";
			window.localStorage.timeTo = "";
			window.localStorage.groupStudents = [];
			window.localStorage.currentGroup = JSON.stringify({});
			window.localStorage.currentTeacher = JSON.stringify({});

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
			
			if(user.status == 200)
				commit('SET_CURRENT_USER',user);
			
			return user;
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetTeacherById({commit},teacherId){
		try{
			var response = await Api().post('/teachers', {teacherId});
			var teacher = response.data[0];
			commit('SET_CURRENT_TEACHER',teacher);
		}catch(err){
			commit('RESET_CURRENT_USER');
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

				if(params.params.change)
					commit('SET_SUBTEACHER', params.subTeacher);

				commit('SET_CURRENT_GROUP', group);

				return {status: true};
			} else {
				return {status: false};
			}
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetStudents({commit}, params){
		try{
			var response = await Api().post('/groupstudents', params);
			var students = response.data;

			commit('SET_GROUP_STUDENTS', students);

			return {status: true};
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SetAttendence({commit}, params){
		try{
			
			var response = await Api().post('/registeramount',{groupId:params.group.Id,lessonDate: params.group.date});
			if(response.data){
				var pass_response = await Api().post('/setpasses',{date: params.group.date, groupId: params.group.Id, students: params.students});
				
				if(pass_response.status == 200 && pass_response.statusText === 'OK'){
					var today = new Date();
					var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
					var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
					var result = await Api().post('/setattendence',{date: params.group.date,groupId: params.group.Id,students: params.students});
					var isSubmitted = result.data.status;
					Api().post('/addregister',{teacherId: params.teacherId, group: params.group, submitDay: day, submitTime: time, isSubmitted: isSubmitted, students: params.students});					
					if(isSubmitted && (params.group.change || params.group.isOperator)){
						Api().post('/sendpersonalmessage',params);
					}
				}
			} else {
				commit('RESET_GROUP');
				return {status: false, text: 'Аттенданс уже заполнен'};
			}
			commit('RESET_GROUP');

			return {status: true};
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SearchTeacher({commit}, name){
		try{
			var response = await Api().get('/searchteacher', {params: {value: name}});
			commit('RESET');
			return response.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	AddStudentGroup({commit},params){
		try{
			params.students.map(async function(student){
				var result = await Api().get('/student',{params:student});
				if(result.data){
					var response = await Api().post('/addtogroup',{group: params.group, clientId: result.data});
					if(response.data.status == 200){
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
			commit('RESET_CURRENT_USER');
		}
	},
	async GetTeacherByTeacherId({commit},teacherId){
		try{
			var response = await Api().get(`/teacher/${teacherId}`);
			commit('RESET');
			return response.data[0];
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},

	async GetRegisterByTeacherId({commit},params){
		try{
			var response = await Api().get('/getregister',{params});
			var register = response.data;
			commit('SET_CURRENT_REGISTER',register);
		}catch(err){
			return {error: err};
		}
	},
	async GetRegisterDetails({commit},params){
		try{
			var response = await Api().get('/getregisterdetails',{params});
			commit('RESET');
			return response.data;
		}catch(err){
			return {error: err};
		}
	}
  },
  modules: {
  }
})
