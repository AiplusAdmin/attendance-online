<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold text-lg-h5">Attendance list</div>
			</v-col>
			<v-col>
				<router-link class="pl-4 orange--text text-decoration-underline" :to="{path:`/teacher/${this.$store.state.currentTeacher.Id}`}">Изменить</router-link>
			</v-col>
			<v-col>
				<InfoComment />
			</v-col>
		</v-row>
		<v-row class="pb-4">		
			<v-col cols = "12" lg="3" class="white currentTeacher">
				<span class="font-weight-bold grey--text text--darken-2">Тренер</span>
				<p>{{currentTeacher.LastName +' '+currentTeacher.FirstName}}</p>
			</v-col>
			<v-col v-if="currentGroup.change">
				<span class="font-weight-bold grey--text text--darken-2">Заменяю</span>
				<p>{{subTeacher.LastName + ' ' + subTeacher.FirstName}}</p>
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
				<v-form v-model="valid"  ref="form">
					<v-data-table
						:value = "groupStudents"
						:headers = "headers"
						:items = "groupStudents"
						item-key = "clientid"
						:loading="isLoading"
						loading-text = "Загрузка... Пожалуйста подождите"
						no-data-text = "Нет учеников"
						hide-default-footer
						disable-pagination
					>
						<template v-slot:top>
							<v-toolbar flat>
								<v-toolbar-title>Срез не писали</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-switch v-model="srez" class="mt-5" color="#fbab17"></v-switch>
							</v-toolbar>
						</template>
						<template v-slot:[`item.index`]="{ item }" >
							<p>{{groupStudents.indexOf(item) + 1}}</p>
						</template>
						<template v-slot:[`item.name`]="{ item }" >
							<p >{{item.name}}</p>
						</template>
						<template  v-slot:[`item.attendence`]="{ item }">
							<v-checkbox v-model="item.attendence" color="#fbab17"></v-checkbox>
						</template>
						<template v-slot:[`item.homework`]="{ item }">
							<v-select    v-show="item.attendence"
								v-model="item.homework" 
								:disabled="!item.attendence"
								:items="homeworks"
								item-text="text"
								item-value="value"
								color="#fbab17"
								hide-selected
								:rules="[requiredNumber('Д/з',item.attendence)]" required>
							</v-select>
						</template>
						<template v-slot:[`item.test`]="{ item }">
							<v-select  v-show="item.attendence"
								v-model="item.test" 
								:disabled="!item.attendence"
								:items="tests"
								item-text="text"
								item-value="value"
								color="#fbab17"
								:rules="[requiredNumber('Срез',item.attendence)]" required>
							</v-select>
						</template>
						<template  v-slot:[`item.lesson`]="{ item }">
							<v-text-field v-model="item.lesson" v-show="item.attendence"
								type="number" 
								:disabled="!item.attendence" 
								min="0" max="100"
								color="#fbab17"
								:rules="[requiredNumber('Активность',item.attendence), numberBetween('Активность',item.attendence)]" required>
							</v-text-field>
						</template>
						<template v-slot:[`item.comment`]="{ item }">
							<v-select v-show="item.attendence"
								v-model="item.comment"
								:items="comments"
								item-text="value"
								item-value="text"
								color="#fbab17"
								:disabled="!item.attendence"
								label="Комментарии"
								multiple
							>
							</v-select>
						</template>
					</v-data-table>
				</v-form>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-divider color="black"></v-divider>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="4" class="px-0">
				<v-btn class="rounded-btn white--text"  height="50" :loading="click" @click="setAttendence" block rounded>Отправить</v-btn>
			</v-col>
		</v-row>
		<v-speed-dial
			bottom
			right
			fixed
		>
			<template v-slot:activator>
				<v-btn
				color="orange"
				dark
				fab
				@click="ScrollTop"
				>
					<v-icon>mdi-arrow-up-thick</v-icon>
				</v-btn>
			</template>
		</v-speed-dial>
		<InfoModal :dialog="dialog" :message="messageModal" path="journal"/>
		<Check :checkdialog ="checkdialog" :code="code"/>
	</v-container>
</template>

<script>
import AddStudent from '@/components/modal/Add'
import InfoModal from '@/components/modal/Info'
import validations from '@/utils/validations'
import InfoComment from '@/components/modal/InfoComment'
import Check from '@/components/modal/Check'

export default {
    name: 'AttendenceForm',
	components: {
		AddStudent,
		InfoModal,
		InfoComment,
		Check
	},
    data (){
		return {
			valid: true,
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
			checkdialog: false,
			srez: false,
			code:null,
			messageModal: '',
			click: false,
			...validations
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
		},
		equal(){
			return this.$store.state.equal;
		},
		comments(){
			return this.$store.state.comments;
		}
	},
	beforeCreate(){
		var user = JSON.parse(window.localStorage.currentUser);
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push('/');
		}
	},
	async mounted(){
		if(JSON.parse(localStorage.groupStudents).length == 0){
			var response = await this.$store.dispatch('GetStudents',{groupId : this.currentGroup.Id, date: this.currentGroup.date});
			if(response.status)
				this.isLoading = false;
			else if(response.logout)
				this.$$router.push('/');

			if(this.currentGroup.change)
				this.$store.dispatch('ResetEqual',false);
		} else {
			this.isLoading = false;
		}
	},
	beforeMount(){
		if(Object.entries(this.currentGroup).length == 0)
			this.$store.state.currentGroup = JSON.parse(localStorage.currentGroup);
		if(Object.entries(this.currentTeacher).length == 0)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
		if(this.groupStudents.length == 0  && localStorage.groupStudents)
			this.$store.state.groupStudents = JSON.parse(localStorage.groupStudents);
		if(Object.entries(this.subTeacher).length == 0)
			this.$store.state.subTeacher = JSON.parse(localStorage.subTeacher);
	},
	methods : {
		async setAttendence(){
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					if(this.currentGroup.change && !this.equal){
						var code = await this.$store.dispatch('GetCode',{Id: this.subTeacher.Id});
						if(code.status){
							this.code = code.code;
							this.checkdialog = true;
						}else if(code.logout){
							this.$router.push('/');
						}
					}else if(this.equal){
						var total = 0;
						this.groupStudents.map(function(student){
							if(student.attendence){
								if(student.homework >3 && student.homework <= 7)
									student.aibaks+=1;
								if(student.homework >7 && student.homework <= 10)
									student.aibaks+=2;
								if(student.lesson > 50 && student.lesson <= 100)
									student.aibaks+=1;

								total+=student.aibaks;
							}
						});
						var response = await this.$store.dispatch('SetAttendence',{group: this.currentGroup, students: this.groupStudents, teacherId: this.$store.state.currentTeacher.Id, teacherName: this.$store.state.currentTeacher.LastName + ' ' + this.$store.state.currentTeacher.FirstName});
						if(response.status){
							this.messageModal = `Успешно добавлен.\n Количество Айбаксов - ${total}`;
							this.click = false;
							this.dialog = true;
						} else if(!response.status && response.text){
							this.messageModal = response.text;
							this.click = false;
							this.dialog = true;
						}	
					}
				}
				
			}
		},
		ScrollTop(){
			window.scrollTo(0, 0); 
		}
	},
	watch:{
		groupStudents:{
			handler: function(newValues) {
				localStorage.groupStudents = JSON.stringify(newValues);
			},
			deep: true
		},
		srez:function(val){
			if(val){
				this.groupStudents.map(function(student){
					student.test = 12;
				});
			} else {
				this.groupStudents.map(function(student){
					student.test = null;
				});
			}
		}
	}
  }
</script>
<style scoped>
	.v-data-table-header{
		border-radius: 10px;
	}

	.currentTeacher{
		border-radius: 15px;
	}

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>