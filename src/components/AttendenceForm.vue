<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold text-lg-h5">Attendance list</div>
			</v-col>
			<v-col>
				<router-link class="pl-4 orange--text text-decoration-underline" :to="{path:`/teacher/${this.$store.state.currentTeacher.Id}`}">Изменить</router-link>
			</v-col>
		</v-row>
		<v-row class="pb-4">		
			<v-col cols = "12" lg="3" class="white currentTeacher">
				<span class="font-weight-bold grey--text text--darken-2">Тренер</span>
				<p>{{currentTeacher.LastName +' '+currentTeacher.FirstName}}</p>
			</v-col>
			<v-col v-if="currentGroup.change">
				<span class="font-weight-bold grey--text text--darken-2">Заменяю</span>
				<p>{{subTeacher.fullName}}</p>
			</v-col>
			<v-col>
				<span class="font-weight-bold grey--text text--darken-2">Группа</span>
				<p>{{currentGroup.name}}</p>
			</v-col>
			<v-col>
				<span class="font-weight-bold grey--text text--darken-2">Время</span>
				<p>{{currentGroup.time}}</p>
			</v-col>
			<v-col>
				<span class="font-weight-bold grey--text text--darken-2">Дни обучения</span>
				<p>{{currentGroup.days}}</p>
			</v-col>
			<v-col>
				<AddStudent/>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="pa-0" cols="12" lg="12">
				<v-data-table
					:value = "groupStudents"
					:headers = "headers"
					:items = "groupStudents"
					item-key = "clientid"
					:loading="isLoading"
					loading-text = "Загрузка... Пожалуйста подождите"
					no-data-text = "Нет учеников"
					hide-default-footer
				>
					<template v-slot:[`item.index`]="{ item }">
						<p>{{groupStudents.indexOf(item) + 1}}</p>
					</template>
					<template  v-slot:[`item.attendence`]="{ item }">
						<v-checkbox v-model="item.attendence"></v-checkbox>
					</template>
					<template v-slot:[`item.homework`]="{ item }">
						<v-select  
							v-model="item.homework" 
							:disabled="!item.attendence"
							:items="homeworks">
						</v-select>
					</template>
					<template v-slot:[`item.test`]="{ item }">
						<v-select  
							v-model="item.test" 
							:disabled="!item.attendence"
							:items="tests">
						</v-select>
					</template>
					<template  v-slot:[`item.lesson`]="{ item }">
						<v-text-field v-model="item.lesson" :disabled="!item.attendence"></v-text-field>
					</template>
					<template v-slot:[`item.comment`]="{ item }">
						<v-text-field v-model="item.comment" :disabled="!item.attendence"></v-text-field>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-divider color="black"></v-divider>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="4" class="px-0">
				<v-btn class="rounded-btn white--text"  height="50" @click="setAttendence" block rounded>Отправить</v-btn>
			</v-col>
		</v-row>
		<InfoModal :dialog="dialog" :message="messageModal" path="journal"/>
	</v-container>
</template>

<script>
	import AddStudent from '@/components/modal/Add'
	import InfoModal from '@/components/modal/Info'

  export default {
    name: 'AttendenceForm',
	components: {
		AddStudent,
		InfoModal
	},
    data (){
		return {
			headers : [
				{
					text : '№',
					value : 'index',
					class : "orange",
					sortable: false
				},
				{
					text : 'ФИО ребенка',
					value : 'name',
					class : "orange"
				},
				{
					text : 'Присутствовал',
					value : 'attendence',
					class : "orange"
				},
				{ 
					text : 'Д/з',
					value: 'homework',
					class : "orange",
					sortable: false

				},
				{ 
					text : 'Срез',
					value: 'test',
					class : "orange",
					sortable: false
				},
				{
					text : 'Активность',
					value : 'lesson',
					class : "orange",
					sortable: false

				},
				{
					text : 'Комментарии',
					value : 'comment',
					class : "orange",
					sortable: false
				}
			],
			isLoading: true	,
			dialog: false,
			messageModal: 'Успешно добавлен'
		}
	},
	computed : {
		currentGroup(){
			return this.$store.state.currentGroup;
		},
		currentTeacher(){
			return this.$store.state.currentTeacher;
		},
		subTeacher(){
			return this.$store.state.subTeacher;
		},
		homeworks(){
			return this.$store.state.homeworks;
		},
		tests(){
			return this.$store.state.tests;
		},
		groupStudents(){
			return this.$store.state.groupStudents;
		}
	},
	beforeCreate(){
		var user = JSON.parse(window.localStorage.currentUser);
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push('/');
		}
	},
	async mounted(){
		var response = await this.$store.dispatch('GetStudents',{groupId : this.currentGroup.Id, date: this.currentGroup.date});
		if(response.status)
			this.isLoading = false;
	},
	created(){
		if(Object.entries(this.currentGroup).length == 0)
			this.$store.state.currentGroup = JSON.parse(localStorage.currentGroup);
		if(Object.entries(this.currentTeacher).length == 0)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
		if(this.groupStudents.length == 0)
			this.$store.state.groupStudents = JSON.parse(localStorage.groupStudents);
		if(Object.entries(this.subTeacher).length == 0)
			this.$store.state.subTeacher = JSON.parse(localStorage.subTeacher);

	},
	methods : {
		async setAttendence(){
			var response = await this.$store.dispatch('SetAttendence',{group: this.currentGroup, students: this.groupStudents, teacherId: this.$store.state.currentTeacher.Id, teacherName: this.$store.state.currentTeacher.LastName + ' ' + this.$store.state.currentTeacher.FirstName});
			if(response.status){
				this.dialog = true;
			} else if(!response.status && response.text){
				this.messageModal = response.text;
				this.dialog = true;
			}
				//
			//else 
						}
	}
  }
</script>
<style scoped>
	.currentTeacher{
		border-radius: 15px;
	}

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>