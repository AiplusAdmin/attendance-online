<template>
	<v-menu
        ref="menu"
		v-model="menu"
		:close-on-content-click="false"
		:return-value.sync="date"
		transition="scale-transition"
		offset-y
		max-width="290px"
		min-width="290px">
        <template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-model="date"
				label="Picker in menu"
				prepend-icon="mdi-calendar-multiple"
				readonly
				v-bind="attrs"
				v-on="on"
            ></v-text-field>
        </template>
		<v-date-picker
			v-model="date"
            type="date"
			locale="ru"
			first-day-of-week="1"
            no-title>
			<v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">ОТМЕНИТЬ</v-btn>
            <v-btn text color="primary" @click="GetRegister">ОК</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
export default {
	name: 'DateModal',
	data(){
		return{
			date: new Date().toISOString().substr(0, 10),
			menu: false,
			modal: false,
		}
	},
	methods:{
		async GetRegister(){
			await this.$store.dispatch('GetRegisterByTeacherId',{teacherId:this.$store.state.currentTeacher.Id, date: this.date})
			this.$refs.menu.save(this.date);
			this.menu = false;
		}
	}
}
</script>