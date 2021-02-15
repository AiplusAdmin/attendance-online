<template>
	<div class="text-center">
		<v-dialog
		v-model="checkdialog"
		persistent
		width="500">
			<v-card class="infocard">
				<v-card-title class="align-center justify-center headline py-5">
					<v-icon class="shadow-icon" x-large>mdi-alert-circle-outline</v-icon>
				</v-card-title>
				<v-card-subtitle class="text-center py-3 text-h6 black--text font-weight-medium">Ввидете код</v-card-subtitle>
				<v-card-text class="pb-0">
					<v-row class="align-center justify-center text-center py-0">
						<v-col cols="5" class="py-0">
							<v-text-field class="py-0" v-model="checkcode" type="password"></v-text-field>
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions class="align-center justify-center px-12 pb-8"> 
					<v-btn
						class="rounded-btn white--text "
						color="orange"
						block rounded height="50"	
						@click="CloseModal">
						Подтвердить
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: 'InfoModel',
	props: {
		checkdialog: Boolean,
		code: Number
	},
	data () {
		return {
			checkcode: null
		}
	},
	methods:{
		CloseModal(){
			if(this.code == this.checkcode){
				this.$store.dispatch('ResetEqual',true);
				this.$parent.setAttendence();
				this.$parent.checkdialog = false;
			} else {
				alert('Ошбика не подходит');
			}
		}
	}
}
</script>
<style scoped>

	.infocard{
		border-radius: 10px;
	}

	.shadow-icon{
		color: #fabb47 !important;
	}

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 8px 5px rgba(196, 197, 197);
	}
</style>