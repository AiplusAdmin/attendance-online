<template>
	<v-form v-model="valid" ref="form" class="myform px-0 py-6">
		<v-container class="">
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-select
						v-model="officeName"
						:items="offices"
						item-text="Name"
						label="Филиал"
						color="#fbab17"
						@input="getOfficeId"
						solo rounded outlined flat dense cache-items
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
			<v-row class="justify-end px-5">
				<v-col cols="12" lg="4">
					<v-checkbox v-model="params.change"  color="#fbab17" label="Замена"></v-checkbox>
				</v-col>
			</v-row>
			<v-row class="px-5" v-show="params.change">
				<v-col>
					<v-autocomplete
						:value="subTeacher"
						:items="subTeachers"
						item-text="fullName"
						item-value="teacherId"
						@input="SetSubTeacher"
						:loading="isLoading"
						:search-input.sync="search"
						no-data-text="Нет учителей"
						dense clearable
						label="ФИО Тренера" color="#fbab17"
					>
					</v-autocomplete>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col>
					<v-btn class="rounded-btn white--text" @click="getGroup" block rounded height="50">Журнал</v-btn>
				</v-col>
			</v-row>
			<InfoModal :dialog="dialog" message="Такой группы нет" path=""/>
		</v-container>
	</v-form>
</template>

<script>
import InfoModal from '@/components/modal/Info'
import validations from '@/utils/validations'

export default {
	name: 'GroupForm',
	props: {
		teacherId : String
	},
	components: {
		InfoModal
	},
	data () {
		return {
			valid: true,
			params : {
				teacherId : this.teacherId,
				officeId: '',
				date : new Date().toISOString().substr(0, 10),
				timeFrom : '',
				timeTo : '',
				change: false
			},
			officeName: "",
			subTeachers:[],
			isLoading: false,
			search: null,
			dialog: false,
			...validations
		}
	},
	async mounted(){
		await this.$store.dispatch('GetTeacherById', this.teacherId);
		var user = JSON.parse(window.localStorage.currentUser);
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push('/');
		}
	},
	created(){
		if(localStorage.officeName){
			this.officeName = localStorage.officeName;
			this.getOfficeId();
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
				var result = await this.$store.dispatch('GetGroup', { params: this.params, subTeacher: this.subTeacher});

				if(result.status)
					this.$router.push({path: '/group'});	
				else
					this.dialog = true;
			}
		},
		getOfficeId(){
			this.offices.find(office => {
				if(office.Name===this.officeName){
					this.params.officeId=office.Id
				}
			});
		},
		async SetSubTeacher(subTeacherId){
			if(subTeacherId == this.teacherId){
				alert('Вы не можете сделать замену');
				this.$store.state.subTeacher = {};
			}
			else{
				var response = await this.$store.dispatch('GetTeacherByTeacherId',subTeacherId);
				this.$store.state.subTeacher = response;
				this.isLoading = false;
			}
		}
	},
	watch:{
		async search (val) {
			this.isLoading = true
			var response = await this.$store.dispatch('SearchTeacher','*'+val+'*');
			this.subTeachers = response;
		},
		params:{
			handler: function(newValue){
				localStorage.timeFrom = newValue.timeFrom;
				localStorage.timeTo = newValue.timeTo;
			},
			deep: true
		},
		officeName: function(newOffice){
			localStorage.officeName = newOffice;
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