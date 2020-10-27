<template>
	<v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col  cols="6" xl="7" lg="7" md="7" sm="7">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col class="d-flex justify-end align-center" cols="3" xl="3" lg="3" md="3" sm="3">
				<h4 class="grey--text text--darken-2">{{currentUser.lastname +' '+currentUser.firstname}}</h4>
			</v-col>
			<v-col cols="3" xl="1" lg="1" md="1" sm="1">
				<a class="pl-4 orange--text text-decoration-underline" @click="LogOut" >выйти</a>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="12">
				<JournalForm />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import JournalForm from '@/components/JournalForm'

export default {
	name: 'Journal',
	components: {
		JournalForm
	},
	mounted() {
		var user = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{};
		
		if (user == undefined || (Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push({path:'/'});
		} else {
			this.$store.state.currentUser = user;
		}
	},
	computed: {
		currentUser(){
			return this.$store.state.currentUser;
		}
	},
	methods: {
		LogOut(){
			this.$store.dispatch('LogOut');
			this.$router.push('/');
		}
	}
}
</script>

<style scoped>

</style>