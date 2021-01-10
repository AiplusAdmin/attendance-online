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
	timesFrom : ['08:00','08:45','09:15','09:30','10:15','10:45','11:00','11:45','12:15','12:30','12:45','13:00','13:30','13:45','14:30','15:00','15:15','16:00','16:45','17:30','18:15','19:00','19:45'],
	timesTo : ['00:00'],
	srezLevel: ['A','B','C','Нет'],	
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
	tests : 
	[
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
				text:'Не писал',
				value: 11
			},
			{
				text: 'Не писала группа',
				value: 12
			}
	],
	currentRegister: [],
	adminRegisters: [],
	personalTest:{},
	testSubjects: [],
	testStudents:[],
	levels: [],
	topics: [],
	newStudents : [{value:null,icon:''}],
	homeWorkLevels: ['A','B','C'],
	personalHeaders: [],
	personalItems: []
},
  mutations: {
		SET_CURRENT_USER(state,user){
			state.currentUser = user;
			window.localStorage.currentUser = JSON.stringify(user);
		},
		UPDATE_CURRENT_USER(state,fio){
			var user = JSON.parse(window.localStorage.currentUser);
			user.firstname = fio[1]?fio[1]:user.firstname;
			user.lastname = fio[0]?fio[0]:user.lastname;
			state.currentUser = user;
			window.localStorage.currentUser = JSON.stringify(user);
		},
		SET_CURRENT_GROUP(state,group){
			state.currentGroup = group;
			window.localStorage.currentGroup = JSON.stringify(group);
		},
		SET_EXTRA_CURRENT_GROUP(state,extra){
			state.currentGroup.roomId = extra.room.Id;
			state.currentGroup.level = extra.level;
			window.localStorage.currentGroup = JSON.stringify(state.currentGroup);
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
			seconds+=15;
			mm = parseInt(seconds/60);
			ss = seconds%60==0 ? '00' : seconds%60;
			var hourLesson = mm<10? '0'+mm+':'+ss:mm+':'+ss;			
			seconds+=30;
			mm = parseInt(seconds/60);
			ss = seconds%60==0 ? '00' : seconds%60;
			var fullLesson = mm<10? '0'+mm+':'+ss:mm+':'+ss;
			state.timesTo.push(halfLesson);
			state.timesTo.push(hourLesson);
			state.timesTo.push(fullLesson);
		},
		SET_GROUP_DETAILS(state,params){
			state.currentGroup.isStudentAdd = params.isStudentAdd;
			state.currentGroup.isOperator = params.isOperator;
		},
		SET_LEVELS(state,levels){
			state.levels = levels
		},
		SET_PERSONAL_TEST(state, personalTest){
			state.personalTest = personalTest;
		},
		SET_TEST_SUBJECTS(state,testSubjects){
			state.testSubjects = testSubjects;
		},
		SET_TEST_STUDENTS(state,students){
			state.testStudents = state.testStudents.concat(students); 
		},
		SET_TOPICS(state,topics){
			state.topics = topics;
		},
		SET_PERSONAL_TEST_DETAILS(state,details){
			state.personalHeaders = details.headers;
			state.personalItems = details.items;
		},
		ADD_STUDENT_GROUP(state, student){
			state.groupStudents.push(student);
		},
		RESET_GROUP(state){
			state.currentGroup = {};
			state.subTeacher = {};
			window.localStorage.officeName = "";
			window.localStorage.timeFrom = "";
			window.localStorage.timeTo = "";
			window.localStorage.groupStudents = JSON.stringify([]);
			window.localStorage.currentGroup = JSON.stringify({});
			window.localStorage.subTeacher = JSON.stringify({});
		},
		RESET_CURRENT_USER(state){
			state.currentUser = {};
			window.localStorage.currentUser = JSON.stringify({});
		},
		RESET_LOGOUT(state){
			state.currentUser = {};
			state.currentTeacher = {};
			state.subTeacher = {};
			window.localStorage.currentUser = JSON.stringify({});
			window.localStorage.currentTeacher = JSON.stringify({});
			window.localStorage.subTeacher = JSON.stringify({});
			state.currentGroup = {};
			window.localStorage.officeName = "";
			window.localStorage.timeFrom = "";
			window.localStorage.timeTo = "";
			window.localStorage.change = false;
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
		},
		REMOVE_NEW_STUDENT(state,index){
			state.newStudents.splice(index, 1);
		},
		RESET_NEW_STUDENTS(state){
			state.newStudents =  [{value:null,icon:''}];
		}
  },
  actions: {
	changeTimesTo({commit},timeFrom){
		commit('SET_TIMES_TO',timeFrom);
	},
	LogOut({commit}){
		commit('RESET_LOGOUT');
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
					group.officeId = params.params.office.Id;
					group.teacherId = params.params.teacherId;
					group.subteacherId = params.params.change ? params.subTeacher.Id:null;
					commit('SET_CURRENT_GROUP', group);
					return {status: 200,groupId: group.Id};	
				}
			} else if(response.data.status === 401 || response.data.status == 400){
				commit('RESET_CURRENT_USER');
				return {status: response.data.status};
			} 
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	SetExtraFieldsGroup({commit},params){
		try{
			commit('SET_EXTRA_CURRENT_GROUP', params.params);
			return {status: 200};
		}catch(err){
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
	
				var pass_response = await Api().post('/setattendence',{group: params.group, submitDay: day, submitTime: time, isSubmitted: false, students: params.students,Aibucks: params.Aibucks,topic: params.topic,homework: params.homework,foskres: params.foskres, kolhar: params.kolhar});

				if(pass_response.data.status == 200){
					Api().post('/sendmessagetelegram',params);									
					commit('RESET_GROUP');
					return {status: 200};
				} else {
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
	async SearchStudent({commit}, params){
		try{
			var response = await Api().get('/searchstudent',{params});

			if(response.data.status == 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');
				
			return response.data.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	AddStudentGroup({commit},params){
		try{
			var arr = params.students.map(async function(student){
				var response = await Api().post('/addtogroup',{group: params.group, clientId: student.value.ClientId});
				if(response.data.status == 200){
					commit('ADD_STUDENT_GROUP',{attendence: true, clientid: student.value.ClientId, name: student.value.FullName, status: false, aibaks: 0});
					return true;
				} else {
					commit('ADD_STUDENT_GROUP',{attendence: true, clientid: student.value.ClientId, name: student.value.FullName, status: true, aibaks: 0});
					return false;					
				}	
			});
			var isOperator = arr.every(elem => elem == true);
			commit('SET_GROUP_DETAILS',{isStudentAdd: true, isOperator: isOperator});
			return {status: 200};	
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
	},
	async EditPersonal({commit},params){
		try{
			var response = await Api().post('editpersonal',params);
		
			if(response.data.status == 200)
				commit('UPDATE_CURRENT_USER',response.data.data);
	
			return response.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetOfficeRooms({commit},params){
		try{
			var response = await Api().get('/getofficerooms', {params});
			if(response.data.status == 200)
				return response.data.data;
			else if(response.data.status == 400 || response.data.status == 401)
				commit('RESET_CURRENT_USER');

		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetLastLessonRoom({commit},params){
		try{
			var response = await Api().get('/lastlessonroom', {params});

				return {status: response.data.status,data: response.data.data};
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetTestCategories({commit}){
		try{
			var response = await Api().get('/testcategories');
			return response.data.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}		
	},
	async GetTests({commit},params){
		try{
			var response = await Api().get('/tests', {params});

				return response.data.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetPersonalTest({commit},params){
		try{
			var response = await Api().get('/gettestsubjects',{params:{testId: params.params.test.Id}});

			if(response.data.status == 200)
				commit('SET_TEST_SUBJECTS',response.data.data);
				
			commit('SET_PERSONAL_TEST',params.params);
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SearchStudentTest({commit}, params){
		try{
			var response = await Api().get('/searchstudenttest',{params});

			if(response.data.status == 401 || response.data.status == 400)
				commit('RESET_CURRENT_USER');
				
			return response.data;
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	AddStudentTest({commit},params){
		try{
			commit('SET_TEST_STUDENTS',params.students);
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async SetPersonalTests({commit},params){
		try{
			var response = await Api().post('/setpersonaltests',{students:params.students,personalTest: params.personalTest,teacherId:params.teacherId});
			return response;
		}catch{
			commit('RESET_CURRENT_USER');

		}
	},
	async SetLevels({commit}){
		try{
			var response = await Api().get('/levels');
			commit('SET_LEVELS',response.data.data);
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	async GetTopics({commit},params){
		try{
			var response = await Api().get('/gettopics',{params});
			commit('SET_TOPICS',response.data.data);
		}catch{
			commit('RESET_CURRENT_USER');
		}
	},
	RemoveNewStudent({commit},index){
		commit('REMOVE_NEW_STUDENT',index);
	},
	ResetNewStudents({commit}){
		commit('RESET_NEW_STUDENTS');
	},
	async GetPersonalTestTeacherId({commit},params){
		try{
			var response = await Api().get('/getpersonaltestteacher',{params});
			commit('SET_PERSONAL_TEST_DETAILS',response.data.data);
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async TelegramOnline({commit},params){
		try{
			await Api().post('/telegram/online',{params});
		}catch(err){
			commit('RESET_CURRENT_USER');
		}	
	},
	async TelegramIntensiv({commit},params){
		try{
			await Api().post('/telegram/intensiv',{params});
		}catch(err){
			commit('RESET_CURRENT_USER');
		}	
	},
	async TelegramAttendance({commit},params){
		try{
			await Api().post('/telegram/attendance',{params});
		}catch(err){
			commit('RESET_CURRENT_USER');
		}	
	},
	async TelegramAttendancePersonal({commit},params){
		try{
			await Api().post('/telegram/personal/attendance',{params});
		}catch(err){
			commit('RESET_CURRENT_USER');
		}	
	},
	async TelegramPersonalTest({commit},params){
		try{
			await Api().post('/telegram/personal/tests',{params});
		}catch(err){
			commit('RESET_CURRENT_USER');
		}	
	},
	async TelegramNotification({commit},params){
		try{
			await Api().post('/telegram/notification',{params});
		}catch(err){
			commit('RESET_CURRENT_USER');
		}	
	},
	async TelegramUpload({commit},formData){
		try{
			await Api().post('/telegram/upload',formData);
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	},
	async GetOffices({commit}){
		try{
			var response = await Api().get('/schools');
			return response.data.data;
		}catch(err){
			commit('RESET_CURRENT_USER');
		}
	}
  },
  modules: {
  }
})
