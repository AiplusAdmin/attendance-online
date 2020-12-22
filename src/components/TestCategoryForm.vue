<template>
	<v-form v-model="valid" ref="form" class="myform px-0 py-6">
		<v-container class="">
			<v-row class="px-5">
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
			</v-row>
			<v-row class="px-5">
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
			<v-row class="px-5 font-weight-bold grey--text text--darken-2">
				<v-col>
					Дата теста
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col class="pa-0">
					<v-date-picker
						v-model="params.date"
						color="#fbab17" 
						locale="ru" 
						first-day-of-week="1"
						no-title full-width
						:rules="[required('Дата')]" required>
					</v-date-picker><br/>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="px-5 pt-9">
				<v-col>
					<v-btn class="rounded-btn white--text" :loading="click" @click="getTests" block rounded height="50">Тест</v-btn>
				</v-col>
			</v-row>
			<Loading :overlay="overlay"/>
		</v-container>
	</v-form>
</template>

<script>
import Loading from '@/components/modal/Loading'
import validations from '@/utils/validations'

export default {
	name: 'TestCategoryForm',
	components: {
		Loading
	},
	props: {
		teacherId : String
	},
	data () {
		return {
			click: false,
			overlay: false,
			valid: true,
			testCategories: [],
			tests: [],
			params:{
				testCategory: null,
				test: null,
				date:  new Date().toISOString().substr(0, 10)
			},
			...validations
		}
	},
	async mounted(){
		this.testCategories = await this.$store.dispatch('GetTestCategories');
	},
	methods : {
		async changeTests(newValue){
			this.tests = await this.$store.dispatch('GetTests',{testcategoryid: newValue.Id});
		},
		getTests(){
			console.log('HEY');
			this.$store.dispatch('GetPersonalTest', { params: this.params});
			this.$router.push('/tests');
		}
	}
}
</script>
<style scoped>
	.myform{
		background: #ffffff;
		border-radius: 12px;
	}

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 8px 5px rgba(196, 197, 197);
	}
</style>