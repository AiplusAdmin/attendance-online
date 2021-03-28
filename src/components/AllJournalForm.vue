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
					:search="search"
					@item-expanded="ShowMore"
					no-data-text = "Нет Записи"
					show-expand
					single-expand
				>
					<template v-slot:top>
						<v-toolbar flat>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="search"
										append-icon="mdi-magnify"
										label="Поиск"
										color="#fbab17"
										single-line
										hide-details
									></v-text-field>
								</v-col>
							</v-row>
						</v-toolbar>
						<v-row class="align-center justify-space-around px-2">
								<v-col class="pt-6 pb-0" v-for="header in filterHeaders" :key="header.text">
									<v-select v-if="header.value == 'FullName'"
										rounded outlined flat clearable dense
										color="#fbab17"
										:label="header.text"
										:items="columnValueList(header.value)" 
										item-color='#fbab17'
										@change="CalculateDays"
										@click:clear="Clear"
										v-model="filters[header.value]">
									</v-select>
									<v-select v-else
										rounded outlined flat multiple clearable dense
										color="#fbab17"
										:label="header.text"
										:items="columnValueList(header.value)" 
										item-color='#fbab17'
										@click:clear="Clear"
										v-model="filters[header.value]">
									</v-select>
								</v-col>
							</v-row>
					</template>
					<template v-slot:[`item.Fine`]="{ item }">
						<v-text-field v-model="item.Fine"
							type="text" 
							color="#fbab17"
							@change='addFine(item)'
						>
						</v-text-field>
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
		<v-row class="white" >
			<v-col cols="12">
				<v-list class="pa-0 listnone">
					<v-subheader class="pa-0 text-subtitle-2 text-uppercase font-weight-bold grey--text text--darken-2">Тренер</v-subheader>
					<v-list-item dense inactive class="pa-0 teacher-rounded">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="filters.FullName"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item dense inactive class="pa-0">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="'90 минут'"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<p>{{lesson}}</p>
						</v-list-item-action>
					</v-list-item>
					<v-list-item dense inactive class="pa-0">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="'45 минут'"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<p>{{halflesson}}</p>
						</v-list-item-action>
					</v-list-item>
					<v-list-item dense inactive class="pa-0">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="'60 минут'"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<p>{{hour}}</p>
						</v-list-item-action>
					</v-list-item>
					<v-list-item dense inactive class="pa-0">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="'Тренера заменяли'"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<p>{{change}}</p>
						</v-list-item-action>
					</v-list-item>
				</v-list>
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
					value: 'Id',
				},
				{
					text: 'Филиал',
					value: 'Name',
					filterable: true,
				},
				{
					text: 'Отделение',
					value: 'Branch',
					filterable: true,
				},
				{
					text: 'Группа',
					value: 'GroupName',
					filterable: true,
				},
				{
					text: 'Предмет',
					value: 'Subject',
					filterable: true,
				},
				{
					text: 'Время',
					value: 'Time',
					filterable: true,
				},
				{
					text: 'Дни обучения',
					value: 'WeekDays',
				},
				{
					text: 'Дата Урока',
					value: 'LessonDate',
				},
				{
					text: 'Дата Сабмита',
					value: 'SubmitDay',
				},
				{
					text: 'Время Сабмита',
					value: 'SubmitTime',
				},
				{
					text: 'Преподаватель',
					value: 'FullName',
					filterable: true,
				},
				{
					text: 'Кабинет',
					value: 'Room',
					filterable: true,
				},
				{
					text: 'Уровень среза',
					value: 'LevelTest',
					filterable: true,
				},
				{	
					text: 'Айбаксы',
					value: 'Aibucks',
				},
				{	
					text: 'Тема Урока',
					value: 'Topic',
				},
				{	
					text: 'Заменяемый Препод',
					value: 'SubFullName',
					filterable: true,
				},

				{	
					text: 'Кол. Учеников',
					value: 'Passed',
				},
				{
					text: 'Общ. Кол. Учеников',
					value: 'All',
				},
				{
					text: 'Опоздание (мин.)',
					value: 'Fine',
				},
				{
					text: '',
					value: 'data-table-expand',
				}
			],
			filters: {
				Name: [],
				GroupName: [],
				Subject: [],
				Time: [],
				FullName: '',
				Branch: [],
				LevelTest: [],
				Room: [],
				SubFullName: [],
			},
			expandheaders: [
				{
					text: 'ID',
					value: 'ClientId',
					sortable: false,
					divider: true,

				},
				{
					text: 'ФИО студента',
					value: 'FullName',
					sortable: false,
					divider: true,
				},
				{
					text: 'Присутвовал',
					value: 'Pass',
					sortable: false,
					divider: true,
				},
				{
					text: 'Д.з',
					value: 'homework',
					sortable: false,
					divider: true,
				},
				{
					text: 'Срез',
					value: 'test',
					sortable: false,
					divider: true,
				},
				{
					text: 'Активность',
					value: 'lesson',
					sortable: false,
					divider: true,
				},
				{
					text: 'Комментарии',
					value: 'Comment',
					sortable: false,
					divider: true
				},
			],
			search: '',
			expanded: [],
			expandedStudents:[],
			dateFrom: null,
			dateTo: null,
			lesson: 0,
			halflesson: 0,
			hour: 0,
			change: 0 
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
		await this.$store.dispatch('GetRegisterToAdmin',{dateFrom: new Date().toISOString().substr(0, 10),dateTo: new Date().toISOString().substr(0, 10)});
	},
	methods:{
		columnValueList(val) {
			var s = this.adminRegisters.map(d => d[val]);
			if(val == 'FullName' || val == 'SubFullName'){
				return s.sort();
			} else {
				return s;
			}
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
		},
		addFine(item){
			this.$store.dispatch('UpdateRegiterFine',item);
		},
		CalculateDays(){
			var lesson = 0;
			var halflesson = 0;
			var hour = 0;
			var teacher = this.filters.FullName;
			this.filteredDesserts.map(function(register){
				var arrTime = register.Time.split('-');
				var arrStart = arrTime[0].split(':');
				var arrEnd = arrTime[1].split(':');
				var time = (arrEnd[0] - arrStart[0])*60 + (arrEnd[1]-arrStart[1]);
				if(time == 90){
					lesson= lesson + 1;
				} else if (time == 60){
					hour = hour +1;
				} else {
					halflesson = halflesson + 1;
				}
			});
			var changeFilter = this.adminRegisters.filter(elem => elem.SubFullName == teacher);
			this.lesson = lesson;
			this.halflesson = halflesson;
			this.hour = hour;
			this.change = changeFilter.length;
		},
		Clear(){
			this.filteredDesserts = this.adminRegisters;
		}
		
	}
}
</script>

<style scoped>

</style>