<template>
	<v-container>
		<v-row>
			<v-col cols="12" lg="6">
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
							label="Дата"
							color="#fbab17"
							readonly
							v-bind="attrs"
							v-on="on"
						>
							<template v-slot:prepend>
								<v-icon color="#fbab17">mdi-calendar-multiple</v-icon>
							</template>
						</v-text-field>
					</template>
					<v-date-picker
						v-model="date"
						type="date"
						locale="ru"
						color="#fbab17"
						first-day-of-week="1"
						no-title>
						<v-spacer></v-spacer>
						<v-btn text color="orange" @click="menu = false">ОТМЕНИТЬ</v-btn>
						<v-btn text color="orange" @click="GetRegister">ОК</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>
		</v-row>
	</v-container>
	
</template>

<script>
export default {
	name: 'OneDateModal',
	data(){
		return{
			date: new Date().toISOString().substr(0, 10),
			menu: false,
			modal: false
		}
	},
	mounted(){
		this.$parent.date = this.date;
	},
	methods:{
		async GetRegister(){
			this.$parent.$parent.date = this.date;
			await this.$store.dispatch('GetRegisterToAdmin',{date: this.date});
			this.$refs.menu.save(this.date);
			this.menu = false;
		}
	}
}
</script>