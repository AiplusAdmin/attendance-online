<template>
  <v-container fluid>
		<HeaderEdit />
		<v-row class="d-flex justify-center align-end">
			<v-col cols="9"  sm="4" lg="4" :class=" isMobile?'':'px-0'">
				<v-list class="pa-0 listnone">
					<v-subheader class="pa-0 text-subtitle-2 text-uppercase font-weight-bold grey--text text--darken-2">Добро пожаловать</v-subheader>
					<v-list-item dense inactive class="pa-0 teacher-rounded">
						<v-list-item-content class="pa-0">
							<v-list-item-title class="text-subtitle-1 text-uppercase font-weight-bold grey--text text--darken-4" v-text="currentUser.lastname + ' ' + currentUser.firstname"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col cols="3 pb-6 " sm="1" lg="1">
				<router-link class="pl-3 orange--text text-decoration-none" :to="{path:'/journal'}">Журнал</router-link>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-center">
			<v-col class = "pa-0" cols="12" xl="5" lg="4" md="5" sm="7">
				<GroupForm :teacherId="teacherId"/>				
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import GroupForm from '@/components/GroupForm'
import HeaderEdit from '@/components/HeaderEdit'

export default {
	props: {
		teacherId : String
	},
	components: {
		GroupForm,
		HeaderEdit
	},
	data(){
		return {
			isMobile: false
		}
	},
	mounted() {
		this.onResize();
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
		},
		onResize(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': 
					this.isMobile = true;
					break;
				default:
					this.isMobile = false;
			}
		}
	}
}
</script>
<style scoped>
	.listnone{
		background: none;
	}
</style>