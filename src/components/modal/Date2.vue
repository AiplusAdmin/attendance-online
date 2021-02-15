<template>
	<v-container class="py-0">
		<v-row class="px-2 py-0">
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
	</v-container>
	
</template>

<script>
export default {
	name: 'DateModal',
	data(){
		return{
			dateFrom: new Date().toISOString().substr(0, 10),
			menuFrom: false,
			modalFrom: false,
			dateTo: new Date().toISOString().substr(0, 10),
			menuTo: false,
			modalTo: false,
		}
	},
	mounted(){
		this.$parent.dateFrom = this.dateFrom;
		this.$parent.dateTo = this.dateTo;
	},
	methods:{
		async GetRegister(){
			this.$parent.$parent.dateFrom = this.dateFrom;
			this.$parent.$parent.dateTo = this.dateTo;
			await this.$store.dispatch('GetRegisterByTeacherId',{teacherId:this.$store.state.currentTeacher.Id, dateFrom: this.dateFrom,dateTo: this.dateTo});
			this.$refs.menuFrom.save(this.dateFrom);
			this.menuFrom = false;
			this.$refs.menuTo.save(this.dateTo);
			this.menuTo = false;
		}
	}
}
</script>

<style scoped>
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