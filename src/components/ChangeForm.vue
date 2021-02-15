<template>
	<v-form v-model="valid" ref="form" class="myform px-0 py-6">
		<v-container class="">
			<v-row class="px-5">
				<v-col class="px-0">
					<v-autocomplete
						:value="subTeacherName"
						:items="subTeachers"
						item-text="FullName"
						@input="SetSubTeacher"
						:loading="isLoading"
						:search-input.sync="search"
						no-data-text="Нет учителей"
						dense clearable
						return-object
						label="ФИО Тренера" color="#fbab17">
					</v-autocomplete>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-select
						v-model="params.office"
						:items="groupOffices"
						item-text="Name"
						label="Филиал"
						color="#fbab17"
						solo rounded outlined flat dense
						return-object
						:rules="[requiredObject('Филиал')]" required>
					</v-select>
				</v-col>
			</v-row>
			<v-row class="px-5 font-weight-bold grey--text text--darken-2">
				<v-col>
					Дата занятии
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-date-picker v-model="params.date" 
						color="#fbab17" 
						locale="ru" 
						first-day-of-week="1"
						no-title full-width
						:rules="[required('Дата')]" required>
					</v-date-picker><br/>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="px-5" align="center" justify="center">
				<v-col class="font-weight-bold grey--text text--darken-2" cols="12" sm="3" >
					<span>Время занятии </span> 
				</v-col>
				<v-col cols="5" sm="4" class="px-0">	
					<v-select v-model="params.timeFrom"
							@change="changeTimeFrom" 
							:items="timesFrom"
							label="00:00"
							color="#fbab17"
							solo rounded outlined flat dense hide-details hide-selected
							:rules="[required('Начала время')]" required>
					</v-select>
				</v-col>
				<v-col class="grey--text text--darken-2" cols="1">
					<span>-</span> 
				</v-col>
				<v-col cols="5" sm="4" class="px-0">	
					<v-select v-model="params.timeTo"
							:items="timesTo"
							label="00:00"
							color="#fbab17"
							solo rounded outlined flat dense hide-details hide-selected
							:rules="[required('Конец время')]" required>
					</v-select>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!--<v-row class="px-5 pt-6">
				<v-col class="pa-0">
					<v-select
						label="Тема урока"
						color="#fbab17"
						solo rounded outlined flat dense
						>
					</v-select>
				</v-col>
			</v-row>
			<v-row class="px-5 pt-6">
				<v-col class="pa-0">
					<v-select
						v-model="extraparams.level"
						:items="srezLevel"
						label="Уровень среза"
						color="#fbab17"
						solo rounded outlined flat dense
						:rules="[required('Уровень среза')]" required>
						>
					</v-select>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-select
						v-model="extraparams.room"
						:items="groupRooms"
						item-text="Room"
						label="Кабинет"
						color="#fbab17"
						return-object
						solo rounded outlined flat dense
						:rules="[requiredObject('Кабинет')]" required>
						>
					</v-select>
				</v-col>
			</v-row>-->
			<v-divider></v-divider>
			<v-row class="px-5 pt-9">
				<v-col>
					<v-btn class="rounded-btn white--text" :loading="click" @click="getGroup" block rounded height="50">Attendance list</v-btn>
				</v-col>
			</v-row>
			<InfoModal :dialog="dialog" :message="message" :path="path" />
			<Loading :overlay="overlay"/>
		</v-container>
	</v-form>
</template>

<script>
import InfoModal from '@/components/modal/Info'
import Loading from '@/components/modal/Loading'
import validations from '@/utils/validations'

export default {
	name: 'GroupForm',
	components: {
		InfoModal,
		Loading
	},
	props: {
		teacherId : String
	},
	data () {
		return {
			valid: true,
			params : {
				teacherId : this.teacherId,
				office: null,
				date : new Date().toISOString().substr(0, 10),
				timeFrom : null,
				timeTo : null,
				change: true
			},
			subTeachers:[],
			groupOffices: [],
			subTeacherName: null,
			isLoading: false,
			search: null,
			dialog: false,
			path : null,
			message : null,
			click: false,
			overlay: false,
			...validations
		}
	},
	async mounted(){
		
		await this.$store.dispatch('GetTeacherById', this.teacherId);				
		this.groupOffices = this.$store.state.offices;
		this.$store.dispatch('ResetGroup');
			
	},
	created(){
		var officeName = window.localStorage.officeName?JSON.parse(window.localStorage.officeName):{};
		if(!(Object.keys(officeName).length === 0 && officeName.constructor === Object)){
			this.params.office = officeName;
		}
		if(localStorage.timeFrom){
			this.params.timeFrom = localStorage.timeFrom;
			this.changeTimeFrom();
		}
		if(localStorage.timeTo)
			this.params.timeTo = localStorage.timeTo;
		if(localStorage.currentUser)
			this.$store.state.currentUser = JSON.parse(localStorage.currentUser);

	},
	computed : {
		offices(){	
			return this.$store.state.offices;
		},
		currentUser(){
			return this.$store.state.currentUser;
		},
		suboffices(){			
			return this.$store.state.suboffices;
		},
		timesFrom(){
			return this.$store.state.timesFrom;
		},
		timesTo(){
			return this.$store.state.timesTo;
		},
		subTeacher(){
			return this.$store.state.subTeacher;
		}
	},
	methods : {
		changeTimeFrom(){
			this.params.timeTo = null;
			this.$store.dispatch('changeTimesTo',this.params.timeFrom);
		},
		async getGroup(){
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					
					this.params.teacherId = this.currentUser.teacherId;
					if(this.params.teacherId == undefined || this.params.teacherId == null){
							this.click = false;
							this.message = "Обновите либо попробуйте перезайти в систему";
							this.dialog = true;
					}else{
						this.overlay = true;
						var result = await this.$store.dispatch('GetGroup', { params: this.params, subTeacher: this.subTeacher});
						console.log(result);
						this.overlay = false;
						if(result == undefined){
							this.click = false;
							this.message = "Проблемы с системой Hollyhope";
							this.dialog = true;
						}else if(result.status == 401 || result.status == 400){
							this.click = false;
							this.message = "Ваше время в системе истекло перезайдите";
							this.path = "/";
							this.dialog = true;
						}else if(result.status == 404){
							this.click = false;
							this.message = "Данной группы не сущчествует!";
							this.dialog = true;
						}else if(result.stats == 410){
							this.click = false;
							this.message = "Проблема с Hollyhope";
							this.dialog = true;
						}else if(result.status == 200){
							this.click = false;
							this.$router.push({path: '/group'});
						}
					}
				}
			}
		},
		async SetSubTeacher(subTeacherFullName){
			if(subTeacherFullName == undefined){
				this.$store.dispatch('ResetSubTeacher');
			} else {
				if(subTeacherFullName.TeacherId == this.teacherId){
						alert('Вы не можете сделать замену');
						this.$store.dispatch('ResetSubTeacher');
				}else{
						await this.$store.dispatch('GetSubTeacher',subTeacherFullName.TeacherId);
						localStorage.subTeacher = JSON.stringify(this.subTeacher);
						this.isLoading = false;
				}
			}
		}
	},
	watch:{
		async search (val) {
			this.isLoading = true;
			var response = await this.$store.dispatch('SearchTeacher',val);
			if(response.status == 200)
				this.subTeachers = response.data;
			else 
				this.$router.push('/') 
		},
		params:{
			handler: async function(newValue){
				if(newValue.timeFrom){
					localStorage.timeFrom = newValue.timeFrom;
				}
				if(newValue.timeTo){
					localStorage.timeTo = newValue.timeTo;
				}
				if(newValue.office){
					localStorage.officeName = JSON.stringify(newValue.office);
				}
				if(!newValue.change){
					this.$store.dispatch('ResetSubTeacher');
					this.search = null;
					this.isLoading = false;
				}
			},
			deep: true
		},
		subTeacher: function(){
			if(this.subTeacher.Id)
				this.groupOffices = this.suboffices;
			else
				this.groupOffices = this.offices;
		}
	}
}
</script>
<style scoped>
	.myform{
		background: #ffffff;
		border-radius: 12px;
	}

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 8px 5px rgba(196, 197, 197);
	}
</style>