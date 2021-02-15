<template>
  <v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col class="align-center" cols="7" sm="8" >
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115" ></v-img>
			</v-col>
			<v-col class="pt-4" cols="3" sm="1" lg="2">
				<Edit />
			</v-col>
			<v-col  class="align-center" cols="2" sm="1" >
				<v-btn icon class="pl-4 orange--text" @click="LogOut">
					<v-icon>mdi-export</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-center align-end">
			<v-col  cols="9"  sm="4" lg="3">
				<router-link class="orange--text text-decoration-none" :to="{path:`/teacher/${currentUser.teacherId}`}">Назад</router-link>
			</v-col>
			<v-col cols="3" sm="1" lg="1">
				<router-link class="pl-3 orange--text text-decoration-none" :to="{path:'/journal'}">Журнал</router-link>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-center">
			<v-col class = "px-0" cols="12" xl="5" lg="4" md="5" sm="7">
				<ChangeForm :teacherId="currentUser.teacherId"/>				
			</v-col>
		</v-row>
  </v-container>
</template>

<script>
import ChangeForm from '@/components/ChangeForm'
import Edit from '@/components/modal/Edit'

export default {

	components: {
		ChangeForm,
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
	computed:{
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
	.listnone{
		background: none;
	}
</style>