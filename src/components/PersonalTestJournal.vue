<template>
	<v-container>
		<v-row class="d-flex flex-row" align="center">
			<v-col cols="12" lg="2">
				<div class="font-weight-bold grey--text text--darken-3 text-h5">Персональные данные</div>
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
			</v-col>
		</v-row>
		<v-row>
			<v-col class = "px-0" cols="12" lg="12">
				<PersonalTestFilter />
			</v-col>
		</v-row>
		<v-row>
			<v-col class = "px-0" cols="12" lg="12">
				<v-data-table 
					class="studentsTable elevation-1"
					:headers="personalHeaders"
					:items = "filteredDesserts"
					no-data-text = "Нет Записи"
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
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

import PersonalTestFilter from '@/components/modal/PersonalTestFilter'

export default {
	name: 'PersonalTestJournal',
	components: {
		PersonalTestFilter
	},
	data(){
		return{
			dateFrom: null,
			dateTo: null,
			filters: {
				Student: [],
			}
		}
	},
	computed : {
		currentTeacher(){
			return this.$store.state.currentTeacher;
		},
		currentUser(){
			return this.$store.state.currentUser;
		},
		personalHeaders(){
			return this.$store.state.personalHeaders;
		},
		personalItems(){
			return this.$store.state.personalItems;
		},
		filterHeaders:function(){
			return this.$store.state.personalHeaders.filter(function(header){
				return header.filterable;
			});
		},
		filteredDesserts() {
			return this.$store.state.personalItems.filter(d => {
				return Object.keys(this.filters).every(f => {
					return this.filters[f].length < 1 || this.filters[f].includes(d[f])
				});
			});
		}
	},
	async mounted(){
		console.log(this.personalHeaders);
		console.log(this.personalItems);

	},
	created(){
		if(Object.entries(this.currentTeacher).length === 0)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
	},
	methods: {
		columnValueList(val) {
			return this.personalItems.map(d => d[val]);
		}
	}
}
</script>

<style scoped>
	.journal-round{
		border-radius: 12px;
	}
</style>