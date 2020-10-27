<template>
	<v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col cols="12" xl="2" lg="2">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col class="d-flex justify-end align-center" cols="12" xl="4" lg="4">
				<a class="pl-4 orange--text text-decoration-underline" @click="LogOut" >выйти</a>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="12">
				<AllJournalForm />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AllJournalForm from '@/components/AllJournalForm'

export default {
	name: 'AllJournal',
	components: {
		AllJournalForm
	},
	mounted() {
		var user = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{};
		
		if (user == undefined || (Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push({path:'/'});
		} else {
			this.$store.state.currentUser = user;
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