<template>
	<v-container fluid class="pa-0">
		<v-row class="d-flex justify-space-around align-center">
			<v-col  cols="6" sm="7">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col class="pt-4" cols="4" sm="4">
				<Edit />
			</v-col>
			<v-col  class="align-center pr-0" cols="2" sm="1" >
				<v-btn icon class="pl-4 orange--text" @click="LogOut">
					<v-icon>mdi-export</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

import Edit from '@/components/modal/Edit'

export default {
	name: 'HeaderEdit',
	components: {
		Edit
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