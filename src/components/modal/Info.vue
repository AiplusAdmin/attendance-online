<template>
	<div class="text-center">
		<v-dialog
		v-model="dialog"
		persistent
		width="500">
			<v-card class="infocard">
				<v-card-title class="align-center justify-center text-h6 font-weight-medium py-4">
					СООБЩЕНИЕ
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="align-center justify-center text-center text-subtitle-1 grey--text text--darken-2 font-weight-bold">
					<div><v-icon class="py-4 shadow-icon" color="orange" x-large>mdi-alert-circle</v-icon></div>
					<div>{{message}}</div>
				</v-card-text>
				<v-card-actions class="align-center justify-center"> 
					<v-btn
						color="orange"
						text
						@click="CloseModal">
						Ок
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
		dialog: Boolean,
		message: String,
		path: String
	},
	methods:{
		CloseModal(){
			this.$parent.$parent.dialog = false;
			this.dialog = !this.dialog;
			console.log(this.path);
			if(this.path)
				this.$router.push(this.path);
			
		}
	}
}
</script>

<style scoped>
	.infocard{
		background-color: #eeeeee;
		border-radius: 10px;
	}

	.shadow-icon{
		color: #fabb47 !important;
		text-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>