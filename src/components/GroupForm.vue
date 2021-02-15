<template>
	<v-container class="">
		<v-row>
			<v-col cols="12" class="pa-0">
				<v-list class="pb-0">
					<v-list-group
						v-for="office in offices" :key="office.Id"
						:value="false"
						v-model="office.value"
						:class="office.value ? 'mb-1 myform_active': ' mb-1 myform'"
						color="grey darken-1"
						@click="getGroup(office)"
					>
						<template v-slot:activator>
							<v-list-item two-line class="pl-0">
								<v-list-item-title class=" font-weight-bold grey--text text--darken-3 text-subtitle-1 text-uppercase">{{office.Name}}</v-list-item-title>
							</v-list-item>
						</template>
						<div v-if="groups.length > 0">
							<v-list class='myform_bakc'>
								<v-list-item
									class="px-0 mb-1 mt-1 divider mx-3 white"
									v-for="group in groups" :key="group.Id"
									@click="SetGroup(office,group)"
									two-line
								>
									<v-col cols="8" class="pl-4">
										<v-list-item-title class="font-weight-bold  grey--text text--darken-2 text-subtitle-1" v-text="group.name"></v-list-item-title>
									</v-col>
									<v-col cols="4" class="ml-3">
										<v-list-item-title class="text-subtitle-2" v-text="group.time"></v-list-item-title>
									</v-col>
								</v-list-item>
							</v-list>
						</div>
						<div v-else>
							<v-list class="pa-0">
								<v-list-item >
									<v-list-item-title class="text-h6" v-text="'Нет групп'"></v-list-item-title>
								</v-list-item>
							</v-list>
						</div>
					</v-list-group>
				</v-list>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" class="px-0">
				<v-btn class="rounded-btn white--text mt-9" to="/change" block rounded height="50">Замена</v-btn>
			</v-col>
		</v-row>
		<Loading :overlay="overlay"/>

	</v-container>
</template>

<script>
import Loading from '@/components/modal/Loading'

export default {
	name: 'GroupForm',
	components: {
		Loading
	},
	props: {
		teacherId : String
	},
	data () {
		return {
			isLoading: false,
			overlay: false,
			groups: [],
		}
	},
	async mounted(){
		await this.$store.dispatch('GetTeacherById', this.teacherId);				
		this.$store.dispatch('ResetGroup');
	},
	computed : {
		offices(){	
			this.$store.state.offices.map(el => el.value = false);

			return this.$store.state.offices;
		},
		currentUser(){
			return this.$store.state.currentUser;
		}	
	},
	methods : {
		async getGroup(office){
			if(!office.value){
				this.overlay = true;
				var response = await this.$store.dispatch('GetOfficeGroups', { office: office, teacherId: this.teacherId});
				this.groups = response.data.data;
				this.overlay = false;
			}
		},
		SetGroup(office,group){
			this.overlay = true;
			group.date = new Date().toISOString().substr(0, 10);
			group.change = false;
			group.officeId = office.Id;
			group.teacherId = this.teacherId;
			group.subteacherId = null;
			this.$store.dispatch('SetGroup',group);
			this.overlay = false;
			this.$router.push({path: '/group'});
		}
	}
}
</script>
<style scoped>
	.myform{
		background:#f0f4f5;
	}

	.myform_active{
		background:#e1e5e6;
		color: #d2d4d9;
	}

	.myform_bakc{
		background:#ededed !important;
	}

	.divider{
		box-shadow: 0px 2px 5px rgba(196, 197, 197) !important;
	}
	
	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 8px 5px rgba(196, 197, 197);
	}
</style>