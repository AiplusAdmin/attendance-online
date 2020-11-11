<template>
	<v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col  cols="8" xl="7" lg="7" md="7" sm="8">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col  class="align-center" cols="2" sm="1" >
				<v-btn icon class="pl-4 orange--text" @click="LogOut">
					<v-icon>mdi-export</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="12">
				<StatisticForm />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import StatisticForm from '@/components/StatisticForm'

export default {
	name: 'Statistic',
	components: {
		StatisticForm
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