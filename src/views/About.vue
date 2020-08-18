<template>
  <v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col  cols="4" xl="2" lg="2" md="2" sm="2">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col  cols="9"  xl="4" lg="4" md="4" sm="5"> 
				<h3>ДОБРО ПОЖАЛОВАТЬ УЧИТЕЛЬ</h3>
			</v-col>
			<v-col  cols="3" xl="1" lg="1" md="2" sm="2" >
				<v-btn @click="LogOut" text>Выйти</v-btn>
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