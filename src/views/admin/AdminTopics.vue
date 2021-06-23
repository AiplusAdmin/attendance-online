<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="filteredTable"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Темы</v-toolbar-title>
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
											<v-text-field
												v-model="editedItem.Name"
												label="Тема"
												color="#fbab17"
											></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-select
												v-model="editedItem.Subject"
												label="Предмет"
												:items="Subjects"
												item-text="Name"
												return-object
												color="#fbab17"
											></v-select>
										</v-col>
										<v-col cols="12" sm="6">
											<v-select
												v-model="editedItem.Class"
												label="Класс"
												:items="Class"
												color="#fbab17"
											></v-select>
										</v-col>
										<v-col cols="12" sm="6">
											<v-select
												v-model="editedItem.Branch"
												label="Отделение"
												:items="Branch"
												color="#fbab17"
											></v-select>
										</v-col>
										<v-col cols="12" >
											<v-select
												v-model="editedItem.Level"
												label="Уровень"
												:items="Levels"
												item-text="Name"
												return-object
												color="#fbab17"
											></v-select>
										</v-col>
										<v-col cols="12" >
											<v-text-field
												v-model="editedItem.Priority"
												label="Очередность"
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
					<v-col class="pt-6 pb-0" v-for="headerselect in filterHeaders" :key="headerselect.value">
						<v-select
							rounded outlined flat multiple dense
							color="#fbab17"
							:label="headerselect.text"
							:items="columnValueList(headerselect.value)" 
							item-color='#fbab17'
							v-model="filters[headerselect.value]">
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
					text: 'Тема',
					value: 'Name'
				},
				{
					text: 'Класс',
					value: 'Class',
					filterable: true,
				},
				{
					text: 'Предмет',
					value: 'Subject',
					filterable: true,
				},
				{
					text: 'Отделение',
					value: 'Branch',
					filterable: true,
				},
				{
					text: 'Уровень',
					value: 'Level',
					filterable: true,
				},
				{
					text: 'Очередность',
					value: 'Priority'
				},
				{
					text: 'Action',
					value: 'actions'
				}
			],
			Levels : [],
			Subjects: [],
			Class : ['0','1','2','3','4','5','6','7','8','9','10','11'],
			Branch : ['КО','РО','КОРО'],
			filters: {
				Class: [],
				Subject: [],
				Branch: [],
				Level: [],
			},
		}
	},
	async mounted(){
		this.$store.dispatch('GetTableColumns',this.adminTable.Router);
		this.Levels = await this.$store.dispatch('GetExtraTableColumns','levels');
		this.Subjects = await this.$store.dispatch('GetExtraTableColumns','subjects');
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
				
				this.editedItem.SubjectId = this.editedItem.Subject.Id;
				this.editedItem.Subject = this.editedItem.Subject.Name;
				if(typeof this.editedItem.Level == 'object' && this.editedItem.Level != null){
					this.editedItem.Level = this.editedItem.Level.Name;
					this.editedItem.LevelId = this.editedItem.Level.Id;
				}else{
					this.editedItem.LevelId = null;
				}
				this.$store.dispatch('AdminEdit',{router: this.adminTable.Router, item: this.editedItem});
				Object.assign(this.adminItems[this.editedIndex],this.editedItem);
				
			} else {
				console.log(this.editedItem.Level);
				this.editedItem.SubjectId = this.editedItem.Subject.Id;
				this.editedItem.LevelId = this.editedItem.Level ? this.editedItem.Level.Id: null;
				this.$store.dispatch('AdminCreate',{router: this.adminTable.Router, item: this.editedItem});
				this.editedItem.Subject = this.editedItem.Subject.Name;
				this.editedItem.Level = this.editedItem.Level ?this.editedItem.Level.Name: null;
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