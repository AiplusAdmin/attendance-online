<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold text-lg-h5">Attendance list</div>
			</v-col>
		</v-row>
		<v-row class="white" justify="start">		
			<v-col cols="12" lg="6">
				<OneDateModal />
			</v-col>
		</v-row>
		<v-row>
			<v-col class = "px-0" cols="12" lg="12">
				<v-data-table
					class="elevation-1"
					:headers="headers"
					:items = "adminRegisters"
					no-data-text = "Нет Записи"
				>
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import OneDateModal from '@/components/modal/OneDate'

export default {
	name: 'AllJournalForm',
	components: {
		OneDateModal
	},
	data(){
		return{
			headers: [
				{
					text: 'Id',
					value: 'Id'
				},
				{
					text: 'Филиал',
					value: 'Name'
				},
				{
					text: 'Группа',
					value: 'GroupName'
				},
				{
					text: 'Время',
					value: 'Time'
				},
				{
					text: 'Дни обучения',
					value: 'WeekDays'
				},
				{
					text: 'Дата Урока',
					value: 'LessonDate'
				},
				{
					text: 'Дата Сабмита',
					value: 'SubmitDay'
				},
				{
					text: 'Время Сабмита',
					value: 'SubmitTime'
				},
				{
					text: 'Преподаватель',
					value: 'FullName'
				},
				{
					text: 'Кол. Учеников',
					value: 'All'
				},
			
			],
			date: null
		}
	},
	computed : {
		adminRegisters(){
			return this.$store.state.adminRegisters;
		}
	},
	beforeCreate(){
		var user = JSON.parse(window.localStorage.currentUser);
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push('/');
		}
	},
	async mounted(){
		await this.$store.dispatch('GetRegisterToAdmin',{date: new Date().toISOString().substr(0, 10)});
	}
}
</script>

<style scoped>

</style>