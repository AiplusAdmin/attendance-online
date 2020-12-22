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
					class="elevation-1 studentsTable"
					:headers="headers"
					:items = "filteredDesserts"
					item-key="Id"
					:expanded.sync="expanded"
					@item-expanded="ShowMore"
					no-data-text = "Нет Записи"
					show-expand
					single-expand
				>
					<template v-slot:top>
						<v-row class="align-center justify-space-around px-2">
							<v-col class="pt-6 pb-0" v-for="header in filterHeaders" :key="header.text">
								<v-select 
									rounded outlined flat multiple clearable dense
									color="#fbab17"
									:label="header.text"
									:items="columnValueList(header.value)" 
									item-color='#fbab17'
									v-model="filters[header.value]">
								</v-select>
							</v-col>
						</v-row>
					</template>
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
					value: 'Name',
					filterable: true
				},
				{
					text: 'Отделение',
					value: 'Branch',
					filterable: true
				},
				{
					text: 'Группа',
					value: 'GroupName',
					filterable: true
				},
				{
					text: 'Предмет',
					value: 'Subject',
					filterable: true
				},
				{
					text: 'Время',
					value: 'Time',
					filterable: true
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
					value: 'FullName',
					filterable: true
				},
				{
					text: 'Кабинет',
					value: 'Room',
					filterable: true
				},
				{
					text: 'Уровень среза',
					value: 'LevelTest',
					filterable: true
				},
				{	
					text: 'Кол. Учеников',
					value: 'Passed'
				},
				{
					text: 'Общ. Кол. Учеников',
					value: 'All'
				},
				{
					text: '',
					value: 'data-table-expand'
				}
			],
			filters: {
				Name: [],
				GroupName: [],
				Subject: [],
				Time: [],
				FullName: [],
				Branch: [],
				LevelTest: [],
				Room: []
			},
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
			date: null
		}
	},
	computed : {
		adminRegisters(){
			return this.$store.state.adminRegisters;
		},
		filterHeaders:function(){
			return this.headers.filter(function(header){
				return header.filterable;
			});
		},
		filteredDesserts() {
			return this.adminRegisters.filter(d => {
				return Object.keys(this.filters).every(f => {
					return this.filters[f].length < 1 || this.filters[f].includes(d[f])
			});
		});
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
	},
	methods:{
		columnValueList(val) {
			return this.adminRegisters.map(d => d[val]);
		},
		async ShowMore(value){
			if(value.value){
				var response = await this.$store.dispatch('GetRegisterDetails', {registerId: value.item.Id});
				if(response.status == 200){
					this.expandedStudents = response.data;
				} else {
					this.$router.push('/');
				}
			}
		}
	}
}
</script>

<style scoped>

</style>