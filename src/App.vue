<template>
	<v-app id="inspire" fluid>
		<v-system-bar color="#fbab17"></v-system-bar>
		<v-navigation-drawer v-if="currentUser.roleId==5" app>
				<v-list dense>
				<v-list-item v-for="(table,index) in tables" :key="index" link @click="SetAdminTable(table)">
					<v-list-item-content>
						<v-list-item-title>{{ table.Name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<router-view/>
		</v-main>
		<v-footer class='justify-center' color="grey darken-1" >
			<v-row > 
				<v-col class="text-center"  cols="12">
					<span class="orange--text font-weight-bold">AIPLUS. </span>
					<span class="white--text font-weight-bold">ATTENDANCE. 2020 г.</span>
				</v-col>
			</v-row>
		</v-footer>
	</v-app>
</template>

<script>

export default {
	name: 'App',

	data: () => ({
		tables : [ 
			{
				Name: 'Преповадатели',
				Table: 'Teachers',
				Router: 'teachers'
			},
			{
				Name: 'Темы',
				Table: 'Topics',
				Router: 'topics'
			},
			{
				Name: 'Филиалы',
				Table: 'Schools',
				Router: 'schools'
			},
			{
				Name: 'Кабинеты',
				Table: 'Rooms',
				Router: 'rooms'
			},
			{
				Name: 'Предметы',
				Table: 'Subjects',
				Router: 'subjects'
			},
			{
				Name: 'Ученики',
				Table: 'Students',
				Router: 'students'
			},
			{
				Name: 'Выход'
			}
		]
	}),
	computed:{
		currentUser(){
			return this.$store.state.currentUser;
		}
	},
	created(){
		if(localStorage.currentUser)
			this.$store.state.currentUser = JSON.parse(localStorage.currentUser);
		if(localStorage.adminTable)
			this.$store.state.adminTable = JSON.parse(localStorage.adminTable);
	},
	methods:{
		SetAdminTable(table){
			if(table.Name == 'Выход'){
				this.$store.dispatch('LogOut');
				this.$router.push('/');
			}else{
				this.$store.dispatch('setAdminTable',table);
				this.$router.push({path: `/admin/${table.Router}`});
			}
		}
	}
};
</script>
<style scoped>
	.v-main{
		background: url('~@/assets/images/background.svg') no-repeat;
		background-attachment: fixed;
		background-size: cover;
	}
</style>
