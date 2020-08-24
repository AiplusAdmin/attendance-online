<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold text-lg-h5">Attendance list</div>
			</v-col>
		</v-row>
		<v-row class="white" justify="start">		
			<v-col cols = "12" lg = "4" class="currentTeacher">
				<span class="font-weight-bold grey--text text--darken-2">Тренер</span>
				<p>{{currentTeacher.LastName +' '+currentTeacher.FirstName + ' ' + currentTeacher.MiddleName}}</p>
			</v-col>
			<v-col cols="12" lg="3">
				<DateModal />
			</v-col>
		</v-row>
		<v-row>
			<v-col class = "px-0" cols="12" lg="12">
				<v-data-table
					class="elevation-1"
					:headers="headers"
					:items = "currentRegister"
					:expanded.sync="expanded"
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
								dark>
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
					value: 'groupName'
				},
				{
					text: 'Время',
					value: 'time'
				},
				{
					text: 'Дни обучения',
					value: 'weekDays'
				},
				{
					text: 'Дата Урока',
					value: 'lessonDate'
				},
				{
					text: 'Дата Сабмита',
					value: 'submitDay'
				},
				{
					text: 'Время Сабмита',
					value: 'submitTime'
				},
				{
					text: '',
					value: 'data-table-expand'
				}
			],
			expandheaders: [
				{
					text: 'ID',
					value: 'clientId'
				},
				{
					text: 'ФИО студента',
					value: 'fullName'
				},
				{
					text: 'Присутвовал',
					value: 'pass'
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
					value: 'comment'
				},
			],
			expanded: [],
			expandedStudents:[]
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
	async mounted(){
		await this.$store.dispatch('GetRegisterByTeacherId', this.currentTeacher.Id);
	},
	methods: {
		async ShowMore(value){
			this.expandedStudents = await this.$store.dispatch('GetRegisterDetails', value.id);	
		},
		highlightClickedRow(value){
			const tr = value.target.parentNode;
			tr.classList.add('highlight');
		}
	}
}
</script>

<style scoped>

</style>