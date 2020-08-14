<template>
  <v-row class="d-flex justify-end">
    <v-dialog  v-model="dialog" persistent max-width="400">
      <template  v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
			ДОБАВИТЬ УЧЕНИКА
        </v-btn>
      </template>
		<v-card class="py-11 px-5">
			<v-card-title class="headline align-center justify-center">Добавить ученика</v-card-title>
				<v-text-field v-for="(student,index) in newStudents" :key="index" v-model="student.value"
					:append-outer-icon="student.icon" @click:append-outer="remove(index)" label="ФИО ученика" outlined rounded clearable ></v-text-field>
				<v-btn @click="add" block rounded><v-icon left>mdi-plus</v-icon>Добавить ученика</v-btn>
			<v-card-actions>
				<v-btn @click="dialog=false" rounded text>Отменить</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn @click="AddStudents" block rounded>Добавить</v-btn>
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