<template>
  <v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col  cols="4" xl="2" lg="2" md="2" sm="2">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115" ></v-img>
			</v-col>
			<v-col  cols="8"  xl="4" lg="4" md="4" sm="5"> 
				<div class="text-center text-lg-h6 text-md-h6 text-sm-h6 text-h6 font-weight-bold">ДОБРО ПОЖАЛОВАТЬ УЧИТЕЛЬ</div>
			</v-col>
			<v-col  cols="2" xl="1" lg="2" md="2" sm="2" >
				<router-link class="orange--text text-decoration-underline" :to="{path:'/journal'}">Журнал</router-link>
				<a class="pl-5 orange--text text-decoration-underline" @click="LogOut" >выйти</a>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-center">
			<v-col class = "px-0" cols="12" xl="5" lg="4" md="5" sm="7">
				<GroupForm :teacherId="this.teacherId"/>
			</v-col>
		</v-row>
  </v-container>
</template>

<script>
import GroupForm from '@/components/GroupForm'

export default {
	props: {
		teacherId : String
	},
	components: {
		GroupForm
	},
	beforeCreate() {
		var user = JSON.parse(window.localStorage.currentUser);
		if ((Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push('/');
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