<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold text-lg-h5">Attendance list</div>
			</v-col>
			<v-col>
				<router-link class="pl-4 orange--text text-decoration-underline" :to="{path:`/teacher/${this.$store.state.currentTeacher.Id}`}">Назад</router-link>
			</v-col>
		</v-row>
		<v-row class="white" justify="start">		
			<v-col cols = "12" lg = "4" class="currentTeacher">
				<span class="font-weight-bold grey--text text--darken-2">Тренер</span>
				<p>{{currentTeacher.LastName +' '+currentTeacher.FirstName + ' ' + currentTeacher.MiddleName}}</p>
			</v-col>
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
					item-key="Id"
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
								hide-default-footer
								disable-pagination>
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
	name: 'JournalForm',
	components: {
		DateModal
	},
	data(){
		return{
			headers: [
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
					text: 'Присутвовал',
					value: 'Pass'
				},
				{
					text: 'Д.з',
					value: 'homework'
				},
				{
					text: 'Срез',
					value: 'test'
				},
				{
					text: 'Активность',
					value: 'lesson'
				},
				{
					text: 'Комментарии',
					value: 'Comment'
				},
			],
			expanded: [],
			expandedStudents:[],
			dateFrom: null,
			dateTo: null
		}
	},
	computed : {
		currentTeacher(){
			return this.$store.state.currentTeacher;
		},
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
		await this.$store.dispatch('GetRegisterByTeacherId',{teacherId:this.currentTeacher.Id, dateFrom: new Date().toISOString().substr(0, 10),dateTo: new Date().toISOString().substr(0, 10)});
	},
	created(){
		if(Object.entries(this.currentTeacher).length === 0)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
	},
	methods: {
		async ShowMore(value){
			if(value.value){
				var response = await this.$store.dispatch('GetRegisterDetails', {registerId: value.item.Id,dateFrom: this.dateFrom,dateTo: this.dateTo});
				if(response.status == 200){
					this.expandedStudents = response.data;
				} else {
					this.$router.push('/');
				}
			}
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
	},
	watch:{

	}
}
</script>

<style scoped>

</style>