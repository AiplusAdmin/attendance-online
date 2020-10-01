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
	timesFrom : ['08:00','08:45','09:15','09:30','10:15','10:45','11:00','11:45','12:15','12:30','12:45','13:30','13:45','14:30','15:00','15:15','16:00','16:45','17:30','18:15','19:00','19:45'],
	timesTo : ['00:00'],
	offices : [],
	equal: true,
	suboffices : [],
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
				text:'Не задавали',
				value: 11
			}
		],
	comments:[
		{
			value: 'A1',
			text: 'Ребенок не учит формулы.'
		},
		{
			value: 'A2',
			text: 'Малекькая скорость решения задач (Ребенку отправят дополнительное задание)'
		},
		{
			value: 'A3',
			text: 'Не понимает смысл текстов, потому что не учит слова (Ребенку отправят список литературы для чтения)'
		},
		{
			value: 'A4',
			text: 'Хорошо понимает пройденную тему, делает домашнее задание, но плохо пишет тест.'
		},
		{
			value: 'A5',
			text: 'Слабое абстрактное мышление (слабое критическое мышление).'
		},
		{
			value: 'B1',
			text: 'Отстает от общего уровня группы (Возможно нужно поменять группу).'
		},
		{
			value: 'B2',
			text: 'Ребенок без настроения, совсем не расположен к учебе сегодня.'
		},
		{
			value: 'B3',
			text: 'Часто отвлекается от занятий: разговаривает, постоянно подвижный.'
		},
		{
			value: 'B4',
			text: 'Сразу хватает за телефон, постоянно ищет свой мобильник.'
		},
		{
			value: 'B5',
			text: 'Память красткосрочная, быстро забывает о чем шла речь.'
		},
		{
			value: 'B6',
			text: 'Часто списывает, постоянно пытается подсмотреть у кого-то.'
		},
		{
			value: 'B7',
			text: 'Мешает учиться другим, начинает разговоры на посторонние темы, не касающиеся урока.'
		},
		{
			value: 'B8',
			text: 'Опоздал более чем на 10 минут.'
		},
		{
			value: 'B9',
			text: 'Забыл домашнюю работу дома.'
		},
		{
			value: 'C1',
			text: 'Принес на урок игрушки и другие, не связанные с уроком предметы.'
		},
		{
			value: 'C2',
			text: 'Из-за частых пропусков у ребенка появились проблемы.'
		},
		{
			value: 'C3',
			text: 'Не сделал домашнее задание, так как большая загруженность в школе.'
		},
		{
			value: 'D1',
			text: 'Ленивый, не хочет делать ничего дополнительного.'
		},
		{
			value: 'D2',
			text: 'У ребенка нет мотивации к учебе.'
		},
		{
			value: 'D3',
			text: 'Стеснительный, говорит очень тихо. Боиться выразить свою мысль.'
		},
		{
			value: 'D4',
			text: 'Ведет себя неуважительно по отношению к преподавателю и другим детям, отказывается выполнять, что-либо.'
		},
		{
			value: 'D5',
			text: 'Спорит с учителем. Даже если неправ.'
		},
		{
			value: 'E1',
			text: 'Очень активный и проявляет заинтересованность во всем.'
		},
		{
			value: 'E2',
			text: 'Прилежный ученик делает все чисто и аккуратно.'
		},
		{
			value: 'E3',
			text: 'Внимательно слушает тренера, полностью выполняет все указания.'
		},
		{
			value: 'E4',
			text: 'Энергичный, создает хорошую атмосферу, дружелюбный.'
		},
		{
			value: 'E5',
			text: 'Превосходит уровень группы (Возможно нужно поменять группу).'
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
	currentRegister: [],
	adminRegisters: []
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
			state.suboffices = teacher.Offices;
			state.subTeacher = teacher;
			window.localStorage.subTeacher = JSON.stringify(teacher);
		},
		SET_CURRENT_REGISTER(state,register){
			state.currentRegister = register;
		},
		SET_ADMIN_REGISTER(state,register){
			state.adminRegisters = register;
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
			state.currentGroup.isOperator = state.currentGroup.isOperator?true:params.isOperator;
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
			window.localStorage.currentTeacher = JSON.stringify({});
			state.currentGroup = {};
			window.localStorage.officeName = "";
			window.localStorage.timeFrom = "";
			window.localStorage.timeTo = "";
			window.localStorage.groupStudents = JSON.stringify([]);
			window.localStorage.currentGroup = JSON.stringify({});
		},
		RESET_SUBTEACHER(state){
			state.subTeacher = {};
			state.suboffices = [];
			window.localStorage.subTeacher = JSON.stringify({});
		},
		RESET_EQUAL(state,equal){
			state.equal = equal;
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
			
			if(response.data.status == 200)
				commit('SET_CURRENT_USER',response.data.data);
				
			return response.data;
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetTeacherById({commit},teacherId){
		try{
			var response = await Api().post('/teacher', {teacherId});
			
			if(response.data.status == 200)
				commit('SET_CURRENT_TEACHER',response.data.data[0]);
			else if(response.data.status == 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetGroup({commit}, params){
		try{
			var teacherId = params.params.change ? params.subTeacher.Id:params.params.teacherId;
			var response = await Api().post('/groups', {params:params.params,teacherId:teacherId});
			if(response.data.status === 200){
				if(Object.keys(response.data.data).length === 0 && response.data.data.constructor === Object)
					return {status: 404};
				else {
					var group = response.data.data;
					group.date = params.params.date;
					group.change = params.params.change;
					group.officeId = params.params.officeId;
					commit('SET_CURRENT_GROUP', group);
					return {status: 200};	
				}
			} else if(response.data.status === 401 || response.data.status == 400){
				commit('RESET_CURRENT_USER');
				return {status: response.data.status};
			} 
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetStudents({commit}, params){
		try{
			var response = await Api().post('/groupstudents', params);
			
			if(response.data.status == 200)
				commit('SET_GROUP_STUDENTS',response.data.data);
			else if(response.data.status === 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');
			
			return {status: response.data.status};
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetCode({commit}, Id){
		try{
			var response = await Api().post('/sendmail', Id);
			if(response.data.status == 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');
				
			return response.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SetAttendence({commit}, params){
		try{
			var response = await Api().post('/registeramount',{groupId:params.group.Id,lessonDate: params.group.date,officeId:params.group.officeId});
			if(response.data.status == 200){		
				var today = new Date();
				var day = today.getFullYear()+'-'+("0" + (today.getMonth()+1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				var pass_response = await Api().post('/setpasses',{date: params.group.date, groupId: params.group.Id, students: params.students});

				if(pass_response.data.status == 200){
					var result = await Api().post('/setattendence',{date: params.group.date,groupId: params.group.Id, students: params.students});
					var isSubmitted = result.data.status==200?true:false;
					Api().post('/addregister',{teacherId: params.teacherId, group: params.group, submitDay: day, submitTime: time, isSubmitted: isSubmitted, students: params.students});					
					if(params.group.change || params.group.isOperator){
						Api().post('/sendmessagetelegram',params);
					}

					commit('RESET_GROUP');
					return {status: 200};
				} else {
					Api().post('/addregister',{teacherId: params.teacherId, group: params.group, submitDay: day, submitTime: time, isSubmitted: false, students: params.students});					
					//Api().post('/sendmessagetelegram',params);
					commit('RESET_GROUP');
					return {status: 500};
				}
			} else if(response.data.status == 401 || response.data.status == 400){
				commit('RESET_CURRENT_USER');
				return {status: response.data.status, text: 'Ваше время в системе истекло перезайдите'};
			}else if(response.data.status == 410){
				commit('RESET_GROUP');
				return {status: response.data.status, text: 'Аттенданс уже заполнен'};
			}
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SearchTeacher({commit}, name){
		try{
			var response = await Api().get('/searchteacher', {params: {value: name}});


			if(response.data.status == 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');

			return response.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SearchStudent({commit}, name){
		try{
			var response = await Api().get('/searchstudent', {params: {value: name}});

			if(response.data.status == 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');
				
			return response.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	AddStudentGroup({commit},params){
		try{
			var status = 200;
			params.students.map(async function(student){
				var result = await Api().post('/student',{student});
				if(result.data.status == 200){
					var response = await Api().post('/addtogroup',{group: params.group, clientId: result.data.data});
					if(response.data.status == 200){
						commit('ADD_STUDENT_GROUP',{attendence: true, clientid: result.data.data, name: student.value, status: false, aibaks: 0});
						commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: false});
					} else {
						commit('ADD_STUDENT_GROUP',{attendence: true, clientid: result.data.data, name: student.value, status: true, aibaks: 0});
						commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: true});
					}
				}else if(response.data.status == 404){
					commit('ADD_STUDENT_GROUP',{attendence: true, clientid: -1, name: student.value, status: true});
					commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: true});
				} else if(result.data.status == 401 || result.data.status == 400){
					status = result.data.status;
					commit('RESET_CURRENT_USER');
				} else{
					status = result.data.status;
				}		
			});
			return {status: status};	
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetTeacherByTeacherFullName({commit},fullname){
		try{
			var response = await Api().get('/subteacher',{params: {FullName: fullname}});
			if(response.data.status == 200)
				return {status: response.data.status, data: response.data.data};
			else {
				return {status: response.data.status};
			}
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetRegisterByTeacherId({commit},params){
		try{
			var response = await Api().get('/getregister',{params});
			if(response.data.status == 200)
				commit('SET_CURRENT_REGISTER',response.data.data);
			else if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');
			else 
				commit('RESET_CURRENT_USER');
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetRegisterToAdmin({commit},params){
		try{
			var response = await Api().get('/getdayregisters',{params});
			if(response.data.status == 200)
				commit('SET_ADMIN_REGISTER',response.data.data);
			else if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');
			else 
				commit('RESET_CURRENT_USER');
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetRegisterDetails({commit},params){
		try{
			var response = await Api().get('/getregisterdetails',{params});
			if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');

			return response.data;
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetUniqueRegister({commit}){
		try{
			var response = await Api().get('/getuniqueregister');
			if(response.data.status == 200)
				commit('SET_CURRENT_REGISTER',response.data.data);
			else if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');
			else 
				commit('RESET_CURRENT_USER');
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetRegisterDetailsAVG({commit},params){
		try{
			var response = await Api().get('/getsubregistersavg',{params});
			if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');

			return response.data;
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	ResetSubTeacher({commit}){
		commit('RESET_SUBTEACHER');
	},
	ResetEqual({commit},equal){
		commit('RESET_EQUAL',equal);
	},
	ResetGroup({commit}){
		commit('RESET_GROUP');
		
	},
	async GetSubTeacher({commit},teacherId){
		try{
			var response = await Api().post('/teacher', {teacherId});
			if(response.data.status == 200)
				commit('SET_SUBTEACHER',response.data.data[0]);
			else if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');

		}catch{
			commit('RESET_CURRENT_USER');
		}
	}
  },
  modules: {
  }
})
