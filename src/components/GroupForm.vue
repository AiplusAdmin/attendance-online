<template>
	<v-form v-model="valid" ref="form" class="myform px-0 py-6">
		<v-container class="">
			<v-row class="justify-end px-5">
				<v-col cols="12" lg="4">
					<v-checkbox v-model="params.change"  color="#fbab17" label="Замена"></v-checkbox>
				</v-col>
			</v-row>
			<v-row class="px-5" v-show="params.change">
				<v-col>
					<v-autocomplete
						:value="subTeacherName"
						:items="subTeachers"
						item-text="FullName"
						item-value= "FullName"
						@input="SetSubTeacher"
						:loading="isLoading"
						:search-input.sync="search"
						no-data-text="Нет учителей"
						dense clearable
						label="ФИО Тренера" color="#fbab17">
					</v-autocomplete>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-select
						v-model="officeName"
						:items="groupOffices"
						item-text="Name"
						label="Филиал"
						color="#fbab17"
						@input="getOfficeId"
						solo rounded outlined flat dense
						:rules="[required('Филиал')]" required>
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
				<v-col class="font-weight-bold grey--text text--darken-2" cols="12" lg="4" >
					<span>Время занятии </span> 
				</v-col>
				<v-col cols="12" lg="3">	
					<v-select v-model="params.timeFrom"
							@change="changeTimeFrom" 
							:items="timesFrom"
							label="00:00"
							color="#fbab17"
							solo rounded outlined flat dense hide-details hide-selected
							:rules="[required('Начала время')]" required>
					</v-select>
				</v-col>
				<v-col class="font-weight-bold grey--text text--darken-2" cols="12" lg="1">
					<span> - </span>
				</v-col>
				<v-col cols="12" lg="3">	
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
			<v-row class="px-5 pt-9">
				<v-col>
					<v-btn class="rounded-btn white--text" :loading="click" @click="getGroup" block rounded height="50">Журнал</v-btn>
				</v-col>
			</v-row>
			<InfoModal :dialog="dialog" :message="message" :path="path" />
		</v-container>
	</v-form>
</template>

<script>
import InfoModal from '@/components/modal/Info'
import validations from '@/utils/validations'

export default {
	name: 'GroupForm',
	components: {
		InfoModal
	},
	data () {
		return {
			valid: true,
			params : {
				teacherId : null,
				officeId: null,
				date : new Date().toISOString().substr(0, 10),
				timeFrom : null,
				timeTo : null,
				change: false
			},
			officeName: null,
			subTeachers:[],
			groupOffices: [],
			subTeacherName: null,
			isLoading: false,
			search: null,
			dialog: false,
			path : null,
			message : null,
			click: false,
			...validations
		}
	},
	async mounted(){
		
		var user = JSON.parse(window.localStorage.currentUser);
		
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push({path:'/'});
		} else {
			var currentTeacher = JSON.parse(window.localStorage.currentTeacher);
			if(currentTeacher == undefined || (Object.keys(currentTeacher).length === 0 && currentTeacher.constructor === Object))
				await this.$store.dispatch('GetTeacherById', user.teacherId);
			this.params.teacherId = user.teacherId;
			this.$store.dispatch('ResetGroup');
			this.groupOffices = this.offices;
		}
	},
	created(){
		if(localStorage.officeName){
			this.officeName = localStorage.officeName;
			this.getOfficeId(this.officeName);
		}
		if(localStorage.timeFrom){
			this.params.timeFrom = localStorage.timeFrom;
			this.changeTimeFrom();
		}
		if(localStorage.timeTo)
			this.params.timeTo = localStorage.timeTo;
		
	},
	computed : {
		offices(){	
			return this.$store.state.offices;
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
			this.$store.dispatch('changeTimesTo',this.params.timeFrom);
		},
		async getGroup(){
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					if(this.params.teacherId == undefined || this.params.teacherId == null){
							this.click = false;
							this.message = "Обновите либо попробуйте перезайти в систему";
							this.dialog = true;
					}else{
						var result = await this.$store.dispatch('GetGroup', { params: this.params, subTeacher: this.subTeacher});

						if(result.status == 200){
							this.click = false;
							this.$router.push({path: '/group'});
						}	
						else if(result.status == 401 || result.status == 400){
							this.click = false;
							this.message = "Ваше время в системе истекло перезайдите";
							this.path = "/";
							this.dialog = true;
						}else if(result.status == 404){
							this.message = "Такой группы нет";
							this.dialog = true;
							this.click = false;
						}else if(result.stats == 410){
							this.message = "Проблема с Hollyhope";
							this.dialog = true;
							this.click = false;
						}
					}
				}
			}
		},
		getOfficeId(officeName){
			var officeId = null;
			this.offices.filter(function(office){
				if(office.Name===officeName){
					officeId=office.Id
				}
			});
			this.params.officeId = officeId;
		},
		async SetSubTeacher(subTeacherFullName){
			if(subTeacherFullName == undefined){
				this.$store.dispatch('ResetSubTeacher');
			} else {
				var subTeacher = await this.$store.dispatch('GetTeacherByTeacherFullName',subTeacherFullName);
				if(subTeacher.status == 200){
					if(subTeacher.data.TeacherId == this.teacherId){
						alert('Вы не можете сделать замену');
						this.$store.dispatch('ResetSubTeacher');
					}
					else{
						await this.$store.dispatch('GetSubTeacher',subTeacher.data.TeacherId);
						this.isLoading = false;
					}
				} else {
					this.$router.push('/');
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
			handler: function(newValue){
				localStorage.timeFrom = newValue.timeFrom;
				localStorage.timeTo = newValue.timeTo;
				if(!newValue.change){
					this.$store.dispatch('ResetSubTeacher');
					this.search = null;
					this.isLoading = false;
				}
			},
			deep: true
		},
		officeName: function(newOffice){
			localStorage.officeName = newOffice;
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