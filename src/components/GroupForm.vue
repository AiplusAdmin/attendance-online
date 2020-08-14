<template>
	<v-form class="myform px-0 py-6">
		<v-container class="">
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-select
						v-model="params.officeId"
						:items="offices"
						item-text="Name"
						item-value="Id"
						label="Филиал"
						color="#fbab17"
						solo rounded outlined flat dense >
					</v-select>
				</v-col>
			</v-row>
			<v-row class="px-5">
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
						no-title full-width>
					</v-date-picker><br/>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="px-5" align="center">
				<v-col cols="12" lg="4">
					<span>Время занятии </span> 
				</v-col>
				<v-col cols="12" lg="3">	
					<v-select v-model="params.timeFrom"
							@change="changeTimeFrom" 
							:items="timesFrom"
							label="00:00"
							solo rounded outlined flat dense>
					</v-select>
				</v-col>
				<v-col cols="12" lg="1">
					<span> - </span>
				</v-col>
				<v-col cols="12" lg="3">	
					<v-select v-model="params.timeTo"
							:items="timesTo"
							label="00:00"
							solo rounded outlined flat dense>
					</v-select>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="justify-end px-5">
				<v-col cols="12" lg="4">
					<v-checkbox v-model="params.change" label="Замена"></v-checkbox>
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
						label="ФИО Тренера"
					>
						<template>
							
						</template>
					</v-autocomplete>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col>
					<v-btn @click="getGroup" block rounded height="42">Журнал</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
	name: 'GroupForm',
	props: {
		teacherId : String
	},
	data () {
		return {
			params : {
				teacherId : this.teacherId,
				officeId : '',
				date : new Date().toISOString().substr(0, 10),
				timeFrom : '',
				timeTo : '',
				change: false
			},
			subTeachers:[],
			isLoading: false,
			search: null
		}
	},
	mounted(){
		this.$store.dispatch('GetTeacherById', this.teacherId);
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
			var result = await this.$store.dispatch('GetGroup', { params: this.params, subTeacher: this.subTeacher});
			if(result.status)
				this.$router.push({path: '/group'});	
			else {
				alert(result.error);
			}
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
        }
	}
}
</script>
<style scoped>
	.myform{
		background: #ffffff;
		border-radius: 12px;
	}
</style>