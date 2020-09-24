<template>
	<div class="text-center">
		<v-dialog
		v-model="dialog"
		persistent
		width="500">
			<v-card>
				<v-card-title class="align-center justify-center headline py-10">
					Сообщение
				</v-card-title>

				<v-card-text class="align-center justify-center text-center">
					{{message}}
				</v-card-text>

			<v-divider></v-divider>

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