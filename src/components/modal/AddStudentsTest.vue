<template>
  <v-row class="d-flex justify-end">
    <v-dialog  v-model="dialog" persistent max-width="400">
		<template  v-slot:activator="{ on, attrs }">
			<v-btn
				color="orange mr-1"
				dark
				fab
				v-bind="attrs"
				v-on="on"
				>
					<v-icon>mdi-account-multiple-plus-outline</v-icon>
			</v-btn>
		</template>
		<v-card class="py-9 px-5">
			<v-form v-model="valid" ref="form"> 
				<v-card-title class="pb-11 headline align-center justify-center font-weight-bold text-lg-h6">Добавить ученика</v-card-title>
					<v-autocomplete
						class="pb-0" v-for="(student,index) in newStudents" :key="index"
						v-model="student.value"
						:items="Students[index]"
						item-text="FullName"
						@input="SetStudent(student)"
						:append-outer-icon="student.icon" @click:append-outer="remove(index)"
						:loading="student.isLoading"
						:search-input.sync="student.search"
						:menu-props="{overflowY:true}"
						no-data-text="Нет Учеников"
						dense clearable outlined rounded
						return-object
						label="ФИО Ученика" color="#fbab17"
						:rules="[requiredObject('Новый ученик')]" required>
					</v-autocomplete>				
					<v-btn class = "rounded-btn grey--text text--darken-2" @click="add" block rounded left><v-icon left>mdi-plus</v-icon>Добавить ученика</v-btn>
				<v-card-actions class="pt-11 pb-0 align-center justify-center">
					<v-btn class="orange--text" @click="Cancel" rounded text>Отменить</v-btn>
				</v-card-actions>
				<v-card-actions>
					<v-btn class="rounded-btn-orange white--text" :loading="click" :height="48" @click="AddStudents" block rounded>Добавить</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import validations from '@/utils/validations'

export default {
	name: 'AddStudentsTest',
	data(){
		return {
			valid: true,
			dialog : false,
			newStudents : [
				{
					value:null,
					icon:'',
					search:null,
					isLoading:false,
					testSubjects: this.$store.state.testSubjects
				}
			],
			Students:[[]],
			click: false,
			...validations
		}
	},
	computed:{
		testSubjects(){
			return this.$store.state.testSubjects;
		}
	},
	methods: {
		add(){
			this.newStudents.push({
				value: null,
				icon: 'mdi-close',
				search: null,
				isLoading:false,
				testSubjects: this.testSubjects
			});
			this.Students.push([]);
		},
		remove(index){
			this.newStudents.splice(index, 1);
			this.Students.slice(index,1);
		},
		async AddStudents(){
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					this.$store.dispatch('AddStudentTest', {students: this.newStudents});
					this.click = false;
					this.newStudents = [{value:null,icon:'',search:null,isLoading:false,testSubjects: this.testSubjects}];
					this.Students = [[]];
					this.dialog = false;
				}
			}
		},
		Cancel(){
			this.newStudents = [{value:null,icon:'',search:null,isLoading:false,Students:[]}];
			this.dialog = false;
		},
		async SetStudent(student){
			student.isLoading = false;
		}
	},
	watch:{
		newStudents: {
			handler: function(newValues) {
				newValues.map(async (value,index) =>{
					if(value.value == null && this.dialog){
						value.isLoading = true;
						var response = await this.$store.dispatch('SearchStudentTest',{value:value.search});
						if(response.status == 200)
							this.Students[index] = response.data;
					}
				});
			},
			deep: true
		}
	}
}
</script>

<style scoped>
	.rounded-btn{
		border: 1px solid rgb(214,214,216);
		background-image: linear-gradient(to bottom,rgb(255,255,255) 0%,rgb(214,214,216) 100%);
	}

	.rounded-btn-orange{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>