<template>
	<v-container class="pt-0">
		<v-row>
			<v-list class="px-6 pb-1 pt-0">
				<v-subheader class="pa-0 text-subtitle-1 grey--text text--darken-1">Период времени</v-subheader>
			</v-list>
		</v-row>
		<v-row class="px-4 pb-0">
			<v-col cols="6" lg="6" class="pa-0">
				<v-menu
					ref="menuFrom"
					v-model="menuFrom"
					:close-on-content-click="false"
					:return-value.sync="dateFrom"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							class='fromdate'
							v-model="dateFrom"
							label="От"
							color="#fbab17"
							readonly outlined
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="dateFrom"
						type="date"
						locale="ru"
						color="#fbab17"
						first-day-of-week="1"
						no-title>
						<v-spacer></v-spacer>
						<v-btn text color="orange" @click="menuFrom = false">ОТМЕНИТЬ</v-btn>
						<v-btn text color="orange" @click="GetRegister">ОК</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>
			<v-col cols="6" lg="6" class="pa-0">
				<v-menu
					ref="menuTo"
					v-model="menuTo"
					:close-on-content-click="false"
					:return-value.sync="dateTo"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							class="todate"
							v-model="dateTo"
							label="До"
							color="#fbab17"
							readonly outlined
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="dateTo"
						type="date"
						color="#fbab17"
						locale="ru"
						first-day-of-week="1"
						no-title>
						<v-spacer></v-spacer>
						<v-btn text color="orange" @click="menuTo = false">ОТМЕНИТЬ</v-btn>
						<v-btn text color="orange" @click="GetRegister">ОК</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>
		</v-row>
		<v-row class="px-4">
			<v-col v-if="isMobile" class="pa-0">
				<v-dialog
					ref="testCategoryMenu"
					v-model="testCategoryModal"
					width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="testCategoryName"
							placeholder="Категория теста"
							color="#fbab17"
							append-icon="mdi-menu-right"
							readonly rounded outlined flat dense
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-card
						class="mx-auto"
						max-width="400"
						tile
					>
						<v-list dense>
							<v-subheader>
								<v-list-item inactive>
									<v-list-item-content>
										<v-list-item-title class="grey--text text--darken-3 font-weight-bold text-subtitle-1">Категория тестов</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-icon @click="closeTestCategoryModal" color="#fbab17">mdi-close-thick</v-icon>
									</v-list-item-action>
								</v-list-item>
							</v-subheader>
							<v-list-item-group>
								<v-list-item v-for="testCategory in testCategories" :key="testCategory.Id" @click="SetTestCategory(testCategory)">
									<v-list-item-content>
										<v-list-item-title >{{testCategory.Name}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col v-else class="pa-0">
				<v-select
					v-model="params.testCategory"
					:items="testCategories"
					item-text="Name"
					placeholder="Категория теста"
					color="#fbab17"
					@change="changeTests" 
					solo rounded outlined flat dense
					return-object
					:rules="[requiredObject('Категория теста')]" required>
				</v-select>
			</v-col>
		</v-row>
		<v-row class="px-4">
			<v-col v-if="isMobile" class="pa-0">
				<v-dialog
					ref="testMenu"
					v-model="testModal"
					width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="testName"
							placeholder="Теста"
							color="#fbab17"
							append-icon="mdi-menu-right"
							readonly rounded outlined flat dense
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-card
						class="mx-auto"
						max-width="400"
						tile
					>
						<v-list dense>
							<v-subheader>
								<v-list-item inactive>
									<v-list-item-content>
										<v-list-item-title class="grey--text text--darken-3 font-weight-bold text-subtitle-1">Тесты</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-icon @click="closeTest" color="#fbab17">mdi-close-thick</v-icon>
									</v-list-item-action>
								</v-list-item>
							</v-subheader>
							<v-list-item-group>
								<v-list-item v-for="test in tests" :key="test.Id" @click="SetTest(test)">
									<v-list-item-content>
										<v-list-item-title >{{test.Name}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col v-else class="pa-0">
				<v-select
					v-model="params.test"
					:items="tests"
					item-text="Name"
					placeholder="Тест"
					color="#fbab17"
					solo rounded outlined flat dense
					return-object
					:rules="[requiredObject('Тест')]" required>
				</v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-btn class="rounded-btn white--text font-weight-bold" @click="GetPersonalTests" height="60" primary block rounded>Поиск</v-btn>
			</v-col>
		</v-row>
	</v-container>
	
</template>

<script>
import validations from '@/utils/validations'

export default {
	name: 'PersonalTestFilter',
	data(){
		return{
			dateFrom: new Date().toISOString().substr(0, 10),
			menuFrom: false,
			modalFrom: false,
			dateTo: new Date().toISOString().substr(0, 10),
			menuTo: false,
			modalTo: false,
			testCategoryMenu: false,
			testCategoryModal: false,
			testCategoryName: null,
			testName: null,
			testMenu: false,
			testModal: false,
			testCategories: [],
			tests: [],
			params:{
				testCategory: null,
				test: null,
			},
			...validations,
			isMobile: false
		}
	},
	async mounted(){
		this.onResize();
		this.testCategories = await this.$store.dispatch('GetTestCategories');
		this.$parent.dateFrom = this.dateFrom;
		this.$parent.dateTo = this.dateTo;
	},
	methods:{
		GetRegister(){
			this.$parent.$parent.dateFrom = this.dateFrom;
			this.$parent.$parent.dateTo = this.dateTo;
			this.$refs.menuFrom.save(this.dateFrom);
			this.menuFrom = false;
			this.$refs.menuTo.save(this.dateTo);
			this.menuTo = false;
		},
		async changeTests(newValue){
			this.tests = await this.$store.dispatch('GetTests',{testcategoryid: newValue.Id});
		},
		async GetPersonalTests(){
			await this.$store.dispatch('GetPersonalTestTeacherId',{teacherId:this.$store.state.currentTeacher.Id, dateFrom: this.dateFrom,dateTo: this.dateTo, testId: this.params.test.Id});
		},
		SetTestCategory(testCategory){
			this.params.testCategory = testCategory;
			this.testCategoryName = testCategory.Name;
			this.changeTests(testCategory);
			this.testCategoryModal = false;
		},
		SetTest(test){
			this.params.test = test;
			this.testName = test.Name;
			this.testModal = false;
		},
		closeTestCategoryModal(){
			this.testCategoryModal = false;
		},
		closeTest(){
			this.testModal = false;
		},
		onResize(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': 
					this.isMobile = true;
					break;
				default:
					this.isMobile = false;
			}
		}
	}
}
</script>
<style scoped>
	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
	}

	.fromdate{
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.todate{
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: 30px;
		border-bottom-right-radius: 30px;
	}
</style>
