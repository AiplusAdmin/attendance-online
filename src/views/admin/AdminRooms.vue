<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="filteredTable"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Кабинеты</v-toolbar-title>
					<v-divider
						class="mx-4"
						inset
						vertical
					></v-divider>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Поиск"
						color="#fbab17"
						single-line
						hide-details
					></v-text-field>
					<v-spacer></v-spacer>
					<v-dialog
						v-model="dialog"
						max-width="500px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="#fbab17"
								dark
								class="mb-2"
								v-bind="attrs"
								v-on="on"
							>
								Добавить
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12">
											<v-select
												v-model="editedItem.School"
												label="Школа"
												:items="Schools"
												item-text="Name"
												return-object
												color="#fbab17"
											></v-select>
										</v-col>
										<v-col cols="12" >
											<v-text-field
												v-model="editedItem.Room"
												label="Кабинет"
												color="#fbab17"
											></v-text-field>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
								color="#fbab17"
								text
								@click="close"
								>
									Отмена
								</v-btn>
								<v-btn
								color="#fbab17"
								text
								@click="save"
								>
									Сохранить
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="headline">Вы уверены ?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="#fbab17" text @click="closeDelete">Отмена</v-btn>
								<v-btn color="#fbab17" text @click="deleteItemConfirm">Удалить</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
				<v-row class="align-center justify-space-around px-2">
					<v-col class="pt-6 pb-0" v-for="header in filterHeaders" :key="header.text">
						<v-select
							rounded outlined flat multiple dense
							color="#fbab17"
							:label="header.text"
							:items="columnValueList(header.value)" 
							item-color='#fbab17'
							v-model="filters[header.value]">
						</v-select>
					</v-col>
				</v-row>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-row class="pa-2">
						<v-icon small color="#fbab17" class="mr-1" @click="editItem(item)">mdi-pencil</v-icon>
						<v-icon small  color="#fbab17" @click="deleteItem(item)">mdi-delete</v-icon>
				</v-row>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
export default {
	data(){
		return {
			dialog: false,
			editedItem: {},
			deletedItem: {},
			editedIndex: -1,
			deletedIndex: -1,
			dialogDelete: false,
			defaultItem: {},
			search: '',
			headers:[
				{
					text: 'Id',
					value: 'Id'
				},
				{
					text: 'Филиал',
					value: 'School',
					filterable: true,
				},
				{
					text: 'Кабинет',
					value: 'Room'
				},
				{
					text: 'Action',
					value: 'actions'
				}
			],
			Schools : [],
			filters: {
				School: [],
			},
		}
	},
	async mounted(){
		this.$store.dispatch('GetTableColumns',this.adminTable.Router);
		this.Schools = await this.$store.dispatch('GetExtraTableColumns','schools');
	},
	computed:{
		adminTable(){
			return this.$store.state.adminTable;
		},
		adminItems(){
			return this.$store.state.adminItems;
		},
		formTitle () {
			return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
		},
		filterHeaders:function(){
			return this.headers.filter(function(header){
				return header.filterable;
			});
		},
		filteredTable() {
			return this.adminItems.filter(d => {
				return Object.keys(this.filters).every(f => {
					return this.filters[f].length < 1 || this.filters[f].includes(d[f])
				});
			});
		}
	},
	methods:{
		editItem (item) {
			this.editedIndex = this.adminItems.indexOf(item);
			this.editedItem =  Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem (item) {
			this.deletedIndex = this.adminItems.indexOf(item);
			this.deletedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},
		deleteItemConfirm () {
			this.adminItems.splice(this.deletedIndex, 1);
			this.$store.dispatch('AdminDelete',{router: this.adminTable.Router, Id: this.deletedItem.Id});
			this.closeDelete();
		},
		close () {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		closeDelete () {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.deletedItem = Object.assign({}, this.defaultItem)
				this.deletedIndex = -1
			});
		},

		save () {
			if (this.editedIndex > -1) {
				this.editedItem.SchoolId = this.editedItem.School.SchoolId;
				this.editedItem.School = this.editedItem.School.Name;
				this.$store.dispatch('AdminEdit',{router: this.adminTable.Router, item: this.editedItem});
				Object.assign(this.adminItems[this.editedIndex],this.editedItem);
				
			} else {
				this.editedItem.SchoolId = this.editedItem.School.SchoolId;
				this.$store.dispatch('AdminCreate',{router: this.adminTable.Router, item: this.editedItem});
				this.editedItem.School = this.editedItem.School.Name;
				this.adminItems.push(this.editedItem);
			}
			this.close();
		},
		columnValueList(val) {
			var s = this.adminItems.map(d => d[val]);
			return s;
		},
	},
}
</script>