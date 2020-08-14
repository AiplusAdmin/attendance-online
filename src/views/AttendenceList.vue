<template>
	<v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col cols="12" xl="2" lg="2">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col class="d-flex justify-end align-center" cols="12" xl="4" lg="4">
				<h4>ДОБРО ПОЖАЛОВАТЬ УЧИТЕЛЬ</h4>
				<v-btn @click="LogOut" text>Выйти</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="12">
				<AttendenceForm />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AttendenceForm from '@/components/AttendenceForm'
export default {
	name: 'AttendenceList',
	components: {
		AttendenceForm
	},
	methods: {
		LogOut(){
			this.$store.dispatch('LogOut');
			this.$router.push('/');
		}
	}
}
</script>