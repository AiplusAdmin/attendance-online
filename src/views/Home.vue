<template>
	<v-container fluid>
		<v-row>
			<v-img class="mx-auto mt-14 mb-12" src="@/assets/images/aiplusLogo.png" max-height="68" max-width="148"></v-img>
		</v-row>
		<v-row class="d-flex justify-center">
			<v-col class = "pa-0" cols="12" lg="4" md="5" sm="6" xs="12">
				<LoginForm />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm'

export default {
	name: 'Home',
	components: {
		LoginForm
	},
	mounted() {
		var user = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{};
		var group = window.localStorage.currentGroup?JSON.parse(window.localStorage.currentGroup):{};
		if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
			if(user.roleId == 2){
				if (!(Object.keys(group).length === 0 && group.constructor === Object))
					this.$router.push('/group');
				else
					this.$router.push({path:`teacher/${user.teacherId}`});
			}else if(user.roleId == 3)
				this.$router.push({ path: '/statistics'});
			else if(user.roleId == 4)
				this.$router.push({ path: '/journals'});
		}
	}
}
</script>
