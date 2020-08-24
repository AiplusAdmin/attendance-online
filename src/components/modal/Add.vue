<template>
  <v-row class="d-flex justify-end">
    <v-dialog  v-model="dialog" persistent max-width="400">
      <template  v-slot:activator="{ on, attrs }">
        <v-btn
			class = "rounded-btn px-5 py-6"
			v-bind="attrs"
			v-on="on"
			rounded
        >
			<v-icon class = "grey--text text--darken-2" left>mdi-plus</v-icon>
			<span class="pl-4 grey--text text--darken-2">ДОБАВИТЬ УЧЕНИКА</span>
        </v-btn>
      </template>
		<v-card class="py-9 px-5">
			<v-card-title class="pb-11 headline align-center justify-center font-weight-bold text-lg-h6">Добавить ученика</v-card-title>
				<v-text-field  class="pb-0" v-for="(student,index) in newStudents" :key="index" v-model="student.value"
					:append-outer-icon="student.icon" @click:append-outer="remove(index)" label="ФИО ученика" color="#fbab17" outlined rounded clearable dense></v-text-field>
				<v-btn class = "rounded-btn grey--text text--darken-2" @click="add" block rounded left><v-icon left>mdi-plus</v-icon>Добавить ученика</v-btn>
			<v-card-actions class="pt-11 pb-0 align-center justify-center">
				<v-btn class="orange--text" @click="dialog=false" rounded text>Отменить</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn class="rounded-btn-orange white--text" height="48" @click="AddStudents" block rounded>Добавить</v-btn>
			</v-card-actions>
		</v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
	name: 'Add',
	data(){
		return {
			dialog : false,
			newStudents : [{value:'',icon:''}]
		}
	},
	methods: {
		add(){
			this.newStudents.push({ 
				value: '',
				icon: 'mdi-close'
			});
		},
		remove(index){
			this.newStudents.splice(index, 1);
		},
		async AddStudents(){
			var response = await this.$store.dispatch('AddStudentGroup', {students: this.newStudents, group: this.$store.state.currentGroup});
			if(response.status)
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