<template>
	<v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<v-col cols="12" xl="2" lg="2">
				<v-img src="@/assets/images/aiplusLogoMini.png" max-height="53" max-width="115"></v-img>
			</v-col>
			<v-col class="d-flex justify-end align-center" cols="12" xl="4" lg="4">
				<h4>{{currentTeacher.LastName +' '+currentTeacher.FirstName}}</h4>
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
	computed: {
		currentTeacher(){
			return this.$store.state.currentTeacher;
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