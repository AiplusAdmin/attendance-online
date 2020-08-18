<template>
	<v-container>
		<v-row>
			<v-col>
				<h2>Attendance list</h2>
			</v-col>
		</v-row>
		<v-row class="pb-4">		
			<v-col class="white currentTeacher">
				<span>Тренер</span>
				<p>{{currentTeacher.LastName +' '+currentTeacher.FirstName}}</p>
			</v-col>
			<v-col v-if="currentGroup.change">
				<span>Заменяю</span>
				<p>{{subTeacher.fullName}}</p>
			</v-col>
			<v-col>
				<span>Группа</span>
				<p>{{currentGroup.name}}</p>
			</v-col>
			<v-col>
				<span>Время</span>
				<p>{{currentGroup.time}}</p>
			</v-col>
			<v-col>
				<span>Дни обучения</span>
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
					<template v-slot:[`item.point`]="{ item }">
						<v-text-field v-model="item.point" :disabled="!item.attendence"></v-text-field>
					</template>
					<template v-slot:[`item.comment`]="{ item }">
						<v-text-field v-model="item.comment" :disabled="!item.attendence"></v-text-field>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="px-0">
				<v-btn @click="setAttendence">Отправить</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import AddStudent from '@/components/modal/Add'

  export default {
    name: 'AttendenceForm',
	components: {
		AddStudent
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
					text : 'Баллы',
					value : 'point',
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
			isLoading: true		
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
	async mounted(){
		var response = await this.$store.dispatch('GetStudents',{groupId : this.currentGroup.Id, date: this.currentGroup.date});
		if(response.status)
			this.isLoading = false;
	},
	created(){
		if(Object.entries(this.currentGroup).length === 0)
			this.$store.state.currentGroup = JSON.parse(localStorage.currentGroup);
		if(Object.entries(this.currentTeacher).length === 0)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
		if(Object.entries(this.groupStudents).length === 0)
			this.$store.state.groupStudents = JSON.parse(localStorage.groupStudents);

	},
	methods : {
		async setAttendence(){
			var response = await this.$store.dispatch('SetAttendence',{group: this.currentGroup, students: this.groupStudents, teacherId: this.$store.state.currentTeacher.Id});
			if(response.status)
				this.$router.push({path:`/teacher/${this.$store.state.currentTeacher.Id}`});
			else 
				alert(response.message);
		}
	}
  }
</script>
<style scoped>
	.currentTeacher{
		border-radius: 15px;
	}
</style>