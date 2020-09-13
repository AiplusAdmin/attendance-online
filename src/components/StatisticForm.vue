<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold text-lg-h5">Attendance list Statistics</div>
			</v-col>
		</v-row>
		<v-row class="white" justify="start">		
			<v-col cols="12" lg="6">
				<DateModal />
			</v-col>
		</v-row>
		<v-row>
			<v-col class = "px-0" cols="12" lg="12">
				<v-data-table
					class="elevation-1"
					:headers="headers"
					:items = "currentRegister"
					item-key="GroupId"
					:expanded.sync="expanded"
					no-data-text = "Нет Записи"
					@item-expanded="ShowMore"
					@click:row="highlightClickedRow"
					show-expand
					single-expand
				>
					<template v-slot:expanded-item="{headers}">
						<td class="px-0" :colspan="headers.length">
							<v-data-table
								:headers="expandheaders"
								:items="expandedStudents"
								hide-default-footer>
							</v-data-table>
						</td>
					</template>
					
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DateModal from '@/components/modal/Date'

export default {
	name: 'StatisticForm',
	components: {
		DateModal
	},
	data(){
		return{
			headers: [
				{
					text: 'Id',
					value: 'GroupId'
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
					text: 'Преподаватель',
					value: 'teacher'
				},
				{
					text: '',
					value: 'data-table-expand'
				}
			],
			expandheaders: [
				{
					text: 'ID',
					value: 'ClientId'
				},
				{
					text: 'ФИО студента',
					value: 'FullName'
				},
				{
					text: 'Д.з',
					value: 'Homework'
				},
				{
					text: 'Срез',
					value: 'Test'
				},
				{
					text: 'Активность',
					value: 'Lesson'
				}
			],
			expanded: [],
			expandedStudents:[],
			dateFrom: null,
			dateTo: null
		}
	},
	computed : {
		currentRegister(){
			return this.$store.state.currentRegister;
		}
	},
	beforeCreate(){
		var user = JSON.parse(window.localStorage.currentUser);
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push('/');
		}
	},
	async mounted(){
		await this.$store.dispatch('GetUniqueRegister');
	},
	methods: {
		async ShowMore(value){
			if(value.value)
				this.expandedStudents = await this.$store.dispatch('GetRegisterDetailsAVG', {groupId: value.item.GroupId});
		},
		highlightClickedRow(value){
			const tr = value.target.parentNode;
			tr.classList.add('highlight');
		},
		addDay(day){
			var date = new Date(day);
			date.setDate(date.getDate()+1);
			return date.toISOString().substr(0, 10)
		}
	}
}
</script>

<style scoped>

</style>