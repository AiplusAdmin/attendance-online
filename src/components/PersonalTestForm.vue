<template>
	<v-container>
		<v-row class="d-flex flex-row primary" align="center">
			<v-col>
				<router-link class="pl-4 orange--text text-decoration-underline" :to="`/teacher/${currentTeacher.Id}`" v-text="'Изменить'"><v-icon color="#fbab17">mdi-chevron-left</v-icon></router-link>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>
		<v-divider></v-divider>
		<v-row align="center">		
			<v-col cols = "12" lg="3" class="currentTeacher primary">
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
		</v-row>
		<v-row>
			<v-col class="px-0 py-0" cols = "12">
				<v-list subheader flat class="primary">
					<v-list-item-group>
						<v-list-item inactive>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="font-weight-bold grey--text text--darken-2">Категория Теста</v-list-item-title>
							</v-list-item-content>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="grey--text text--darken-1 text-right" v-text="personalTest.testCategory.Name"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-col>
			<v-col class="px-0 py-0" cols = "12">
				<v-list subheader flat class="primary">
					<v-list-item-group>
						<v-list-item inactive>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="font-weight-bold grey--text text--darken-2">Тест</v-list-item-title>
							</v-list-item-content>
							<v-list-item-content class="pb-0">
								<v-list-item-title class="grey--text text--darken-1 text-right" v-text="personalTest.test.Name"></v-list-item-title>
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
				<v-form v-model="valid"  ref="form">
					<v-card  class="rounded-card my-4 mx-2" elevation="5" v-for="(student,index) in testStudents" :key="index">
						<v-list class = "pa-0" shaped flat :class="student.delete?'grey lighten-2':'white'">
							<v-subheader>
								<v-list-item class="px-0"
										:key="`name-${student.value.StudentId}`"
										inactive
									>
										<v-list-item-content>
											<v-list-item-title :class="student.loyalty != undefined?'white--text font-weight-bold text-subtitle-1':'grey--text text--darken-3 font-weight-bold text-subtitle-1'">{{student.value.FullName}}</v-list-item-title>
										</v-list-item-content>
										<v-list-item-action>
												<v-icon @click="RemoveStudent(index)" :color="student.loyalty != undefined?'#ffffff':'#fbab17'">{{student.icon}}</v-icon>
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
										v-for="testsubject in student.testSubjects" :key="testsubject.Id"
										class="pr-0"
										inactive>
										<v-row class="align-center">
											<v-col cols='9' class="py-0">
												<v-list-item-content>
													<v-list-item-title class="grey--text text--darken-3">{{testsubject.Name}}</v-list-item-title>
												</v-list-item-content>
											</v-col>
											<v-col cols='3' class="pa-0">
												<v-list-item-action>
													<v-text-field 
														v-model="testsubject.Score"
														type="number" 
														min="0" :max="testsubject.MaxScore"
														color="#fbab17"
														item-color='#fbab17'
														:rules="[required('Тест'), numberBetweenTest('Тест',testsubject.MaxScore)]" required>
													</v-text-field>
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
				<v-btn class="rounded-btn white--text"  height="50" :loading="click" @click="setTestResults" block rounded>Отправить</v-btn>
			</v-col>
		</v-row>
		<v-speed-dial
			bottom
			right
			fixed
		>
			<template v-slot:activator>
				<AddStudentsTest/>
			</template>
		</v-speed-dial>
	</v-container>
</template>

<script>
import AddStudentsTest from '@/components/modal/AddStudentsTest'
import validations from '@/utils/validations'

export default {
	name: 'PersonalTestForm',
	components: {
		AddStudentsTest
	},
	data (){
		return {
			...validations,
			valid:false,
			click: false
		}
	},
	computed: {
		personalTest(){
			console.log(this.$store.state.personalTest);
			return this.$store.state.personalTest;
		},
		currentTeacher(){
			return this.$store.state.currentTeacher;
		},
		testStudents(){
			return this.$store.state.testStudents;
		}
	},
	methods:{
		async setTestResults(){
			console.log(this.valid);
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					var response = await this.$store.dispatch('SetPersonalTests',{students: this.testStudents, teacherId: this.$store.state.currentTeacher.Id,test: this.personalTest});
					console.log(response);
				}
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