<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold grey--text text--darken-3 text-h5">Журнал</div>
			</v-col>
		</v-row>
		<v-row class="white journal-round" justify="start">		
			<v-col cols = "12" lg = "4" class="currentTeacher">
				<v-list class="pa-0 listnone">
					<v-subheader class="pa-0 text-subtitle-2 text-uppercase font-weight-bold grey--text text--darken-2">Учитель</v-subheader>
					<v-list-item dense inactive class="pa-0 teacher-rounded">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="currentUser.lastname + ' ' + currentUser.firstname"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col cols="12" lg="6">
				<DateModal />
			</v-col>
		</v-row>
		<v-row>
			<v-col class = "px-0" cols="12" lg="12">
				<v-data-table 
					class="studentsTable elevation-1"
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
					value: 'ClientId',
					sortable: false

				},
				{
					text: 'ФИО студента',
					value: 'FullName',
					sortable: false
				},
				{
					text: 'Присутвовал',
					value: 'Pass',
					sortable: false
				},
				{
					text: 'Д.з',
					value: 'homework',
					sortable: false
				},
				{
					text: 'Срез',
					value: 'test',
					sortable: false
				},
				{
					text: 'Активность',
					value: 'lesson',
					sortable: false
				},
				{
					text: 'Комментарии',
					value: 'Comment',
					sortable: false
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
		},
		currentUser(){
			return this.$store.state.currentUser;
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
	.journal-round{
		border-radius: 12px;
	}
</style>