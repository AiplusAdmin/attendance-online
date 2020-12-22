<template>
  <v-row class="d-flex justify-end">
    <v-dialog  v-model="dialog" persistent max-width="400">
		<template  v-slot:activator="{ on, attrs }">
			<v-btn
				color="orange mr-1"
				dark
				fab
				v-bind="attrs"
				v-on="on"
				>
					<v-icon>mdi-account-multiple-plus-outline</v-icon>
			</v-btn>
		</template>
		<v-card class="py-9 px-5">
			<v-form v-model="valid" ref="form"> 
				<v-card-title class=" pb-11 headline align-center justify-center font-weight-bold text-lg-h6">Добавить ученика</v-card-title>
					<autocomplete class="pb-4" v-for="(newStudent,index) in newStudents" :key="index" :newStudent="newStudent" :index="index"/> 
					<v-btn class = "rounded-btn grey--text text--darken-2" @click="add" block rounded left><v-icon left>mdi-plus</v-icon>Добавить ученика</v-btn>
				<v-card-actions class="pt-11 pb-0 align-center justify-center">
					<v-btn class="orange--text" @click="Cancel" rounded text>Отменить</v-btn>
				</v-card-actions>
				<v-card-actions>
					<v-btn class="rounded-btn-orange white--text" :loading="click" :height="48" @click="AddStudents" block rounded>Добавить</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import validations from '@/utils/validations'
import autocomplete from '@/components/modal/autocomplete'
export default {
	name: 'Add',
	components:{
		autocomplete
	},
	data(){
		return {
			valid: true,
			dialog : false,
			click: false,
			...validations
		}
	},
	computed:{
		newStudents(){
			return this.$store.state.newStudents;
		}
	},
	methods: {
		add(){
			this.newStudents.push({
				value: null,
				icon: 'mdi-close',
			});
		},
		async AddStudents(){
			if(!this.valid)
				this.$refs.form.validate();
			else {
				if(!this.click){
					this.click = true;
					var response = await this.$store.dispatch('AddStudentGroup', {students: this.newStudents, group: this.$store.state.currentGroup});
					if(response.status == 200){
						this.click = false;
						this.newStudents = [{value:null,icon:''}];
						this.dialog = false;
					}
				}
			}
		},
		Cancel(){
			this.$store.dispatch('ResetNewStudents');
			this.dialog = false;
		}
	}
}
</script>

<style scoped>
	.rounded-btn{
		border: 1px solid rgb(214,214,216);
		background-image: linear-gradient(to bottom,rgb(255,255,255) 0%,rgb(214,214,216) 100%);
	}

	.rounded-btn-orange{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>