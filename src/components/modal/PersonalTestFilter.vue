<template>
	<v-container>
		<v-row>
			<v-col cols="6" lg="6">
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
							v-model="dateFrom"
							label="От"
							color="#fbab17"
							prepend-icon="mdi-calendar-multiple"
							readonly
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
			<v-col cols="6" lg="6">
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
							v-model="dateTo"
							label="До"
							color="#fbab17"
							prepend-icon="mdi-calendar-multiple"
							readonly
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
		<v-row>
			<v-col class="pa-0">
				<v-select
					v-model="params.testCategory"
					:items="testCategories"
					item-text="Name"
					label="Категория теста"
					color="#fbab17"
					@change="changeTests" 
					solo rounded outlined flat dense
					return-object
					:rules="[requiredObject('Категория теста')]" required>
				</v-select>
			</v-col>
			<v-col class="pa-0">
				<v-select
					v-model="params.test"
					:items="tests"
					item-text="Name"
					label="Тест"
					color="#fbab17"
					solo rounded outlined flat dense
					return-object
					:rules="[requiredObject('Тест')]" required>
				</v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-btn class="rounded-btn grey--text text--darken-2 font-weight-bold" @click="GetPersonalTests" height="60" primary block>Поиск</v-btn>
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
			testCategories: [],
			tests: [],
			params:{
				testCategory: null,
				test: null,
			},
			...validations
		}
	},
	async mounted(){
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
			var res = await this.$store.dispatch('GetPersonalTestTeacherId',{teacherId:this.$store.state.currentTeacher.Id, dateFrom: this.dateFrom,dateTo: this.dateTo, testId: this.params.test.Id});
			console.log(res);
		}
		
	}
}
</script>
<style scoped>
	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>