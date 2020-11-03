<template>
	<v-container>
		<v-row class="d-flex flex-row primary" align="center">
			<v-col>
				<router-link class="pl-4 orange--text text-decoration-underline" :to="'/teacher'" v-text="'Изменить'"><v-icon color="#fbab17">mdi-chevron-left</v-icon></router-link>
			</v-col>
			<v-spacer></v-spacer>
			<v-col>
				<InfoComment />
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row align="center">		
			<v-col cols = "6" lg="3" class="currentTeacher primary">
				<v-list class="primary">
					<v-subheader class="px-0 font-weight-bold grey--text text--darken-2">Тренер</v-subheader>
					<v-list-item inactive class="teacher-rounded">
						<v-list-item-content>
							<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="currentTeacher.LastName"></v-list-item-title>
							<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="currentTeacher.FirstName"></v-list-item-title>	
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col v-if="currentGroup.change" cols = "6" lg="3" class="currentTeacher primary">
				<v-list class="primary">
					<v-subheader class="px-0 font-weight-bold  grey--text text--darken-2">Заменяю</v-subheader>
					<v-list-item inactive class="teacher-rounded">
						<v-list-item-content>
							<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="subTeacher.LastName"></v-list-item-title>
							<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="subTeacher.FirstName"></v-list-item-title>	
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col v-else class="d-flex align-self-stretch primary">
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row>
			<v-col class="px-0 py-0" cols = "12">
				<v-list subheader flat class="primary">
					<v-list-item-group>
						<v-list-item inactive>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="font-weight-bold grey--text text--darken-2">Группа</v-list-item-title>
							</v-list-item-content>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.name"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item inactive>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="font-weight-bold grey--text text--darken-2">Дни обучения</v-list-item-title>
							</v-list-item-content>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.days"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item inactive>
							<v-list-item-content>
								<v-list-item-title class="font-weight-bold grey--text text--darken-2">Время</v-list-item-title>
							</v-list-item-content>
							<v-list-item-content>
								<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.time"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row>
			<v-col cols="12" class="pa-0">
				<div class="pa-4 text-h5 orange--text primary" v-text="'Список учеников'"></div>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="pa-0" cols="12" lg="12" >
				<v-form v-if="!isMobile" v-model="valid"  ref="form">
					<v-data-table  class='studentsTable'
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
								item-color='#fbab17'
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
								item-color='#fbab17'
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
								item-color='#fbab17'
								label="Комментарии"
								multiple
							>
							</v-select>
						</template>
					</v-data-table>
				</v-form>
				<v-form v-else v-model="valid"  ref="form">
					<v-toolbar flat>
						<v-toolbar-title>Срез не писали</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-switch v-model="srez" class="mt-5" color="#fbab17"></v-switch>
					</v-toolbar>
					<v-card  class="rounded-card my-4 mx-2" elevation="5" v-for="(student,index) in groupStudents" :key="index">
						<v-list shaped flat :class="student.delete?'grey lighten-2':'white'">
							<v-subheader>
								<v-list-item class="px-0"
										:key="`name-${student.clientid}`"
										inactive
										
									>
										<v-list-item-content>
											<v-list-item-title class="grey--text text--darken-3 font-weight-bold text-subtitle-1">{{student.name}}</v-list-item-title>
										</v-list-item-content>
										<v-list-item-action>
												<v-icon @click="RemoveStudent(index)" color="#fbab17">{{student.icon}}</v-icon>
										</v-list-item-action>
								</v-list-item>
							</v-subheader>
							<v-divider></v-divider>
								<v-list-item-group>
									<v-list-item
										v-show="!student.delete"
										:key="index"
										:value="index"
										inactive
									>
										<v-list-item-content>
											<v-list-item-title class="grey--text text--darken-3">№</v-list-item-title>
										</v-list-item-content>
										<v-list-item-content>
											<v-list-item-title class="text-right" v-text="index+1"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-list-item
										v-show="!student.delete"
										:key="`attendence-${student.clientid}`"
										:value="student.attendence"
										inactive
									>
										<template v-slot:default="{ active }">
											<v-list-item-content>
												<v-list-item-title class="grey--text text--darken-3">Присутствовал</v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
												<v-checkbox
													v-model="student.attendence"
													:input-value="active"
													color="#fbab17"
												></v-checkbox>
											</v-list-item-action>
										</template>
									</v-list-item>
									<v-list-item
										v-show="student.attendence"
										:key="`homework-${student.clientid}`"
										:value="student.homework"
										class="pr-0"
										inactive>
										<v-row class="align-center">
											<v-col cols='7' class="py-0">
												<v-list-item-content>
													<v-list-item-title class="grey--text text--darken-3">Д/з</v-list-item-title>
												</v-list-item-content>
											</v-col>
											<v-col cols='5' class="pa-0">
												<v-list-item-action>
													<v-select
														v-model="student.homework"
														:items="homeworks"
														item-text="text"
														item-value="value"
														color="#fbab17"
														item-color="#fbab17"
														hide-selected
														:rules="[requiredNumber('Д/з',student.homework)]" required>
													</v-select>
												</v-list-item-action>
											</v-col>
										</v-row>
									</v-list-item>
									<v-list-item
										v-show="student.attendence"
										:key="`test-${student.clientid}`"
										:value="student.test"
										class="pr-0"
										inactive
									>
										<v-row class="align-center">
											<v-col cols='7' class="py-0">
												<v-list-item-content>
													<v-list-item-title class="grey--text text--darken-3">Срез</v-list-item-title>
												</v-list-item-content>
											</v-col>
											<v-col cols='5' class="pa-0">
												<v-list-item-action>
													<v-select
														v-model="student.test"
														:items="tests"
														item-text="text"
														item-value="value"
														color="#fbab17"
														item-color='#fbab17'
														hide-selected
														:rules="[requiredNumber('Д/з',student.test)]" required>
													</v-select>
												</v-list-item-action>
											</v-col>
										</v-row>
									</v-list-item>
									<v-list-item
										v-show="student.attendence"
										:key="`lesson-${student.clientid}`"
										:value="student.lesson"
										class="pr-0"
										inactive
									>
										<v-row class="align-center">
											<v-col cols='7' class="py-0">
												<v-list-item-content>
													<v-list-item-title class="grey--text text--darken-3">Активность</v-list-item-title>
												</v-list-item-content>
											</v-col>
											<v-spacer></v-spacer>
											<v-col cols='3' class="pa-0">
												<v-list-item-action>
													<v-text-field 
														v-model="student.lesson"
														type="number" 
														min="0" max="100"
														color="#fbab17"
														item-color='#fbab17'
														:rules="[requiredNumber('Активность',student.lesson), numberBetween('Активность',student.lesson)]" required>
													</v-text-field>
												</v-list-item-action>
											</v-col>
										</v-row>
									</v-list-item>
									<v-list-item
										v-show="student.attendence"
										:key="`comment-${student.clientid}`"
										:value="student.comment"
										class="pr-0"
										inactive
									>
									<v-row class="align-center">
										<v-col cols='7' class="py-0">
											<v-list-item-content>
												<v-list-item-title class="grey--text text--darken-3">Комментарии</v-list-item-title>
											</v-list-item-content>
										</v-col>
										<v-col cols='5' class="pa-0">
											<v-list-item-action>
												<v-select
													v-model="student.comment"
													:items="comments"
													item-text="value"
													item-value="text"
													color="#fbab17"
													item-color='#fbab17'
													clearable
													placeholder="Комментарии"
													multiple>
												</v-select>
											</v-list-item-action>
										</v-col>
									</v-row>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
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
				<AddStudent/>
			</template>
		</v-speed-dial>
		<InfoModal :dialog="dialog" :message="messageModal" :path="path"/>
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
					sortable: false
				},
				{
					text : 'ФИО ребенка',
					value : 'name',
				},
				{
					text : 'Присутствовал',
					value : 'attendence',
				},
				{ 
					text : 'Д/з',
					value: 'homework',
					sortable: false

				},
				{ 
					text : 'Срез',
					value: 'test',
					sortable: false
				},
				{
					text : 'Активность',
					value : 'lesson',
					sortable: false

				},
				{
					text : 'Комментарии',
					value : 'comment',
					sortable: false
				}
			],
			isLoading: true	,
			dialog: false,
			checkdialog: false,
			srez: false,
			code:null,
			messageModal: '',
			path: null,
			click: false,
			isMobile: false,
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
		var user = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{};
		if ((Object.keys(user).length === 0 && user.constructor === Object)){
			this.$router.push('/');
		}
		var group = window.localStorage.currentGroup?JSON.parse(window.localStorage.currentGroup):{};
		if((Object.keys(group).length === 0 && group.constructor === Object)){
			this.$router.push('/teacher');
		}
	},
	async mounted(){
		this.onResize();
		if(!localStorage.groupStudents || JSON.parse(localStorage.groupStudents).length == 0){
			var response = await this.$store.dispatch('GetStudents',{groupId : this.currentGroup.Id, date: this.currentGroup.date});
			if(response.status == 200){
				this.SortStudent();
				this.isLoading = false;
			}
			else if(response.status==400 || response.status==401){
				this.messageModal = 'Ваше время в системе истекло перезайдите';
				this.path = '/';
				this.dialog = true;
			}

			if(this.currentGroup.change)
				this.$store.dispatch('ResetEqual',false);
		} else {
			this.SortStudent();
			this.isLoading = false;
		}
	},
	created(){
		console.log(localStorage.currentGroup);
		if(localStorage.currentGroup)
			this.$store.state.currentGroup = JSON.parse(localStorage.currentGroup);
		if(localStorage.currentTeacher)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
		if(localStorage.groupStudents)
			this.$store.state.groupStudents = JSON.parse(localStorage.groupStudents);
		if(localStorage.subTeacher)
			this.$store.state.subTeacher = JSON.parse(localStorage.subTeacher);
	},
	methods : {
		async setAttendence(){
			console.log(this.valid);
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					if(this.currentGroup.change && !this.equal){
						var code = await this.$store.dispatch('GetCode',{Id: this.subTeacher.Id});
						if(code.status == 200){
							this.code = code.data;
							this.checkdialog = true;
						}else if(code.status == 400 || code.status == 401){
							this.$router.push('/');
						}
					}else if(this.equal){
						var total = 0;
						this.groupStudents.map(function(student){
							if(student.attendence){
								if(student.aibaks == 0){
									if(student.homework >3 && student.homework <= 7)
										student.aibaks+=1;
									if(student.homework >7 && student.homework <= 10)
										student.aibaks+=2;
									if(student.lesson > 50 && student.lesson <= 100)
										student.aibaks+=1;
								}
								total+=student.aibaks;
							}
						});
						console.log(total);
						var response = await this.$store.dispatch('SetAttendence',{group: this.currentGroup, students: this.groupStudents, teacherId: this.$store.state.currentTeacher.Id, teacherName: this.$store.state.currentTeacher.LastName + ' ' + this.$store.state.currentTeacher.FirstName});
						if(response.status == 200){
							this.messageModal = `Успешно добавлен.\n Количество Айбаксов - ${total}`;
							this.path = '/journal';
							this.click = false;
							this.dialog = true;
						} else if(response.status == 500){
							this.messageModal = `Обновите и попробуйте еще раз либо перезайдите`;
							this.path = null;
							this.click = false;
							this.dialog = true;
						}else if(response.status == 401 || response.status == 400){
							this.messageModal = response.text;
							this.path = '/';
							this.click = false;
							this.dialog = true;
						} else if(response.status == 410){
							this.messageModal = response.text;
							this.path = '/journal';
							this.click = false;
							this.dialog = true;
						}
					}
				}
			}
		},
		ScrollTop(){
			window.scrollTo(0, 0); 
		},
		onResize(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': 
					this.isMobile = true;
					break;
				default:
					this.isMobile = false;
			}
		},
		RemoveStudent(index){
			if(this.groupStudents[index].delete){
				this.groupStudents[index].icon= 'mdi-close-thick';
				this.groupStudents[index].delete = false;
				this.SortStudent();
			}else{
				this.groupStudents[index].icon= 'mdi-pencil';
				this.groupStudents[index].delete = true;
				this.groupStudents[index].attendence = false;
				this.SortStudent();
			}
		},
		SortStudent(){
			this.groupStudents.sort(function(a,b){
				if(a.delete)
					return 1;
				if(b.delete)
					return -1;
				if(a.name > b.name)
					return 1;
				if(a.name < b.name)
					return -1;

				return 0;
			});
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

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}

	.rounded-card{
		border-radius: 10px;
	}

	.teacher-rounded{
		border:rgba(196, 197, 197) solid 1px;
		border-radius: 10px;
	}
</style>